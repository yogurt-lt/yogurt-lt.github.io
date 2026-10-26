/* =========================================================================
   _tools/check.mjs — 本地自检脚本（可选，部署时不需要）
   用法：node _tools/check.mjs
   作用：不打开浏览器就检查 content.js / main.js 是否有语法错误，
        所有数据字段是否中英文齐全，以及页面渲染会不会报错。
   ========================================================================= */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------------- 一个极简 DOM 模拟 ---------------- */
class FakeNode {
  constructor(tag) {
    this.tagName = String(tag).toUpperCase();
    this.children = [];
    this.attributes = {};
    this.className = "";
    this._text = "";
  }
  set textContent(v) { this._text = String(v); }
  get textContent() { return this._text + this.children.map((c) => c.textContent).join(""); }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  getAttribute(k) { return k in this.attributes ? this.attributes[k] : null; }
  appendChild(n) { this.children.push(n); return n; }
  get firstChild() { return this.children[0] || null; }
  removeChild(n) { this.children = this.children.filter((c) => c !== n); }
  addEventListener() {}
  get classList() {
    const self = this;
    return {
      add: (c) => { if (!self.className.includes(c)) self.className += " " + c; },
      remove: (c) => { self.className = self.className.replace(c, "").trim(); },
      toggle: (c, on) => { on ? self.classList.add(c) : self.classList.remove(c); },
      contains: (c) => self.className.includes(c)
    };
  }
  set innerHTML(v) { this._html = v; }
  get innerHTML() { return this._html || ""; }
}

const HTML_IDS = [
  "heroLinks", "educationList", "publicationList", "patentList", "conferenceList",
  "projectList", "contributionList", "competitionList", "honorList", "contactList", "lastUpdated",
  "langToggle", "navToggle", "siteNav"
];

const registry = new Map(HTML_IDS.map((id) => [id, new FakeNode("div")]));

const listeners = {};
const document = {
  documentElement: new FakeNode("html"),
  body: new FakeNode("body"),
  createElement: (tag) => new FakeNode(tag),
  getElementById: (id) => registry.get(id) || null,
  querySelectorAll: () => [],
  addEventListener: (type, fn) => { (listeners[type] = listeners[type] || []).push(fn); },
  __ready: () => (listeners["DOMContentLoaded"] || []).forEach((fn) => fn())
};

const store = new Map();
const window = {
  localStorage: {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, v)
  },
  addEventListener: () => {}
};

/* ---------------- 载入站点脚本 ---------------- */
const sandbox = { window, document, console, Date, Math, JSON };
const runner = new Function(
  "window", "document", "console", "Date", "Math", "JSON",
  readFileSync(resolve(root, "assets/content.js"), "utf8") + "\n" +
  readFileSync(resolve(root, "assets/main.js"), "utf8") + "\n" +
  "return window.SITE;"
);

const SITE = runner(window, document, console, Date, Math, JSON);

const problems = [];
const note = (m) => problems.push(m);

/* 模拟浏览器触发 DOMContentLoaded，让 main.js 真正渲染一遍 */
try {
  document.__ready();
} catch (err) {
  note("渲染时抛出异常：" + err.message + "\n" + (err.stack || ""));
}

/* ---------------- 检查项 ---------------- */

function eachBilingual(value, path) {
  if (value === undefined || value === null) return;
  if (typeof value === "string") return;                    // 允许留空字符串
  if (typeof value === "object" && ("zh" in value || "en" in value)) {
    if (value.zh === undefined) note(`${path}.zh 缺失`);
    if (value.en === undefined) note(`${path}.en 缺失`);
    return;
  }
  note(`${path} 格式不对：应该写成 { zh: "...", en: "..." }`);
}

/* 反向检查：本该双语的地方被写成了单个字符串（切换语言时会不跟着变） */
function warnIfPlainString(value, path) {
  if (typeof value === "string" && value.trim()) {
    note(`${path} 只写了一种语言（建议写成 { zh, en }，否则中英文都显示这句）`);
  }
}

/* 检查图片：文件是否存在 + 图注是否双语 */
function checkPhotos(photos, path) {
  if (!photos) return;
  photos.forEach((p, i) => {
    if (!p || !p.src) { note(`${path}[${i}] 缺少 src`); return; }
    if (!existsSync(resolve(root, p.src))) note(`${path}[${i}] 图片文件不存在：${p.src}`);
    eachBilingual(p.cap, `${path}[${i}].cap`);
  });
}

if (!SITE) note("content.js 没有导出 SITE");

const uiZh = Object.keys(SITE.ui.zh);
const uiEn = Object.keys(SITE.ui.en);
uiZh.filter((k) => !uiEn.includes(k)).forEach((k) => note(`界面文字缺英文：${k}`));
uiEn.filter((k) => !uiZh.includes(k)).forEach((k) => note(`界面文字缺中文：${k}`));

