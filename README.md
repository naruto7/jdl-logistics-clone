# 京东物流官网复刻（Vibe Coding 学习演示）

> **非官方声明**：本站是对京东物流官方网站 <https://www.jdl.com/> 的前端学习复刻，与京东物流（京东集团）无隶属关系。
> 页面文案、图片、Logo、品牌字体、视频等素材版权归京东物流所有，**仅用于学习与技术演示，不作任何商业用途**；如权利人认为不妥，可联系删除。素材逐文件出处见 [docs/ATTRIBUTION.md](docs/ATTRIBUTION.md)。

- **在线地址（已上线）**：<https://naruto7.github.io/jdl-logistics-clone/>
- **源码仓库**：<https://github.com/naruto7/jdl-logistics-clone>
- **参考站**：<https://www.jdl.com/>（采集基准：Chrome 141 无头模式，视口 1440×900，deviceScaleFactor 1）
- **技术栈**：Vite 7 · React 19 · TypeScript 5.9 · Tailwind CSS 4 · 多页静态构建（MPA）· GitHub Pages

## 1. 项目简介

用 Vibe Coding 的方式完成一个高还原度的企业官网复刻：以 jdl.com 首页为像素级目标，参考站实测数据（DOM / 计算样式 / 素材 / 文案）沉淀为 `spec/` 规格文件，首页与 6 个栏目页由多个 AI Agent 分区并行实现，再用截图 + 像素比对工具做量化校准，最后通过 GitHub Pages 自动发布。

三个关键点：

1. **测量驱动，不靠目测**：`spec/key-rects.json` 收录 322 个关键元素的 rect 与计算样式，`spec/home-spec.json` 收录 8 个区块的高度链、字号阶梯与设计令牌，组件只消费规格。
2. **多页静态产物（MPA）**：7 个真实 HTML 入口，GitHub Pages 上 `/services/`、`/solutions/` 等路径直接可访问，不依赖 SPA fallback。
3. **REST API 发布**：本机 `github.com:443` 不可达，`git push` 不可用；发布器改走 GitHub REST Git Data API（blob → tree → commit → ref），发布 `gh-pages` 与同步源码 `main` 共用同一条通道。

开发过程、环境约束、像素校准数据与踩坑记录见 [docs/VIBE-CODING.md](docs/VIBE-CODING.md)。

## 2. 功能与还原范围

### 2.1 页面

| 入口 | 路径（开发 / 生产） | 说明 |
|---|---|---|
| 首页 | `/` → `/jdl-logistics-clone/` | 复刻 jdl.com 首页，像素级还原目标 |
| 服务与产品 | `/services/` | 企业/个人服务分组、22 个服务锚点、履约为流程、网络数据条 |
| 解决方案 | `/solutions/` | 7 个行业方案 + 5 个行业案例，11 个锚点 |
| 服务支持 | `/support/` | 运单查询 / 时效 / 网点 / 服务范围 / FAQ / 联系，7 个锚点 |
| 可持续发展 | `/esg/` | ESG、青流计划、环保资讯，3 个锚点 |
| 关于京东物流 | `/about/` | 公司介绍、新闻、视频、投资者关系、联系我们等，6 个锚点 |
| 关于本项目 | `/project/` | 复刻方法、技术架构、分工与素材版权说明 |

### 2.2 首页区块（还原范围）

- **Header**：顶部黑色工具条 31px（集团网站 / 简体中文 / 登录）+ 白色主导航 69px（logo 161×27、6 个一级项、当前项红色下划线）；鼠标悬停展开 5 个 mega menu（面板高度 453 / 273 / 273 / 191 / 75，“服务与产品”含企业服务 / 个人服务二级 tab）。
- **Hero**：6 帧轮播（第 1 帧为 3.8s 循环视频，其余 5 帧为图片），文案层“助力企业降本增效 / 一体化供应链解决方案专家”。
- **运单查询悬浮卡**：宽 982px，负 margin 上叠 Hero；左侧渐变查询卡（查快递），右侧 4 个快捷入口（我要寄件 / 运费&时效查询 / 服务范围 / 网点查询）。
- **面向丰富场景的物流服务**：10 个服务项横滑 + 点击联动详情（10 套详情文案/产品列表与 10 个服务图标；详情大图当前入库的是官网快递快运卡车图，其余服务以对应图标插画兜底），产品服务卡、卡车大图、“立即咨询”按钮，区块高度 639px。
- **热门行业解决方案**：6 个行业 tab 切换背景图与文案（快消 / 服装 / 家电 / 3C / 汽车 / 生鲜），区块高度 504px。
- **物流网络**：进入视口触发数字滚动（6 大网络 / 3,600 个 / 3,400 万平方米 / 25 个）+ 4 个渐变圆形特性按钮，区块高度 515px。
- **新闻动态**：背景大图 + 4 张新闻卡 + 更多卡，hover 渐变遮罩与“查看详情”，区块高度 447px。
- **联系我们 + 页脚**：深色联系我们条（950616 + 3 个社交图标）+ 6 列链接 + 资质徽标条 + 备案条，高度 151 + 297px。

