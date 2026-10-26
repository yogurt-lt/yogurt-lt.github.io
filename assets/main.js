/* =========================================================================
   main.js — 负责：中英文切换 + 把 content.js 里的内容渲染到页面上
   一般不需要修改这个文件，改内容请编辑 assets/content.js
   ========================================================================= */

(function () {
  "use strict";

  /* ------------------------- 小工具 ------------------------- */
  function t(value, lang) {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    return value[lang] || value.zh || value.en || "";
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null && text !== "") node.textContent = text;
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  /* ------------------------- 图标（内联 SVG） ------------------------- */
  var ICONS = {
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18v13H3z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.6 6.2 12 12.6l8.4-6.4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3 1.5 8.6 12 14.2l10.5-5.6L12 3Zm-6.6 8.9v4.3c0 .5.4 1 .9 1.3 1.3.8 3.4 1.5 5.7 1.5s4.4-.7 5.7-1.5c.5-.3.9-.8.9-1.3v-4.3L12 15.7 5.4 11.9Z"/></svg>',
    orcid: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path fill="#fff" d="M9 8.6a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Zm-.8 1.4h1.6v7.6H8.2V10Zm3.1 0h3c2.1 0 3.5 1.5 3.5 3.8s-1.4 3.8-3.5 3.8h-3V10Zm1.6 1.4v4.8h1.3c1.2 0 1.9-.9 1.9-2.4s-.7-2.4-1.9-2.4h-1.3Z"/></svg>',
    cv: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M14 3v4h4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.6"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M20 4 11 13" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M18 14v5H5V6h5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>'
  };

  function svgIcon(name) {
    return ICONS[name] || ICONS.external;
  }

  /* ------------------------- 语言切换 ------------------------- */
  var currentLang = document.documentElement.lang === "en" ? "en" : "zh";

  function setLang(lang) {
    currentLang = lang === "en" ? "en" : "zh";
    document.documentElement.lang = currentLang === "en" ? "en" : "zh-CN";
    document.documentElement.setAttribute("data-lang", currentLang);

    // 1) 更新所有 data-i18n 的静态文字
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      var text = (SITE.ui[currentLang] || {})[key];
      if (text !== undefined) nodes[i].textContent = text;
    }

    // 2) 重新渲染数据型内容
    renderAll();

    // 3) 高亮当前语言按钮
    var opts = document.querySelectorAll(".lang-opt");
    for (var j = 0; j < opts.length; j++) {
      opts[j].classList.toggle("is-active", opts[j].getAttribute("data-lang") === currentLang);
    }
  }

  /* ------------------------- 渲染：快捷链接 ------------------------- */
  function renderLinks() {
    var host = document.getElementById("heroLinks");
    if (!host) return;
    clear(host);
    if (!SITE.links) return;

    SITE.links.forEach(function (item) {
      if (!item || !item.link) return; // link 为空的条目直接跳过（例如还没填的 Google Scholar）
      var li = el("li");
      var a = el("a", "chip");
      a.href = item.link;
      if (/^https?:/i.test(item.link)) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      var icon = el("span", "chip-icon");
      icon.innerHTML = svgIcon(item.icon);
      a.appendChild(icon);
      a.appendChild(el("span", "chip-text", t(item.text, currentLang)));
      li.appendChild(a);
      host.appendChild(li);
    });
  }

  /* ------------------------- 渲染：教育经历 ------------------------- */
  function renderEducation() {
    var host = document.getElementById("educationList");
    if (!host) return;
    clear(host);
    (SITE.education || []).forEach(function (item) {
      var row = el("div", "tl-item");

      var when = el("div", "tl-when", t(item.period, currentLang));

      var body = el("div", "tl-body");
      var head = el("div", "tl-head");
      head.appendChild(el("span", "tl-school", t(item.school, currentLang)));
      head.appendChild(el("span", "tl-degree", t(item.degree, currentLang)));
      body.appendChild(head);

      var details = t(item.details, currentLang);
      if (details) body.appendChild(el("p", "tl-details", details));

      row.appendChild(when);
      row.appendChild(body);
      host.appendChild(row);
    });
  }

  /* ------------------------- 渲染：图片墙 ------------------------- */
  function buildGallery(photos, extraClass) {
    if (!photos || !photos.length) return null;
    var wrap = el("div", "gallery" + (extraClass ? " " + extraClass : ""));
    photos.forEach(function (photo) {
      if (!photo || !photo.src) return;
      var fig = el("figure", "gallery-item");
      var img = el("img");
      img.src = photo.src;
      img.alt = t(photo.cap, currentLang) || "";
      img.loading = "lazy";
      img.setAttribute("tabindex", "0");
      fig.appendChild(img);
      var cap = t(photo.cap, currentLang);
      if (cap) fig.appendChild(el("figcaption", null, cap));
      wrap.appendChild(fig);
    });
    return wrap.children.length ? wrap : null;
  }

  /* ------------------------- 渲染：论文 / 专利 ------------------------- */
  function renderEntries(hostId, list) {
    var host = document.getElementById(hostId);
    if (!host) return;
    clear(host);

    (list || []).forEach(function (item) {
      var li = el("li", "pub-item");

      var title = el("p", "pub-title");
      if (item.link) {
        var a = el("a", null, t(item.title, currentLang));
        a.href = item.link;
        if (/^https?:/i.test(item.link)) { a.target = "_blank"; a.rel = "noopener"; }
        title.appendChild(a);
        title.appendChild(el("span", "pub-ext", "\u2197"));
      } else {
        title.appendChild(el("span", null, t(item.title, currentLang)));
      }
      li.appendChild(title);

      li.appendChild(el("p", "pub-authors", t(item.authors, currentLang)));

      var meta = el("p", "pub-venue");
      meta.appendChild(el("span", "pub-venue-text", t(item.venue, currentLang)));
      if (item.tags && item.tags.length) {
        item.tags.forEach(function (tag) {
          meta.appendChild(el("span", "tag", tag));
        });
      }
      /* 可选：第二条链接（例如 Google Patents 打不开时的备用来源） */
      if (item.link2) {
        var alt = el("a", "pub-alt", t(item.link2Text || { zh: "备用链接", en: "Alt. link" }, currentLang));
        alt.href = item.link2;
        if (/^https?:/i.test(item.link2)) { alt.target = "_blank"; alt.rel = "noopener"; }
        meta.appendChild(alt);
      }
      li.appendChild(meta);

      host.appendChild(li);
    });
  }

  /* ------------------------- 渲染：项目与实习 ------------------------- */
  function renderProjects() {
    var host = document.getElementById("projectList");
    if (!host) return;
    clear(host);

    (SITE.projects || []).forEach(function (group) {
      var card = el("div", "card");

      var head = el("div", "card-head");
      head.appendChild(el("span", "card-period", t(group.period, currentLang)));
      var org = el("span", "card-org", t(group.org, currentLang));
      head.appendChild(org);
      if (group.kind) head.appendChild(el("span", "tag tag-soft", t(group.kind, currentLang)));
      card.appendChild(head);

      // 新写法：整条项目直接带 desc / photos
      var directDesc = t(group.desc, currentLang);
      if (directDesc) card.appendChild(el("p", "card-desc", directDesc));
      var directGallery = buildGallery(group.photos);
      if (directGallery) card.appendChild(directGallery);

      // 旧写法（向下兼容）：items 里再拆子项目
      (group.items || []).forEach(function (item) {
        var entry = el("div", "card-entry");
        var name = el("p", "card-name");
        name.appendChild(el("span", null, t(item.name, currentLang)));
        if (item.kind) name.appendChild(el("span", "tag tag-soft", t(item.kind, currentLang)));
        entry.appendChild(name);

        var desc = t(item.desc, currentLang);
        if (desc) entry.appendChild(el("p", "card-desc", desc));

        var gallery = buildGallery(item.photos);
        if (gallery) entry.appendChild(gallery);

        card.appendChild(entry);
      });

      host.appendChild(card);
    });
  }

  /* ------------------------- 渲染：学术会议 ------------------------- */
  function renderConferences() {
    var host = document.getElementById("conferenceList");
    if (!host) return;
    clear(host);

    (SITE.conferences || []).forEach(function (item) {
      var li = el("li", "award-item");
      li.appendChild(el("span", "award-year", t(item.year, currentLang)));

      var body = el("div", "award-body");
      body.appendChild(el("p", "award-title", t(item.title, currentLang)));
      body.appendChild(el("p", "award-desc", t(item.authors, currentLang)));
      body.appendChild(el("p", "award-venue", t(item.venue, currentLang)));
      li.appendChild(body);

      host.appendChild(li);
    });
  }

  /* ------------------------- 渲染：竞赛 / 荣誉 ------------------------- */
  function renderAwards(hostId, list) {
    var host = document.getElementById(hostId);
    if (!host) return;
    clear(host);

    (list || []).forEach(function (item) {
      var li = el("li", "award-item");
      li.appendChild(el("span", "award-year", t(item.year, currentLang)));

      var body = el("div", "award-body");
      var title = el("p", "award-title");
      if (item.link) {
        var a = el("a", null, t(item.title, currentLang));
        a.href = item.link;
        if (/^https?:/i.test(item.link)) { a.target = "_blank"; a.rel = "noopener"; }
        title.appendChild(a);
        title.appendChild(el("span", "pub-ext", "\u2197"));
      } else {
        title.appendChild(el("span", null, t(item.title, currentLang)));
      }
      body.appendChild(title);

      var desc = t(item.desc, currentLang);
      if (desc) body.appendChild(el("p", "award-desc", desc));

      var gallery = buildGallery(item.photos, "award-cert");
      if (gallery) body.appendChild(gallery);

      li.appendChild(body);

      host.appendChild(li);
    });
  }

  /* ------------------------- 渲染：联系方式 ------------------------- */
  function renderContact() {
    var host = document.getElementById("contactList");
    if (!host) return;
    clear(host);

    (SITE.contact || []).forEach(function (item) {
      var li = el("li", "contact-item");
      li.appendChild(el("span", "contact-label", t(item.label, currentLang)));

      var value = t(item.value, currentLang);
      if (item.link) {
        var a = el("a", null, value);
        a.href = item.link;
        if (/^https?:/i.test(item.link)) { a.target = "_blank"; a.rel = "noopener"; }
        li.appendChild(a);
      } else {
        li.appendChild(el("span", "contact-value", value));
      }
      host.appendChild(li);
    });
  }

  /* ------------------------- 全部渲染 ------------------------- */
  function renderAll() {
    renderLinks();
    renderEducation();
    renderEntries("publicationList", SITE.publications);
    renderEntries("patentList", SITE.patents);
    renderConferences();
    renderProjects();
    renderAwards("competitionList", SITE.competitions);
    renderAwards("honorList", SITE.honors);
    renderAwards("contributionList", SITE.contributions);
    renderContact();
  }

  /* ------------------------- 图片放大预览 ------------------------- */
  var lightbox = null;

  function openLightbox(src, caption) {
    if (!lightbox) {
      lightbox = el("div", "lightbox");
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-modal", "true");

      var box = el("div", "lightbox-inner");
      var img = el("img", "lightbox-img");
      var cap = el("p", "lightbox-cap");
      var close = el("button", "lightbox-close", "\u00d7");
      close.type = "button";
      close.setAttribute("aria-label", "Close");

      box.appendChild(img);
      box.appendChild(cap);
      lightbox.appendChild(close);
      lightbox.appendChild(box);
      document.body.appendChild(lightbox);

      close.addEventListener("click", closeLightbox);
      lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox || event.target.classList.contains("lightbox-inner")) closeLightbox();
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeLightbox();
      });
    }
    lightbox.querySelector(".lightbox-img").src = src;
    lightbox.querySelector(".lightbox-cap").textContent = caption || "";
    lightbox.classList.add("is-open");
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove("is-open");
  }

  function bindGalleryClicks() {
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.tagName === "IMG" && target.parentNode &&
          target.parentNode.classList && target.parentNode.classList.contains("gallery-item")) {
        var cap = target.parentNode.querySelector("figcaption");
        openLightbox(target.src, cap ? cap.textContent : "");
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Enter") return;
      var target = event.target;
      if (target && target.tagName === "IMG" && target.parentNode &&
          target.parentNode.classList && target.parentNode.classList.contains("gallery-item")) {
        var cap = target.parentNode.querySelector("figcaption");
        openLightbox(target.src, cap ? cap.textContent : "");
      }
    });
  }

  /* ------------------------- 交互 ------------------------- */
  function bindEvents() {
    var toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        window.location.href = currentLang === "zh" ? "en.html" : "index.html";
      });
    }

    var navToggle = document.getElementById("navToggle");
    var nav = document.getElementById("siteNav");
    if (navToggle && nav) {
      navToggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
          nav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  /* ------------------------- 启动 ------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var updated = document.getElementById("lastUpdated");
    if (updated) {
      updated.textContent = SITE.updated;
    }
    bindEvents();
    bindGalleryClicks();
    setLang(currentLang);
  });
})();
