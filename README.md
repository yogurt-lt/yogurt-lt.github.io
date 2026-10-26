# 个人学术主页（中英文双语 · 纯静态）

## 更新与发布（2026-10-26）

中文 `index.html` 和英文 `en.html` 均包含完整静态正文，不需要执行 JavaScript 才能读取。
修改内容仍在 `assets/content.js` 中进行；修改布局请编辑 `_tools/page-template.html`，不要直接修改生成的 HTML。
每次修改内容或布局后，运行：

```powershell
node _tools/build-static.mjs
node _tools/check.mjs
```

将 `index.html`、`en.html`、`styles.css`、整个 `assets/`、`robots.txt` 和 `sitemap.xml` 同步到 GitHub 仓库根目录。
`_tools/` 只用于本地生成，无需上传。中英文切换使用独立页面链接，关闭 JavaScript 也能浏览和切换。
当前公开联系方式已移除电话号码。页脚更新日期由 `assets/content.js` 中的 `updated` 字段控制。

这是你的个人网站源代码。整站是纯静态页面：没有后端、没有数据库、不需要构建工具，
把文件夹里的文件原样丢到 GitHub Pages 就能访问。

- 参考风格：[singer-yang.github.io](https://singer-yang.github.io/)、[congliwang.github.io](https://congliwang.github.io/)
- 内容：教育经历、发表论文、专利、参与学术会议、项目与实习（含图片）、竞赛获奖（含证书）、荣誉、联系方式
- 语言：右上角「中文 / EN」一键切换，默认中文，选择会被浏览器记住
- 自带深色模式（跟随系统）和打印样式（`Ctrl+P` 可直接导成 PDF 当简历用）

---

## 一、文件结构

```
个人网站/
├── index.html            页面骨架（一般不用改）
├── styles.css            全部样式，顶部 :root 里可换配色（一般不用改）
├── assets/
│   ├── content.js        ★ 所有文字内容都在这里 —— 你日常只需要改这个文件
│   ├── main.js           语言切换与渲染逻辑（一般不用改）
│   ├── images/           项目照片与获奖证书（从你的申请 PPT 里整理出来的）
│   ├── photo.jpg         头像（原始比例，圆角显示；当前用的是柴犬合照）
│   └── photo-full.jpg    同一张图的备用副本
├── _tools/check.mjs      本地自检脚本（可选，部署时用不到）
└── README.md             本文件
```

> 想改动内容时，99% 的情况只需要打开 `assets/content.js`。

---

## 二、本地预览

直接双击 `index.html` 就能在浏览器里看效果。

更推荐起一个本地服务（这样相对路径、缓存行为都和线上一致）：

```powershell
# 在项目文件夹里执行，任选一条
python -m http.server 8000
# 或者（装了 Node.js）
npx serve .
```

然后浏览器打开 <http://localhost:8000>。

改完 `content.js` 后按 `Ctrl+F5` 强制刷新即可看到变化。

---

## 三、怎么编辑内容

打开 `assets/content.js`，文件里已经写好了中文注释，结构是：

```js
const SITE = {
  ui:      { zh: {...}, en: {...} },   // 界面文字（导航、标题、页脚）
  links:   [ ... ],                    // 头像下方的快捷链接按钮
  education:    [ ... ],               // 教育经历
  publications: [ ... ],               // 发表论文
  patents:      [ ... ],               // 专利
  conferences:  [ ... ],               // 参与学术会议
  projects:     [ ... ],               // 项目与实习（可附图）
  competitions: [ ... ],               // 竞赛获奖（可附证书图）
  honors:       [ ... ],               // 荣誉奖励（可带链接）
  contact:      [ ... ]                // 联系方式
};
```

规矩只有三条：

1. **中英文都要写**：凡是写成 `{ zh: "中文", en: "English" }` 的地方，两边都要填。
2. **标点和引号别丢**：字符串用双引号，每行末尾的逗号要保留。
3. **加一条就复制一条**：想把新论文加到最前面，就复制一整段 `{ ... },` 粘到列表最上面再改内容。

### 给某个项目 / 奖项配图

把图片放进 `assets/images/`，然后在对应条目的 `photos` 数组里加一行：

```js
photos: [
  { src: "assets/images/我的图.jpg", cap: { zh: "中文图注", en: "English caption" } }
]
```

- 不想要图注，就只写 `{ src: "assets/images/我的图.jpg" }`。
- 不想要图，就把整个 `photos:` 那几行删掉。
- 图片会**完整显示、不裁切**（保持原始比例），点一下可以放大看原图。

### 需要你补的几处

| 位置 | 现在写的是什么 | 你要做什么 |
| --- | --- | --- |
| `links` 里的 Google Scholar | 链接是空的 | 有了主页就把链接填上；一直空着该项会自动隐藏 |
| `contact` 里的电话 | 已移除 | 默认不公开电话号码 |

> GitHub（github.com/yogurt-lt）和 ORCID（0009-0004-0142-462X）已经按你给的填好了。
> 简历 PDF 按钮已按要求去掉；以后想加回来，就在 `links` 里补一条
> `{ text: { zh: "简历 PDF", en: "CV (PDF)" }, link: "assets/cv.pdf", icon: "cv" }`，
> 并把 PDF 放进 `assets/`。

---

## 四、关于论文 / 专利链接

- **论文**：最稳的写法是 DOI 链接，形如 `https://doi.org/10.1109/JPHOT.2024.3520163`。
  DOI 永久有效，比出版社的临时链接靠谱。找不到 DOI 就填期刊文章页地址。
- **中文期刊**（如《光子学报》）通常也有 DOI，形如 `10.3788/gzxb2025....`，
  在文章页或中国知网上能找到；实在没有就填 `https://www.researching.cn/...` 的文章页。
- **专利**：用 Google Patents 最通用，中英文都能看，形如
  `https://patents.google.com/patent/CN118624933A/zh`。
  还在「审查中」、没有公开号的专利把 `link` 留空即可，页面会正常显示文字、不带链接。
- 不想让某条显示链接，把 `link` 改成 `""` 就行（不要删掉 `link:` 这个键）。

---

## 五、换头像

当前首页头像是你发的那张柴犬合照，**按原始比例完整显示**（圆角矩形，没有裁切）。
换图时直接用新文件覆盖 `assets/photo.jpg` 即可，不用事先裁剪：

```powershell
Copy-Item "你的新照片.jpg" assets\photo.jpg -Force
```

- 头像宽度：改 `styles.css` 里 `.hero` 的 `grid-template-columns` 中的 `290px`。
- 圆角大小：改 `.hero-photo img` 的 `border-radius`。
- 想让头像和文字换位置（图在左、字在右）：把 `index.html` 里 `.hero-photo` 那个
  `<figure>` 移到 `.hero-text` 前面，再让 Codex 帮你调一下顺序即可。

---

## 六、部署到 GitHub Pages（详细步骤）

你已经有 GitHub 账号，整个过程大约 5 分钟。

### 第 1 步：在 GitHub 上新建仓库

1. 打开 <https://github.com/new>
2. **Repository name** 填 `你的用户名.github.io`
   —— 例如用户名是 `lou`，就填 `lou.github.io`。
   这个特殊名字能让你的网站地址直接是 `https://lou.github.io`，不需要任何额外配置。
3. 选 **Public**（免费账号的 Pages 要求公开仓库）。
4. **不要**勾选 "Add a README file"。
5. 点 **Create repository**。

### 第 2 步：把本文件夹上传上去

**方法 A：网页上传（不用装任何东西，推荐新手）**

1. 在新建的空仓库页面点 **uploading an existing file**。
2. 把项目文件夹里的 `index.html`、`styles.css`、`assets` 文件夹、`README.md`
   一起拖进网页。（`_tools`、`_cand`、`_extract.ps1`、`_resume_text.txt` 这些不用传。）
3. 下方 Commit changes 填一句说明，点 **Commit changes**。

**方法 B：用 Git 命令行（以后更新方便）**

先装 [Git for Windows](https://git-scm.com/download/win)，然后在项目文件夹里执行：

```powershell
git init
git add .
git commit -m "init: personal academic homepage"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

以后每次改完内容，只要三条命令：

```powershell
git add .
git commit -m "update publications"
git push
```

### 第 3 步：打开 Pages

1. 进入仓库 → **Settings** → 左侧 **Pages**。
2. **Source** 选 `Deploy from a branch`。
3. **Branch** 选 `main`，目录选 `/ (root)`，点 **Save**。
4. 等 1～2 分钟，刷新页面，顶部会出现你的网址：
   `https://你的用户名.github.io`

搞定。之后每次 push，网站会在 1 分钟左右自动更新。

### 注意

- 仓库根目录里**不要**有 Jekyll 会处理的东西。本项目的文件很干净，一般不会出问题；
  万一页面 404 或样式丢失，在仓库根目录新建一个名字为空、内容为空的文件
  `.nojekyll` 即可（GitHub 网页上可以直接创建）。
- 中文文件名在 Git 里容易出乱码，建议仓库里只用英文文件名（本项目已经是这样）。

---

## 七、怎么让 Codex 帮你继续改

这个网站已经被设计成「改一个文件就能改内容」的结构，所以和 Codex 对话时可以这样说：

**更新内容类**

> 打开 `assets/content.js`，在 `publications` 列表最前面加一条新论文：
> 作者 "Taiyuange Lou, ..."，标题 "..."，期刊 "Optics Express, 2026"，
> DOI 是 10.1364/OE.xxxxx，标签加 "SCI"。中英文都要写。

> 在 `conferences` 里再加一条会议：2024 年某某学术会议，作者 "..."，标题 "..."，中英文都要。

> 把 `honors` 里 2025 年的歌尔奖学金改成「天津大学-歌尔奖学金（一等奖）」。

> 给 `projects` 里「180° 超广角镜头」那一条再加两张图，文件我先放到 `assets/images/` 了。

**改样式类**

> 把 `styles.css` 里 `:root` 的 `--accent` 换成深墨绿 `#1f5f4b`，其他不要动。

> 首页头像再放大一点，圆角小一点。

> 项目图片的缩略图高度从 172px 改成 220px。

**加功能类**

> 加一个「教学 / Teaching」板块，位置在「荣誉奖励」之后，样式与其他板块一致，
> 内容先写占位文字，中英文都要。

> 给论文列表加一个按年份/类型筛选的按钮。

**部署类**

> 我已经把代码 push 到 https://github.com/xxx/xxx.github.io，
> 但打开显示 404，帮我排查可能原因。

给 Codex 提要求时，把「改哪个文件、改成什么、保留什么」讲清楚，它改完你
`Ctrl+F5` 刷新浏览器就能看到效果。

---

## 八、自检脚本（可选）

装了 Node.js 的话，改完内容可以跑一下：

```powershell
node _tools/check.mjs
```

它会检查：`content.js` 有没有语法错误、有没有哪条数据只写了中文没写英文、
每个板块能不能正常渲染。有问题会列出来，全通过会显示「全部检查通过」。

---

## 九、常见问题

**Q：页面打开是空白 / 排版全乱？**
A：多半是文件没传全。确认仓库根目录同时有 `index.html`、`styles.css`、`assets/`（含 `content.js`、`main.js`、`photo.jpg`）。

**Q：中英文切换没反应？**
A：说明 `assets/main.js` 或 `assets/content.js` 有语法错误。打开浏览器按 `F12` 看 Console 的红色报错，
或者本地跑 `node _tools/check.mjs`。

**Q：字体和我在本地看的不一样？**
A：页面用了 Google Fonts。国内网络下可能加载不出来，会自动回退到系统字体（Windows 下是宋体/微软雅黑），
不影响使用。想完全离线可在 `index.html` 里删掉那几行 `<link ...fonts.googleapis.com...>`。

**Q：想加个人照片墙或者论文配图？**
A：在 `assets/` 下新建 `images/` 文件夹放图，然后在 `content.js` 对应条目里加一个
`image: "assets/images/xxx.jpg"` 字段，再让 Codex 帮你在 `main.js` 里把它渲染出来。