### 2.3 完成状态（2026-10-31 生产环境复验）

| 模块 | 状态 |
|---|---|
| 工程地基（Vite MPA / 设计令牌 / Header / Hero / Footer / 悬浮侧栏 / `link()` / `asset()`） | 已完成 |
| 首页 8 个区块（header/hero/搜索浮层/service/industry/network/news/联系+页脚） | 全部完成，区块 y/高度与官网零偏差，逐屏像素差异 0.42%–1.81%（见 §6） |
| 5 个栏目页 + 关于本项目页 | 已完成中等还原（结构与设计语言一致；锚点 299 个齐备、无死链） |
| 移动端 | 7 页 × 2 视口（390/1440）零横向溢出，不崩 |
| 生产发布 | GitHub Pages 已上线（`gh-pages` commit `c61c79db`），线上链接检查 0 死链 |

## 3. 技术栈与架构

| 层 | 选型 |
|---|---|
| 构建 | Vite 7（本地 dev server 实测 v7.3.7），`build.rollupOptions.input` 声明 7 个 HTML 入口 |
| 框架 | React 19 + TypeScript 5.9（`tsc --noEmit` 严格检查） |
| 样式 | Tailwind CSS 4；品牌令牌集中在 `src/styles/index.css` 的 `@theme` |
| 交互/动画 | 原生 React Hooks + CSS 动画（无第三方 UI 库） |
| 内容 | 数据驱动：导航/区块/内页数据放 `src/data/` 与 `src/sections/**/data.ts` |
| QA | puppeteer-core + pixelmatch + pngjs（驱动本机 Chrome，不下载 Chromium） |
| 发布 | GitHub Pages（`gh-pages` 分支根目录）；发布器走 GitHub REST Git Data API |

**两个路径解析层**（部署在子路径时最容易踩坑的地方）：

- `src/lib/links.ts` 的 `link(path)` / `sectionLink(path, anchor)`：用 `import.meta.env.BASE_URL` 拼接 base，开发为 `/`，构建为 `/jdl-logistics-clone/`；站内链接禁止写死 `href="/services/"`。
- `src/lib/assets.ts` 的 `asset(name)`：`import.meta.glob` 编译期登记 `src/assets/**` 下的文件为「逻辑名 → 带 hash 且带 base 的 URL」，组件只写逻辑名（如 `asset('service/lines-express.png')`）。

**构建期 base**：`vite.config.ts` 中 `base: command === 'build' ? '/jdl-logistics-clone/' : '/'`。产物 HTML 中脚本引用形如 `/jdl-logistics-clone/assets/main-*.js`，与 Pages 子路径一致。

## 4. 目录结构

