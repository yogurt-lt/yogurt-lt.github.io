/* =========================================================================
   content.js — 网站全部内容都在这个文件里
   -------------------------------------------------------------------------
   只要改这个文件，就能更新网站的文字、论文、专利、经历。
   规则：
     · 每一行末尾的逗号不要丢；字符串用双引号 " " 包起来。
     · zh = 中文，en = 英文。两种语言都要写，页面才能切换。
     · 需要链接的地方写 link: "https://..."，不需要链接就写 link: ""。
     · photos 是图片数组，每项写成 { src: "assets/images/xxx.jpg", cap: { zh: "图注", en: "Caption" } }，
       不想要图注就只写 src。图片放在 assets/images/ 目录里。
   ========================================================================= */

const SITE = {

  /* ---------------- 1. 界面文字（导航栏、标题等） ---------------- */
  ui: {
    zh: {
      "name.full": "娄泰袁葛",
      "name.latin": "Taiyuange Lou",
      "nav.about": "简介",
      "nav.education": "教育经历",
      "nav.publications": "发表论文",
      "nav.patents": "专利",
      "nav.conferences": "学术会议",
      "nav.projects": "项目与实习",
      "nav.competitions": "竞赛获奖",
      "nav.honors": "荣誉奖励",
      "nav.contact": "联系方式",

      "hero.role": "天津大学 · 光学工程 博士研究生",
      "hero.affiliation": "天津大学 精密仪器与光电子工程学院",
      "hero.bio1": "我目前是天津大学光学工程专业博士研究生，本科与硕士均就读于天津大学。研究兴趣集中在光学系统设计与计算成像：一方面做面向实际可落地的 AI 辅助成像系统设计，另一方面用计算方法突破传统成像的物理限制。",
      "hero.bio2": "已经参与完成并落地的代表性系统包括：面向粒子图像测速的显微成像系统、车载 DLP 投影镜头，以及折反射式超短焦投影系统。",
      "hero.interestsLabel": "研究兴趣：",
      "hero.interests": "光学系统设计 · 计算成像 · 自由曲面 · AI 辅助设计",

      "contact.note": "欢迎就光学系统设计、计算成像相关的研究或工程合作与我联系。",
      "footer.updated": "最后更新：",
      "footer.built": "本站为纯静态页面，托管于 GitHub Pages。",
      "gallery.hint": "点击图片可放大"
    },
    en: {
      "name.full": "Taiyuange Lou",
      "name.latin": "娄泰袁葛",
      "nav.about": "About",
      "nav.education": "Education",
      "nav.publications": "Publications",
      "nav.patents": "Patents",
      "nav.conferences": "Conferences",
      "nav.projects": "Projects",
      "nav.competitions": "Competitions",
      "nav.honors": "Honors",
      "nav.contact": "Contact",

      "hero.role": "Ph.D. Student in Optical Engineering, Tianjin University",
      "hero.affiliation": "School of Precision Instrument and Opto-Electronics Engineering, Tianjin University",
      "hero.bio1": "I am a Ph.D. student in Optical Engineering at Tianjin University, where I also completed my B.Eng. and M.S. degrees. My interests lie in optical system design and computational imaging: designing deployable AI-assisted imaging systems on the one hand, and using computational methods to push past the physical limits of conventional imaging on the other.",
      "hero.bio2": "Representative systems I have helped build and bring into practical use include a microscopic imaging system for particle image velocimetry, automotive DLP projection lenses, and a catadioptric ultra-short-throw projection system.",
      "hero.interestsLabel": "Research interests:",
      "hero.interests": "Optical system design · Computational imaging · Freeform optics · AI-assisted design",

      "contact.note": "I am happy to hear about research or engineering collaborations in optical system design and computational imaging.",
      "footer.updated": "Last updated: ",
      "footer.built": "This site is a static page hosted on GitHub Pages.",
      "gallery.hint": "Click an image to enlarge"
    }
  },

  /* ---------------- 2. 头像下方的快捷链接 ---------------- */
  /* 把 link 换成你自己的主页地址；不想要的条目整行删掉即可。 */
  links: [
    { text: { zh: "邮箱", en: "Email" }, link: "mailto:loutaiyuange@tju.edu.cn", icon: "mail" },
    { text: { zh: "GitHub", en: "GitHub" }, link: "https://github.com/yogurt-lt/", icon: "github" },
    { text: { zh: "ORCID", en: "ORCID" }, link: "https://orcid.org/0009-0004-0142-462X", icon: "orcid" },
    { text: { zh: "谷歌学术", en: "Google Scholar" }, link: "", icon: "scholar" }
  ],

  /* ---------------- 3. 教育经历 ---------------- */
  education: [
    {
      period: { zh: "2026.09 — 至今", en: "2026.09 — Present" },
      school: { zh: "天津大学", en: "Tianjin University" },
      degree: { zh: "光学工程 · 博士研究生", en: "Ph.D. in Optical Engineering" },
      details: {
        zh: "研究方向：光学系统设计、计算成像、自由曲面、AI 辅助设计",
        en: "Research: optical system design, computational imaging, freeform optics, AI-assisted design"
      }
    },
    {
      period: { zh: "2022.09 — 2025.01", en: "2022.09 — 2025.01" },
      school: { zh: "天津大学", en: "Tianjin University" },
      degree: { zh: "光学工程 · 学术硕士", en: "M.S. in Optical Engineering" },
      details: {
        zh: "GPA 3.6/4.0　研究方向：光学系统设计、计算成像",
        en: "GPA 3.6/4.0　Research: optical system design, computational imaging"
      }
    },
    {
      period: { zh: "2018.09 — 2022.06", en: "2018.09 — 2022.06" },
      school: { zh: "天津大学", en: "Tianjin University" },
      degree: { zh: "光电信息科学与工程 · 本科", en: "B.Eng. in Opto-Electronics Information Science and Engineering" },
      details: {
        zh: "专业排名 18/103　GPA 3.61/4.0",
        en: "Major rank 18/103　GPA 3.61/4.0"
      }
    }
  ],

  /* ---------------- 4. 发表论文 ---------------- */
  publications: [
    {
      authors: "Taiyuange Lou, Chengxiang Guo, Tong Yang, Lei Yang, Hongbo Xie",
      title: "Monocular 3D Micro-PIV System Using Computational Imaging",
      venue: { zh: "IEEE Photonics Journal, 17(1): 1–9, 2025", en: "IEEE Photonics Journal, vol. 17, no. 1, pp. 1–9, 2025" },
      tags: ["SCI"],
      link: "https://doi.org/10.1109/JPHOT.2024.3520163"
    },
    {
      authors: { zh: "娄泰袁葛, 郭程祥, 杨童, 杨磊, 谢洪波", en: "Taiyuange Lou, Chengxiang Guo, Tong Yang, Lei Yang, Hongbo Xie" },
      title: {
        zh: "用于粒子图像测速的 30× 荧光探测显微镜研制",
        en: "Development of a 30× fluorescence detection microscope for particle image velocimetry"
      },
      venue: { zh: "光子学报, 54(3): 0318002, 2025", en: "Acta Photonica Sinica, 54(3): 0318002, 2025" },
      tags: ["中文核心"],
      link: "https://doi.org/10.3788/gzxb20255403.0318002"
      /* 文章页备选：https://www.researching.cn/articles/OJec2d9854ffd8e627 */
    }
  ],

  /* ---------------- 5. 专利 ---------------- */
  patents: [
    {
      authors: { zh: "谢洪波, 娄泰袁葛, 杨磊, 等", en: "Hongbo Xie, Taiyuange Lou, Lei Yang, et al." },
      title: {
        zh: "基于计算成像的单目三维微尺度粒子图像测速方法及系统",
        en: "Monocular 3D micro-scale particle image velocimetry method and system based on computational imaging"
      },
      venue: { zh: "中国发明专利 CN118624933A · 2024-09-10", en: "Chinese Invention Patent CN118624933A · 2024-09-10" },
      tags: [],
      link: "https://patents.google.com/patent/CN118624933A/zh",
      link2: "https://eureka.patsnap.com/patent/CN118624933A",
      link2Text: { zh: "备用来源", en: "Alt. source" }
    },
    {
      authors: { zh: "娄泰袁葛, 阴亮, 徐航宇", en: "Taiyuange Lou, Liang Yin, Hangyu Xu" },
      title: { zh: "一种紧凑型投影镜头", en: "A compact projection lens" },
      venue: { zh: "中国发明专利 CN121900023A · 2026-04-21", en: "Chinese Invention Patent CN121900023A · 2026-04-21" },
      tags: [],
      link: "https://patents.google.com/patent/CN121900023A/zh",
      link2: "https://eureka.patsnap.com/patent/CN121900023A",
      link2Text: { zh: "备用来源", en: "Alt. source" }
    },
    {
      authors: { zh: "娄泰袁葛, 阴亮, 徐航宇", en: "Taiyuange Lou, Liang Yin, Hangyu Xu" },
      title: { zh: "一种用于激光扫描投影的扩束镜头", en: "A beam-expanding lens for laser scanning projection" },
      venue: { zh: "中国发明专利 CN122284065A · 2026-06-26", en: "Chinese Invention Patent CN122284065A · 2026-06-26" },
      tags: [],
      link: "https://patents.google.com/patent/CN122284065A/zh",
      link2: "https://eureka.patsnap.com/patent/CN122284065A",
      link2Text: { zh: "备用来源", en: "Alt. source" }
    },
    {
      authors: { zh: "娄泰袁葛, 阴亮, 徐航宇", en: "Taiyuange Lou, Liang Yin, Hangyu Xu" },
      title: {
        zh: "一种折反式低投射比超短焦投影镜头及投影系统",
        en: "A catadioptric ultra-short-throw projection lens and projection system with low throw ratio"
      },
      venue: { zh: "中国发明专利 · 审查中（暂无公开号）", en: "Chinese Invention Patent · Under examination (no publication number yet)" },
      tags: [],
      link: ""
    }
  ],

  /* ---------------- 6. 参与学术会议 ---------------- */
  conferences: [
    {
      year: "2023",
      authors: { zh: "段霖森, 娄泰袁葛, 杨磊, 谢洪波", en: "Linsen Duan, Taiyuange Lou, Lei Yang, Hongbo Xie" },
      title: {
        zh: "机载激光通信中双光楔扫描系统的研制",
        en: "Development of a dual-wedge scanning system for airborne laser communication"
      },
      venue: { zh: "2023 年中国光学学会学术大会", en: "2023 Academic Conference of the Chinese Optical Society" }
    }
  ],

  /* ---------------- 7. 项目与实习经历 ----------------
     每一条的结构：
       period   时间
       org      单位 / 项目名
       kind     项目类型（可省略）
       desc     一段说明（可省略，写成 { zh, en }）
       photos   图片数组（可省略或留空）
     图片写法：{ src: "assets/images/文件名", cap: { zh: "图注", en: "Caption" } }
  ---------------------------------------------------- */
  projects: [
    {
      period: { zh: "2025.08 — 2026.05", en: "2025.08 — 2026.05" },
      org: { zh: "沂普光电 · 光学设计工程师", en: "Yipu Optoelectronics · Optical Design Engineer" },
      photos: [
        { src: "assets/images/proj-dlp-optics.jpg", cap: { zh: "紧凑投影设计", en: "Compact projection design" } },
        { src: "assets/images/proj-dlp-hud.jpg", cap: { zh: "车载抬头显示（HUD）系统", en: "Automotive head-up display (HUD) system" } },
        { src: "assets/images/proj-dlp-headlamp.jpg", cap: { zh: "车载 DLP 投影大灯", en: "Automotive DLP projection headlamp" } },
        { src: "assets/images/proj-dlp-ust.jpg", cap: { zh: "折反射超短焦系统", en: "Catadioptric ultra-short-throw system" } }
      ]
    },
    {
      period: { zh: "2022.09 — 2025.01", en: "2022.09 — 2025.01" },
      org: { zh: "超重力光学观测系统、隔振台", en: "Hypergravity optical observation system and vibration isolation platform" },
      kind: { zh: "国家重大科技基础设施项目", en: "National Major Science and Technology Infrastructure Project" },
      desc: {
        zh: "研制可在离心机超重力及强振动环境下长时间正常工作的显微观察与测量系统，使其在 50g 超重力及长时间强振动条件下对微流控芯片内微细观机理进行实时观测与算法测速。主要负责光路设计、振动分析与图像互相关测速算法。",
        en: "Developed a microscopic imaging and measurement system able to operate reliably for long periods under centrifuge-induced hypergravity and strong vibration, enabling real-time observation and algorithmic velocity measurement of micro-scale mechanisms inside microfluidic chips at 50g. Responsible for the optical layout, vibration analysis and cross-correlation velocimetry algorithms."
      },
      photos: [
        { src: "assets/images/micro-piv-system.jpg", cap: { zh: "显微成像系统三维设计总图", en: "3D design of the microscopic imaging system" } },
        { src: "assets/images/micro-piv-objective.jpg", cap: { zh: "显微物镜与微流控芯片观测光路", en: "Objective and observation path for the microfluidic chip" } },
        { src: "assets/images/micro-piv-network.jpg", cap: { zh: "基于深度学习的三维深度重建流程", en: "Deep-learning based 3D depth reconstruction pipeline" } }
      ]
    },
    {
      period: { zh: "2023.01 — 2024.01", en: "2023.01 — 2024.01" },
      org: { zh: "用于激光衰减的 180° 超广角镜头设计", en: "180° ultra-wide-angle lens for laser attenuation" },
      kind: { zh: "军工横向项目", en: "Defense industry project" },
      desc: {
        zh: "设计一款视场角 182° 的近红外超广角镜头，镜头中含衰减片与滤光片。独立完成设计并通过甲方评审。",
        en: "Designed a 182° field-of-view near-infrared ultra-wide-angle lens incorporating attenuation and filter elements. Completed the design independently and passed the client's design review."
      },
      photos: [
        { src: "assets/images/wideangle-lens.jpg", cap: { zh: "180° 超广角镜头光学结构", en: "Optical layout of the 180° ultra-wide-angle lens" } }
      ]
    },
    {
      period: { zh: "2022.01 — 2023.01", en: "2022.01 — 2023.01" },
      org: { zh: "机载非对称投影光学系统设计", en: "Airborne asymmetric projection optical system" },
      kind: { zh: "军工横向项目", en: "Defense industry project" },
      desc: {
        zh: "面向机载挡风玻璃投射成像的需求，设计采用柱面镜的非对称投影光学系统，并使用非球面校正像差；系统在 x 轴方向缩小比为 1:40、y 轴方向为 1:10。",
        en: "Designed an asymmetric projection optical system using cylindrical lenses for windshield projection imaging in airborne applications, with aspheric surfaces for aberration correction; the system achieves demagnification ratios of 1:40 along x and 1:10 along y."
      },
      photos: [
        { src: "assets/images/asym-projection.jpg", cap: { zh: "非对称投影光学系统实验台架", en: "Experimental setup of the asymmetric projection system" } },
        { src: "assets/images/asym-lens.png", cap: { zh: "非对称投影系统光学结构", en: "Optical layout of the asymmetric projection system" } }
      ]
    }
  ],

  /* ---------------- 8. 竞赛获奖（photos 为证书图片） ---------------- */
  competitions: [
    {
      year: "2023",
      title: { zh: "第十一届全国大学生光电设计竞赛“宇瞳杯”光学设计赛道 国家级一等奖", en: "National First Prize, 11th National Optoelectronic Design Competition (\"Yutong Cup\"), Optical Design Track" },
      photos: [
        { src: "assets/images/award-optics-2023.jpg", cap: { zh: "获奖证书", en: "Award certificate" } }
      ]
    },
    {
      year: "2021",
      title: { zh: "“挑战杯”校级特等奖", en: "University Special Prize, \"Challenge Cup\"" }
    },
    {
      year: "2020",
      title: { zh: "全国大学生数学建模竞赛 国家级一等奖", en: "National First Prize, China Undergraduate Mathematical Contest in Modeling" },
      photos: [
        { src: "assets/images/award-modeling-2020.jpg", cap: { zh: "获奖证书", en: "Award certificate" } }
      ]
    },
    {
      year: "2019",
      title: { zh: "全国大学生数学竞赛 三等奖", en: "Third Prize, Chinese Mathematics Competitions (CMC)" }
    }
  ],

  /* ---------------- 9. 荣誉奖励 ---------------- */
  honors: [
    {
      year: { zh: "2025", en: "2025" },
      title: { zh: "天津大学-歌尔奖学金", en: "Tianjin University–Goertek Scholarship" }
    },
    {
      year: { zh: "2023、2024", en: "2023, 2024" },
      title: { zh: "研究生二等奖学金（2 次）", en: "Graduate Second-Class Scholarship (twice)" }
    },
    {
      year: { zh: "2020", en: "2020" },
      title: { zh: "求是学部（未来技术学院）“先进学生”荣誉称号", en: "Qiushi Honors College (School of Future Technology) \"Outstanding Student\" Award" },
      link: "https://qiushi.tju.edu.cn/info/1130/1951.htm"
    }
  ],

  /* ---------------- 10. 联系方式 ---------------- */
  /* 不想公开电话就把 phone 那一行删掉 —— 学术主页通常只留邮箱。 */
  contact: [
    { label: { zh: "邮箱", en: "Email" }, value: "loutaiyuange@tju.edu.cn", link: "mailto:loutaiyuange@tju.edu.cn" },
    { label: { zh: "电话", en: "Phone" }, value: "137-8229-7718", link: "tel:+8613782297718" },
    { label: { zh: "GitHub", en: "GitHub" }, value: "github.com/yogurt-lt", link: "https://github.com/yogurt-lt/" },
    { label: { zh: "ORCID", en: "ORCID" }, value: "0009-0004-0142-462X", link: "https://orcid.org/0009-0004-0142-462X" },
    { label: { zh: "单位", en: "Affiliation" }, value: { zh: "天津大学 精密仪器与光电子工程学院", en: "School of Precision Instrument and Opto-Electronics Engineering, Tianjin University" }, link: "" },
    { label: { zh: "地址", en: "Address" }, value: { zh: "天津市南开区卫津路 92 号", en: "92 Weijin Road, Nankai District, Tianjin, China" }, link: "" }
  ]
};

/* 让其他脚本可以读到（不要改这一行） */
window.SITE = SITE;
