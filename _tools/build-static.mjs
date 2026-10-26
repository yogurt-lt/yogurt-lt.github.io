// Generate crawlable pages using the same content and renderers as the browser.
// Run: node _tools/build-static.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(resolve(root, p), 'utf8');
const escape = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
class Node {
  constructor(tag) { this.tagName = tag; this.children = []; this.attributes = {}; this.className = ''; this.text = ''; }
  set textContent(v) { this.text = String(v); this.children = []; this.raw = ''; }
  get textContent() { return this.text + this.children.map(n => n.textContent).join(''); }
  set innerHTML(v) { this.raw = v; this.children = []; this.text = ''; }
  get innerHTML() { return this.raw || escape(this.text) + this.children.map(n => n.serialize()).join(''); }
  appendChild(n) { this.children.push(n); return n; }
  get firstChild() { return this.children[0]; }
  removeChild(n) { this.children.splice(this.children.indexOf(n), 1); }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  addEventListener() {}
  get classList() { return { toggle() {} }; }
  serialize() {
    const attrs = { ...this.attributes };
    if (this.className) attrs.class = this.className;
    for (const k of ['href', 'src', 'alt', 'target', 'rel', 'loading']) if (this[k] !== undefined) attrs[k] = this[k];
    const start = '<' + this.tagName + Object.entries(attrs).map(([k,v]) => ` ${k}="${escape(v)}"`).join('') + '>';
    return start + (this.tagName === 'img' ? '' : this.innerHTML + `</${this.tagName}>`);
  }
}
const template = read('_tools/page-template.html');
for (const lang of ['zh', 'en']) {
  const ids = [...template.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  const registry = new Map(ids.map(id => [id, new Node('div')]));
  const doc = {
    documentElement: Object.assign(new Node('html'), { lang: lang === 'en' ? 'en' : 'zh-CN' }),
    createElement: tag => new Node(tag),
    getElementById: id => registry.get(id),
    querySelectorAll: () => [],
    addEventListener(type, fn) { if (type === 'DOMContentLoaded') this.ready = fn; }
  };
  const win = { localStorage: { getItem() { return null; }, setItem() {} } };
  const site = new Function('window', 'document', read('assets/content.js') + '\n' + read('assets/main.js') + '\nreturn SITE;')(win, doc);
  doc.ready();
  let html = template.replace(/(<([\w-]+)\b[^>]*data-i18n="([^"]+)"[^>]*>)[\s\S]*?(<\/\2>)/g,
    (_, start, tag, key, end) => start + escape(site.ui[lang][key]) + end);
  // Template containers are deliberately empty: fill them from the shared renderer.
  html = html.replace(/(<([\w-]+)\b[^>]*\bid="([^"]+)"[^>]*>)\s*(<\/\2>)/g,
    (all, start, tag, id, end) => registry.has(id) ? start + registry.get(id).innerHTML + end : all);
  const url = 'https://yogurt-lt.github.io/' + (lang === 'en' ? 'en.html' : '');
  html = html.replace('<html lang="zh-CN">', `<html lang="${lang === 'en' ? 'en' : 'zh-CN'}" data-lang="${lang}">`);
  html = html.replace(/<title>.*?<\/title>/, `<title>${lang === 'en' ? 'Taiyuange Lou | Tianjin University | Optical Engineering' : '娄泰袁葛 | Taiyuange Lou | 天津大学光学工程'}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(site.ui[lang]['hero.role'] + '. ' + site.ui[lang]['hero.interests'])}">`);
  html = html.replace('</head>', `<link rel="canonical" href="${url}">\n<link rel="alternate" hreflang="zh-CN" href="https://yogurt-lt.github.io/">\n<link rel="alternate" hreflang="en" href="https://yogurt-lt.github.io/en.html">\n<link rel="alternate" hreflang="x-default" href="https://yogurt-lt.github.io/">\n</head>`);
  html = html.replace('id="langToggle" href="en.html"', `id="langToggle" href="${lang === 'en' ? 'index.html' : 'en.html'}"`);
  html = html.replace(`class="lang-opt" data-lang="${lang}"`, `class="lang-opt is-active" data-lang="${lang}"`);
  writeFileSync(resolve(root, lang === 'en' ? 'en.html' : 'index.html'), html);
  console.log(`Generated ${lang === 'en' ? 'en.html' : 'index.html'}`);
}