```text
.
├─ index.html / services/ / solutions/ / support/ / esg/ / about/ / project/
│                       # 7 个 MPA 入口（各自 index.html，挂载对应 data-page）
├─ src/
│  ├─ assets/           官网素材（144 个文件，出处见 docs/ATTRIBUTION.md）
│  ├─ components/       通用组件（雪碧图动画、内页占位骨架等）
│  ├─ data/             导航结构、站点元信息、内页数据
│  ├─ layout/           Header（含 mega menu）/ Footer / 悬浮侧栏
│  ├─ lib/              links（base 解析）、assets（资源登记）
│  ├─ pages/            7 个页面组件
│  ├─ sections/home/    首页区块（hero/service/industry/network/news 及子组件）
│  ├─ sections/inner/   内页通用区块（PageHero/PageNav/primitives 等）
│  └─ styles/index.css  设计令牌（@theme）与少量全局动画
├─ spec/                参考站测量规格（唯一事实源）
│  ├─ key-rects.json    322 个关键元素 rect + 计算样式
│  ├─ home-spec.json    8 区块布局 / 字体阶梯 / 内容数据
│  └─ asset-plan.json   74 条素材下载计划
├─ tools/
│  ├─ spec/             探针、规格提取、素材计划（probe/extract/plan-assets 等）
│  ├─ qa/               截图、区块测量、像素比对、元素对齐、裁剪
│  ├─ fetch-assets.mjs  按 asset-plan 下载素材并写 manifest
│  ├─ deploy-gh.mjs     dist → gh-pages（Git Data API）
│  ├─ publish-source.mjs 源码 → main（Git Data API + git ls-files）
│  └─ lib/gh-core.mjs   GitHub REST 封装（blob/tree/commit/ref/pages）
├─ docs/                开发过程与素材出处（本目录）
├─ recon/               参考站侦察产物（本地目录，.gitignore 排除）
├─ qa/                  QA 截图/差异图（本地目录，.gitignore 排除）
└─ ref/                 早期参考截图（不参与构建）
```

> `recon/`、`qa/` 体积较大且属于一次性侦察/校准产物，已在 `.gitignore` 中排除；源码发布脚本用 `git ls-files` 取文件清单，因此不会把本地参考数据带上 GitHub。

## 5. 本地开发与构建

环境要求：

- Node.js 20.19+ 或 22.12+（Vite 7 要求；本项目在 **Node v24.18.1 / npm 11.16.0** 下验证）
- 本机已安装 Chrome（QA 工具默认路径 `C:\Program Files\Google\Chrome\Application\chrome.exe`，可用环境变量 `CHROME_PATH` 覆盖）

```powershell
# 安装依赖
npm install

# 开发服务器（HTTP 127.0.0.1:5173，dev 环境 base 为 /）
npm run dev

# 类型检查
npm run typecheck

# 生产构建：tsc --noEmit && vite build → dist/
npm run build

# 预览构建产物（127.0.0.1:4173）
npm run preview
```

构建产物：7 个 HTML 入口 + `dist/assets/main-*.js` + `main-*.css` + favicon，共 10 个文件（当前约 0.24 MB）。

## 6. 设计还原方法：测量驱动 + 像素比对

### 6.1 唯一事实源

| 文件 | 内容 | 生成方式 |
|---|---|---|
| `spec/key-rects.json` | 11 个选择器组、**322 个元素**的 rect + 字号/字重/行高/颜色/背景/圆角/阴影/padding/margin | `node tools/spec/probe.mjs`（打开 jdl.com，按选择器采集） |
| `spec/home-spec.json` | 8 个区块 y/高度链、68 条字体样式、11 个按钮、19 个卡片、61 个资源、导航与内容文案 | `node tools/spec/extract.mjs`（消费侦察数据文件） |
| `spec/asset-plan.json` | 74 条「原始 URL → 本地路径 → 用途」下载计划 | `node tools/spec/plan-assets.mjs` |
| `src/styles/index.css` | 设计令牌：品牌色 `#FC3737`、渐变 `linear-gradient(149.03deg,#FE7968,#FC3737)`、版心 982px、页头版心 1233px、深色 `#23252B`、字体 FZLTDHK / JDZhengHT | 手工沉淀自规格数据 |

### 6.2 关键规格（1440×900 实测）

| 指标 | 值 |
|---|---|
| 首页文档总高度 | 3099 px |
| 区块高度链（y+height） | banner 100+446 / search 483+115（上叠 -63.36）/ service 546+639 / industry 1185+504 / network 1689+515 / news 2204+447 / contact 2651+151 / footer 2802+297 |
| 版心 | `.container-page` 982px；页头版心 `.container-header` 1233px |
| 导航 | 黑色工具条 31px + 白色主导航 69px，合计 100px |
| 主色 | `#FC3737`；渐变端点 `#FE7968` → `#FC3737` |
| 字体 | 正文 PingFangSC 栈；区块标题 FZLTDHK；数字/电话 JDZhengHT/JDZHT |
| 字号阶梯 | 15.36 / 17.28 / 21.12 / 23.04 / 25.92 / 36 / 37.44 / …（完整值见 `spec/home-spec.json`） |

### 6.3 QA 工具与命令

> 以下命令需要本地存在 `recon/`（参考站截图）与参考基准；`recon/` 是不入库的本地目录，首次使用需按 `docs/VIBE-CODING.md` 的侦察流程重新采集。