/* index.html 里用到的 data-i18n key 是否都存在 */
const html = readFileSync(resolve(root, "index.html"), "utf8");
const usedKeys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]);
usedKeys.forEach((k) => { if (!uiZh.includes(k)) note(`index.html 用到的 key 在 ui.zh 中不存在：${k}`); });

/* 导航锚点是否有对应的 id */
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
[...html.matchAll(/href="#([^"]+)"/g)].forEach((m) => {
  if (!ids.has(m[1])) note(`index.html 里的锚点 #${m[1]} 找不到对应的 id`);
});

/* 页面引用的本地文件是否真的存在 */
const srcPattern = /(?:src|href)="(?!https?:|mailto:|tel:|#|data:)([^"]+)"/g;
[...html.matchAll(srcPattern)].forEach((m) => {
  const p = resolve(root, m[1]);
  if (!existsSync(p)) note(`index.html 引用的文件不存在：${m[1]}`);
});

/* 需要你自己替换的占位内容提醒 */
const placeholders = [];
if (html.includes("你的用户名")) placeholders.push("index.html/README 里的 GitHub 用户名占位");
const raw = readFileSync(resolve(root, "assets/content.js"), "utf8");
[...raw.matchAll(/https:\/\/github\.com\/([^"]+)/g)].forEach((m) => {
  if (m[1].includes("你的用户名")) placeholders.push(`content.js 里的 GitHub 链接还是占位：github.com/${m[1]}`);
});
if (raw.includes('"assets/cv.pdf"')) placeholders.push("content.js 指向 assets/cv.pdf，但你还没把简历 PDF 放进去");

/* 各数据区块的双语完整性 */
SITE.education.forEach((it, i) => {
  eachBilingual(it.period, `education[${i}].period`);
  eachBilingual(it.school, `education[${i}].school`);
  eachBilingual(it.degree, `education[${i}].degree`);
  eachBilingual(it.details, `education[${i}].details`);
});
SITE.publications.forEach((it, i) => {
  eachBilingual(it.authors, `publications[${i}].authors`);
  eachBilingual(it.title, `publications[${i}].title`);
  eachBilingual(it.venue, `publications[${i}].venue`);
  if (!it.link) note(`publications[${i}] 还没有链接`);
});
SITE.patents.forEach((it, i) => {
  eachBilingual(it.title, `patents[${i}].title`);
  eachBilingual(it.venue, `patents[${i}].venue`);
});
SITE.projects.forEach((g, i) => {
  eachBilingual(g.period, `projects[${i}].period`);
  eachBilingual(g.org, `projects[${i}].org`);
  eachBilingual(g.desc, `projects[${i}].desc`);
  checkPhotos(g.photos, `projects[${i}].photos`);
  (g.items || []).forEach((it, j) => {
    eachBilingual(it.name, `projects[${i}].items[${j}].name`);
    eachBilingual(it.desc, `projects[${i}].items[${j}].desc`);
    checkPhotos(it.photos, `projects[${i}].items[${j}].photos`);
  });
});
SITE.competitions.forEach((it, i) => {
  eachBilingual(it.title, `competitions[${i}].title`);
  eachBilingual(it.desc, `competitions[${i}].desc`);
  checkPhotos(it.photos, `competitions[${i}].photos`);
});
SITE.conferences.forEach((it, i) => {
  eachBilingual(it.title, `conferences[${i}].title`);
  eachBilingual(it.authors, `conferences[${i}].authors`);
  eachBilingual(it.venue, `conferences[${i}].venue`);
});
SITE.honors.forEach((it, i) => {
  eachBilingual(it.year, `honors[${i}].year`);
  eachBilingual(it.title, `honors[${i}].title`);
});
SITE.contact.forEach((it, i) => {
  eachBilingual(it.label, `contact[${i}].label`);
  eachBilingual(it.value, `contact[${i}].value`);
});
SITE.links.forEach((it, i) => eachBilingual(it.text, `links[${i}].text`));

/* 渲染是否真的产出了内容 */
const rendered = {
  "教育经历": registry.get("educationList").children.length,
  "论文": registry.get("publicationList").children.length,
  "专利": registry.get("patentList").children.length,
  "学术会议": registry.get("conferenceList").children.length,
  "项目": registry.get("projectList").children.length,
  "竞赛": registry.get("competitionList").children.length,
  "荣誉": registry.get("honorList").children.length,
  "联系方式": registry.get("contactList").children.length
};
Object.entries(rendered).forEach(([k, v]) => { if (!v) note(`${k} 区块渲染结果为空`); });

/* ---------------- 输出 ---------------- */
console.log("渲染条数：");
Object.entries(rendered).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

if (placeholders.length) {
  console.log(`\n提醒：以下占位内容还需要你自己替换（不影响网站运行）：`);
  placeholders.forEach((p) => console.log("  · " + p));
}

if (problems.length) {
  console.log(`\n发现 ${problems.length} 个问题：`);
  problems.forEach((p) => console.log("  - " + p));
  process.exitCode = 1;
} else {
  console.log("\n全部检查通过，没有发现问题。");
}