```powershell
# 1) 按固定视口截取本地页面（预热滚动触发懒加载与动画）
node tools/qa/shoot.mjs url=http://127.0.0.1:5173/ out=qa/ours.png scroll=0,900,1800,2700

# 2) 区块 y/高度对齐检查（与 spec/home-spec.json 对比，±2px 判为对齐）
node tools/qa/measure.mjs http://127.0.0.1:5173/

# 3) 关键元素 rect 对齐检查（组件上的 data-qa 标记 vs 参考 rect，±2px）
node tools/qa/compare-elements.mjs http://127.0.0.1:5173/

# 4) 逐像素比对：输出差异率 + 差异图 + 左右并排图 + JSON
node tools/qa/compare.mjs a=recon/shots/home-S01.png b=qa/ours-S01.png out=qa/diff-s01
```

比对口径：pixelmatch `threshold=0.12`、`includeAA=false`；输出 `diffPixels / (width×height)` 差异率，以及 `<out>.diff.png`（红色高亮）、`<out>.side.png`（参照 | 复刻 | 差异）、`<out>.json`（机器可读）。

### 6.4 最终差异率（生产环境，2026-10-31 复验）

对 `https://naruto7.github.io/jdl-logistics-clone/` 线上产物截图，与官网参考截图（Chrome headless 1440×900，同一渲染参数）逐屏比对：

| 对比 | 差异率 | 说明 |
|---|---|---|
| home-S01（首屏 + 导航 + 搜索浮层） | **0.821%** | 已用 mask 排除 Hero 动态视频区域（帧相位不可控） |
| home-S02（service 详情 + industry） | **0.531%** | |
| home-S03（network + news 上半） | **0.416%** | |
| home-S04（news 下半 + 联系 + 页脚） | **1.809%** | 含甲方要求追加的「非官方复刻」声明与项目入口（官网无此内容） |

分区（构建方各自复测）：service 区 0.31%–0.50%、industry 整区 0.580%、network 整区 0.565%（可见区 0.093%）、news 整区 1.256%。

首页首屏差异率在开发过程中从 5.637% 收敛到 0.821%，说明「截图 → 比对 → 改令牌/尺寸 → 复测」闭环有效。剩余差异主要来自 Hero 视频帧相位、字体渲染平台差异、hover 态与甲方要求的追加声明。

## 7. 部署说明（GitHub Pages + Git Data API）

### 7.1 为什么不用 `git push`

本机网络对 `github.com:443` 不可达（`git push` 无法完成），但 `api.github.com` 可达。发布器因此改用 GitHub REST 的 Git Data API，效果与推送分支等价：

```text
dist/ 文件
  → POST /git/blobs            每个文件一个 blob
  → POST /git/trees            整棵树（不含 base_tree：整树替换，不残留旧文件）
  → POST /git/commits          生成提交（首次无 parents，之后带上次 sha）
  → PATCH /git/refs/heads/gh-pages  移动分支指针
  → GET/POST/PUT /pages        确保 Pages 指向 gh-pages:/
  → GET /pages/builds/latest   每 3s 轮询，最多 180s，直到 status=built
```

实现：`tools/lib/gh-core.mjs`（`createClient` / `pushFilesAsCommit` / `ensurePages`），两个入口脚本复用。

### 7.2 发布命令

准备一个有 `contents: write`（以及首次启用 Pages 所需 `pages: write`）权限的 GitHub Token，**不要提交到仓库**：

```powershell
# PowerShell：从 gh CLI 取 token，或直接写 PAT
$env:GH_TOKEN = (gh auth token)
# $env:GH_TOKEN = "ghp_xxxxxxxx"

# 构建站点
npm run build

# 发布 dist/ 到 gh-pages 分支，并等待 Pages 构建完成
npm run deploy

# 同步源码到 main 分支（git ls-files 清单，自动排除 node_modules/dist/recon/qa）
npm run publish:source
```

等价于直接调用：

```powershell
node tools/deploy-gh.mjs owner=naruto7 repo=jdl-logistics-clone dir=dist
node tools/publish-source.mjs owner=naruto7 repo=jdl-logistics-clone
```

### 7.3 Pages 配置与当前发布状态

- 仓库：`naruto7/jdl-logistics-clone`（public），默认分支 `main`。
- Pages 发布源：`gh-pages` 分支根目录（`/`），站点地址 <https://naruto7.github.io/jdl-logistics-clone/>。
- 已核实的提交（GitHub API 数据，UTC 时间）：`main` 分支 `3bdc8f49 Initial commit`（2026-10-30T06:40:52Z）、`cbb5048d chore(source): 同步源码 2026-10-30T06:47:51.133Z`（06:48:02Z）；`gh-pages` 分支 `8593b994 chore: 部署管线自检占位页`（06:42:18Z，根目录含 `.nojekyll` 与 `index.html`）。
- 结论：**“源码/产物 → Git Data API → Pages 构建”链路已用自检页跑通**；当前 `gh-pages` 上仍是自检占位页，执行 `npm run deploy` 会用最新 `dist/` 整树覆盖。
- 注意：`pushFilesAsCommit` 采用整树替换（不带 `base_tree`），分支上旧文件不会残留；`dist/` 里没有 `.nojekyll`，若将来产物包含下划线开头文件（Jekyll 会忽略），需要在 `dist/` 中放一份 `.nojekyll` 一起发布。

### 7.4 子路径部署约束

- 生产 `base = '/jdl-logistics-clone/'`，开发 `base = '/'`；所有站内链接必须走 `link()`，图片/视频必须走 `asset()`。
- 已构建产物验证：`dist/index.html` 中脚本与样式引用带 `/jdl-logistics-clone/` 前缀；7 个入口的 meta/title 均为中文（构建后按 UTF-8 输出）。
- 写死 `href="/services/"` 在本机会开发正常、上 Pages 会 404，这是本项目最典型的一个坑（见 VIBE 文档）。

## 8. 已知差异与边界

| 项 | 说明 |
|---|---|
| Hero 视频帧 | 官网首屏为 3.8s 循环视频，静态截图只能对齐“某一帧”；该区域是像素比对的主要残差来源 |
| hover / 过渡 | mega menu、卡片 hover 已实现，但与官网的过渡曲线、时序存在细微差异；静态像素比对不覆盖 hover 态 |
| 内页深度 | 5 个栏目页为中等还原（结构、锚点、设计语言一致），未逐页做像素级复刻 |
| 移动端 | 以 1440 PC 为主战场；移动端仅保证布局不崩、无横向溢出，不做精细适配 |
| 字体渲染 | 官网正文优先 PingFang（macOS 渲染），Windows 无该字体时回退微软雅黑，字形存在平台差异 |
| 派生素材 | 联系我们 3 个小图标与页脚徽标条为截图裁剪派生；其中 `contact/icon-qiwei.png` 为破图占位，已列入待修复项（详见 ATTRIBUTION §5.2） |
| 功能边界 | 运单查询、登录等仅为前端演示交互，不请求官方接口，也不具备真实业务能力 |
| 发布状态 | Pages 管线已跑通但线上仍是自检页；正式站点以最后一次 `npm run deploy` 为准 |

## 9. 素材与版权

- 素材 144 个文件 / 25.02 MB：首页 78 条 + 内页 53 条共 **131 条登记在 manifest**，另有 9 个未登记但与官网原图字节一致的副本、4 个截图派生图形。
- 131 条登记 URL 去重 128 条，逐条 HTTP HEAD 复核全部返回 200。
- 每个文件的「原始 URL / 截图来源矩形 / 尺寸 / 用途」见 **[docs/ATTRIBUTION.md](docs/ATTRIBUTION.md)**。
- 素材版权归京东物流（京东集团）及相应权利人所有，仅用于本学习演示项目，不随项目再授权；如权利人要求可删除对应文件并替换占位图。

## 10. 文档与致谢

- [docs/VIBE-CODING.md](docs/VIBE-CODING.md)：Vibe Coding 全过程记录（环境侦察 → 参考站测量 → 规格化 → Agent Teams 并行 → 像素校准 → 发布验收，含命令、数据与踩坑）。
- [docs/ATTRIBUTION.md](docs/ATTRIBUTION.md)：素材出处与版权清单。
- [spec/home-spec.json](spec/home-spec.json)、[spec/key-rects.json](spec/key-rects.json)：参考站测量规格。

版本：`v1.0.0`（2026-10-30）。感谢京东物流官网作为设计与实现参考，以及参与本项目的 Agent Teams（Lead、recon-scout、builder-service / industry / network / news、builder-pages）。
