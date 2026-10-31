# Vibe Coding 开发过程记录

> 项目：京东物流官网前端复刻（学习演示，非官方）｜环境：Windows 10 + Node v24.18.1 + Chrome 141 无头模式｜开发窗口：2026-10-30
> 本文记录“一个高还原度站点如何被测量、规格化、并行实现、量化校准并自动发布”的全过程，包含实际执行的命令、落盘数据与踩过的坑。

## 0. 总览

| 阶段 | 产物 | 关键数字 |
|---|---|---|
| 环境侦察 | 工具链验证 + 网络边界结论 | Chrome 141 / puppeteer-core 25.16 / Vite 7.3.7；`github.com:443` 不可达，`api.github.com` 可达 |
| 参考站侦察 | `recon/`（截图、DOM、样式、文案、素材、报告） | 页面 3099px、8 区块；素材包 92 个 / 12.9MB |
| 规格化 | `spec/key-rects.json`、`spec/home-spec.json`、`spec/asset-plan.json` | 322 元素 / 8 区块 / 68 条字体样式 / 74 条素材计划 |
| 并行实现 | `src/`（首页 5 区块 + 7 个 MPA 页面） | 6 个并行 Agent，写作用域互不重叠 |
| 像素校准 | `qa/`（截图、差异图、差异率 JSON） | 首屏差异率 5.637% → 0.827% |
| 发布验收 | `gh-pages` + `main`（Git Data API） | 自检提交 `8593b994`；源码提交 `cbb5048d` |

---

## 1. 环境侦察：先把“边界”量清楚

### 1.1 工具链

| 项 | 实测值 / 路径 |
|---|---|
| OS | Windows（工作目录 `E:\走软京东物流`） |
| Node / npm | v24.18.1 / 11.16.0 |
| Chrome | `C:\Program Files\Google\Chrome\Application\chrome.exe`（QA 工具默认值，可用 `CHROME_PATH` 覆盖） |
| 浏览器自动化 | `puppeteer-core@25.16.0`（复用系统 Chrome，不下载 Chromium） |
| 前端构建 | Vite v7.3.7（本地 dev server 启动日志：`ready in 389 ms`） |
| 像素比对 | `pixelmatch@8` + `pngjs@7` |

关键取舍：机器上没有 Playwright 浏览器包，但有系统 Chrome；`puppeteer-core` 省掉了下载 Chromium 的成本，且截图/探针口径统一（1440×900、dpr 1、`--hide-scrollbars`、`--lang=zh-CN`）。

### 1.2 网络边界与绕行

项目启动阶段的可达性探测结论（记录在 `tools/lib/gh-core.mjs`、`tools/publish-source.mjs` 的注释中，并由发布器实际运行验证）：

| 目标 | 结果 | 影响 |
|---|---|---|
| `https://www.jdl.com/` | 可达（HTTP 200） | 可做参考站侦察、内页文案/素材采集 |
| jdl OSS / CMS / CDN 域名 | 可达 | 图片、视频、字体可直接下载 |
| `github.com:443` | **不可达** | `git push` / `git clone` 无法使用 |
| `api.github.com` | **可达** | 发布改走 GitHub REST Git Data API |

因此发布链路设计成：本地 `git` 只做版本管理（`git ls-files` 提供文件清单），对外发布全部走 REST API：

```text
dist/ → POST /git/blobs → POST /git/trees → POST /git/commits
      → PATCH /git/refs/heads/gh-pages → Pages 构建 → https://<owner>.github.io/<repo>/
```

### 1.3 Windows 上的一个真实崩溃：Vite dev server 被 `.tmpdir` 打死

- **症状**：编辑器“原子写”保存文件时会在项目目录生成 `.xxx.tmpdir` 临时目录；Vite（chokidar）监听文件变化时对其 `stat` 失败，报 `EBUSY: resource busy or locked`，dev server 直接退出，HMR 中断。
- **定位**：`EBUSY` 与临时目录路径同时出现在 dev server stderr；稳定复现于编辑器保存动作。
- **修复**：在 `vite.config.ts` 的 `server.watch.ignored` 里排除临时文件与 QA 产物目录：

```ts
// vite.config.ts（第 37-40 行）
watch: {
  ignored: ['**/*.tmp', '**/*.tmpdir/**', '**/.tmpdir/**', '**/.*.tmpdir/**', '**/qa/**'],
},
```

- **验证**：修复后 `qa/dev.log` 记录连续的 HMR 更新（无崩溃），dev server 稳定运行于 `http://127.0.0.1:5173/`。

---

## 2. 参考站侦察：把“像”变成可复现的数据

### 2.1 侦察流程（recon-scout）

在写第一行复刻代码前，先产出一套完整的“参考站数据包”：

```powershell
cd recon
npm i puppeteer-core
node scripts\capture.mjs      # 全量采集：截图 / DOM / 计算样式 / 结构 / 文案 / 素材 URL / 导航 / 交互 / 移动端
node scripts\reshoot.mjs      # 强制加载懒加载图片后重截（修灰块）
node scripts\probe7.mjs       # 设计令牌 + 行业 tab 六态 + 数字滚动终值 + Hero 逐帧
node scripts\probe8.mjs       # 10 套服务详情 + 字体/装饰/CTA 细节
node scripts\download-assets.mjs
node scripts\build-data.mjs   # 汇总 computed.json / structure.json / content.json / pages.json
```

> `recon/` 是一次性侦察目录，已在 `.gitignore` 中排除、不随源码发布；上面的脚本与产物用于本次复刻的本地复现。

技术要点：

1. **预热滚动**：官网图片统一用 `src="data:image/gif;base64,…"` 占位 + `data-src` 懒加载；截图/测量前必须滚动预热并 `forceLoad()`（替换 `data-src`、`decode()`），否则卡片是灰块。第一版 `home-S03.png` 就踩过这个坑（新闻卡灰块）。
2. **交互态单独采集**：mega menu 用 `page.mouse.move` 悬停展开后截图（5 个菜单 5 张图）；行业 tab 悬停切换背景；服务区 10 个详情逐个“真实鼠标点击”触发（`element.click()` 合成事件无效，必须 `page.mouse.click` 坐标）。
3. **数字滚动终值**：官网统计数字是 10 个 `<span>` 纵向排布 + `translateY(-n×10%)`，滚动动画结束后从 `transform` 反解出终值：6 / 3,600 / 3,400 / 25。
4. **Hero 是视频**：第 1 帧 `<video src="…homeBanner.mp4">`（1790×560、3.8s、muted/loop），不是图片；后续 5 帧为图片，营销文案烘焙在图片里。
5. **移动端基线**：390×844 下 `html font-size=104px`、header 50px、总高 2540px、无横向溢出（独立移动版布局）。

### 2.2 侦察核心数据（1440×900 实测）

| 指标 | 值 |
|---|---|
| 文档总高度 | 3099 px |
| 版心 | `.detail-wrap` 982.078 px = `13.64rem`；根字号 `html{font-size:72px}`（JS 写入，= 视口宽/20，即 5vw） |
| 区块高度链 | banner 100+446 / search 483+115（-63.36 上叠）/ service 546+639 / industry 1185+504 / network 1689+515 / news 2204+447 / contact 2651+151 / footer 2802+297 |
| 导航 | 黑条 31px + 白条 69px = 100px；logo 显示 161×27 |
| Mega menu 面板高 | 服务与产品 453 / 解决方案 273 / 服务支持 273 / 可持续发展 191 / 关于京东物流 75 |
| 主色 | `#FC3737`；品牌渐变 `linear-gradient(149.03deg,#FE7968,#FC3737)`；标题短线 `#F10215` |
| 字体 | 正文 PingFangSC 栈；区块标题 FZLTDHK；数字/电话 JDZhengHT |
| 素材 | 92 个文件 / 12.9 MB（含 3.97 MB Hero 视频、10 张服务详情大图、6 张 3840 宽行业背景、5 个品牌字体） |
| 链接 | 首页 154 条 href、mega menu 内 120 条链接（17 条 `javascript:void(0)`）、74 条 jdl.com 路径 |

沉淀文件：`recon/dom/home.html`（渲染后 DOM）、`recon/dom/computed.json`（字体阶梯/颜色/圆角阴影/布局）、`recon/structure.json`、`recon/content.json`（全量文案）、`recon/pages.json`（导航 + 内页路径风格）、`recon/REPORT.md`（给主程的简报）。

---

## 3. 规格化：从侦察数据到工程事实源

侦察数据是“全量、噪杂”的，直接喂给组件不可维护；因此加了一层“规格提取”：

| 命令 | 输入 | 输出 | 关键数字 |
|---|---|---|---|
| `node tools/spec/probe.mjs` | 直接打开 jdl.com，按 11 组选择器（header/dropmenu/banner/search/service/industry/network/news/contact/footer/float）采集 | `spec/key-rects.json` | **322 个元素**，每个含 rect + 字号/字重/行高/颜色/背景/圆角/阴影/padding/margin |
| `node tools/spec/extract.mjs` | `recon/logs/*.json` | `spec/home-spec.json` | 8 区块、68 条字体样式、11 个按钮、19 个卡片、61 个资源、文案/导航/新闻数据 |
| `node tools/spec/plan-assets.mjs` | 侦察数据 + `recon/dom/home.html` | `spec/asset-plan.json` | **74 条**下载计划（url → target → note） |
| `node tools/fetch-assets.mjs` | `spec/asset-plan.json` | `src/assets/**` + `src/assets/manifest.json` | 6 并发、失败重试 3 次、已存在跳过；首页 **78 条**登记 |
| `node qa/fetch-inner-assets.mjs` + `fix-inner-assets.mjs` | 官网内页素材候选 | `src/assets/inner/**` + `inner/manifest.json` | 内页 **53 条**登记 |

最终素材账本：`src/assets` 下 **144 个媒体文件 / 25.02 MB**，其中 131 条登记原始 URL、9 个未登记但字节等同官网原图、4 个截图派生图形（详见 `docs/ATTRIBUTION.md`）。

### 3.1 设计令牌落地

`src/styles/index.css` 用 Tailwind 4 的 `@theme` 把规格变成 token（组件只消费 token，不硬编码）：

```css
@theme {
  --color-brand: #fc3737;
  --color-brand-light: #fe7968;
  --color-ink: #1a1a1a;      /* #525765 / #868d9f 依次为次级、弱文字 */
  --color-dark: #23252b;
  --color-surface: #f2f3f7;

  --font-display: 'FZLTDHK', 'PingFangSC-Regular', 'Microsoft YaHei', sans-serif;
  --font-num: 'JDZhengHT', 'JDZHT', 'Roboto', sans-serif;
}

/* 版心：1440 视口下 982px，左边界 229px */
@utility container-page { width: 982px; max-width: calc(100% - 64px); margin-inline: auto; }
@utility container-header { width: 1233px; max-width: calc(100% - 40px); margin-inline: auto; }
@utility bg-brand-gradient { background-image: linear-gradient(149.03deg, #fe7968, #fc3737); }
```

### 3.2 两个“子路径”基础设施

- `src/lib/links.ts`：`link('/services/')` 用 `BASE_URL` 得到 `/jdl-logistics-clone/services/`；`sectionLink(path, anchor)` 追加锚点。
- `src/lib/assets.ts`：`import.meta.glob('../assets/**/*', { eager: true, query: '?url' })` 编译期登记“逻辑名 → 带 hash 的 URL”，`asset('contact/tel.png')` 在开发/生产两套 base 下都能取到正确地址。

---

## 4. 并行分工：Agent Teams 怎么切

Lead 负责地基与集成，其余按“写作用域”拆给互不相同的 Agent（同一工作目录、共享文件系统；写作用域只做“建议边界”，靠文件不重叠 + Lead 最终审查兜底）：

| 角色 | 负责内容 | 写作用域（不重叠） |
|---|---|---|
| **Lead** | 架构/设计令牌/Header/Hero/Footer/悬浮侧栏、`spec/` 与 `tools/`、集成、类型检查、QA 基线与发布 | `src/layout/`、`src/styles/`、`src/lib/`、`src/data/site.ts`、`tools/`、`spec/`、根配置 |
| **recon-scout** | 参考站侦察：截图、DOM、计算样式、文案、素材包、侦察报告 | `recon/`（只写这一目录） |
| **builder-service** | 首页 service 区：10 项横滑 + 详情联动 + 产品卡 + CTA | `src/sections/home/ServiceSection.tsx`、`src/sections/home/service/` |
| **builder-industry** | 首页 industry 区：6 行业 tab、背景切换、信息块 | `src/sections/home/IndustrySection.tsx`、`src/sections/home/industry/` |
| **builder-network** | 首页 network 区：4 组数字滚动、特性圆钮、地球背景 | `src/sections/home/NetworkSection.tsx`、`src/sections/home/network/` |
| **builder-news** | 首页 news 区：4 张新闻卡 + 更多卡 + hover | `src/sections/home/NewsSection.tsx`、`src/sections/home/news/` |
| **builder-pages** | 5 个栏目页 + 关于本项目页：内容抓取、49 个锚点、内页区块与素材 | `src/pages/*.tsx`、`src/sections/inner/`、`src/data/inner/`、`src/assets/inner/` |

协作方式：

1. **共享任务板**：任务按依赖领取（claim → 完成 → complete），每个任务写明验收标准（区块高度、与哪张参考截图一致、`tsc` 通过）。
2. **规格先行**：所有 builder 拿到同一份 `spec/` + 设计令牌；区块高度、版心、字号不允许各自发挥。
3. **数据与组件分离**：首页各区的数据放各自 `data.ts`/`newsData.ts`，公共内容（导航/页脚/站点声明）由 Lead 维护。
4. **集成与验收归 Lead**：builder 只对单一区块负责，Header/Footer/Hero/样式令牌等公共文件由 Lead 独占写入，避免并发写冲突；最终 `npm run typecheck`、`npm run build`、像素比对与发布由 Lead 兜底。

---

## 5. 实现：页面结构与交互

- **MPA**：7 个入口 HTML（`/`、`/services/`、`/solutions/`、`/support/`、`/esg/`、`/about/`、`/project/`）各自挂 `#root[data-page]`，`src/main.tsx` 读取 `data-page` 选择页面组件；`src/App.tsx` 统一套 Header/Footer/悬浮侧栏。
- **Header**：hover 展开 mega menu；「服务与产品」用 `useState` 切换企业服务/个人服务两列；一级导航当前项红色文字 + 2px 下划线；工具条 31px、主导航 69px。
- **导航数据**：`src/data/nav.ts` 记录 5 个 mega menu 的分组/链接，二级/三级链接统一映射到落地页锚点（`originalPath` 字段保留官网原始路径），保证「零死链」。
- **Hero**：视频 + 5 张轮播图，文案层与查询卡按官网坐标定位（查询卡 982 宽、`-63.36px` 上叠、z-index 2）。
- **service**：`.service-types` 横向 `translateX` 轮播，10 项、每项 197×72；点击切详情，10 套详情数据（文案/产品列表/咨询链接）来自官网，详情大图目前只入库 `service/express-truck.png`（快递快运卡车图），其余服务以对应 line 图标做插画兜底（素材缺口已记录，补齐后可直接替换）。
- **industry**：6 个 tab，hover/点击切换行业背景图与文案，激活 tab 是 162×101 的渐变卡。
- **network**：`NumberRoll` 组件（10 个数字 span 纵向滚动）+ `useInViewOnce`（IntersectionObserver 触发一次）；4 个 113×113 渐变圆钮带 `quickBounce`。
- **news**：4 张 194×305 卡片 + 171×228 更多卡；hover 显示渐变遮罩与“查看详情”。
- **内页**：`PageHero` + `PageNav` + `AnchorSection`/`AnchorCard`/`MediaCard`/`StatStrip` 等 primitives；共 **49 个锚点**（services 22 / solutions 11 / support 7 / esg 3 / about 6），全部由导航与页脚链接消费。

---

## 6. 像素级校准：量化收敛，而不是“看着差不多”

### 6.1 闭环

```text
启动 dev server
  → tools/qa/shoot.mjs 固定视口截图（预热滚动 + fonts.ready）
  → tools/qa/compare.mjs 与参考截图逐像素比对（pixelmatch，threshold 0.12）
     输出 diff 率 + diff 高亮图 + 左右并排图 + JSON
  → tools/qa/measure.mjs 对区块 y/高度（±2px）
  → tools/qa/compare-elements.mjs 对关键元素 rect（±2px，组件带 data-qa 标记）
  → 读 side.png/diff.png 定位偏移 → 修组件/token → 复测
```

工具清单（`tools/qa/`）：`shoot.mjs`（截图，支持 `scroll=0,900,1800` 多屏）、`compare.mjs`（像素比对）、`measure.mjs`（区块对齐）、`compare-elements.mjs`（元素级对齐）、`el-shot.mjs`（元素级截图）、`crop.mjs`（从截图裁剪小素材）、`debug-assets.mjs`（资源加载自检）。

### 6.2 实测差异率快照（`qa/diff-*.json`，2026-10-30 15:16）

| 对比文件 | 参照 | 复刻 | 差异率 | 差异像素/总像素 |
|---|---|---|---|---|
| `diff-s01.json` | `recon/shots/home-S01.png` | `qa/ours-S01.png` | **0.827%** | 10,721 / 1,296,000 |
| `diff-s02.json` | `recon/shots/home-S02.png` | `qa/ours-S02.png` | **0.562%** | 7,278 / 1,296,000 |
| `diff-s03.json` | `recon/shots/home-S03.png` | `qa/ours-S03.png` | **0.416%** | 5,393 / 1,296,000 |
| `diff-s04.json` | `recon/shots/home-S04.png` | `qa/ours-S04.png` | **1.768%** | 22,911 / 1,296,000 |
| `diff-service01.json` | `recon/shots/home-S01.png` | `qa/service-S01.png` | 1.343% | 17,406 / 1,296,000 |
| `diff-service02.json` | `recon/shots/home-S02.png` | `qa/service-S02.png` | 0.580% | 7,521 / 1,296,000 |
| `diff-industry-full.json` | `recon/shots/home-S02.png` | `qa/industry-S01.png` | 0.580% | 7,521 / 1,296,000 |
| `diff-network-reconflags.json` | `recon/shots/home-S03.png` | `qa/network-reconflags-S02.png` | 0.416% | 5,393 / 1,296,000 |
| `diff-network-section.json` | `qa/network-ref-section.png` | `qa/network-section.png` | 0.565% | 4,190 / 741,600 |
| `diff-news.json` | `qa/news-ref-section.png` | `qa/news-ours-section.png` | 1.256% | 8,085 / 643,680 |
| `diff-news-full.json` | `recon/shots/home-S03.png` | `qa/news-S01.png` | 1.029% | 13,337 / 1,296,000 |

收敛示例：同一校准窗口内的早一轮 → 最新落盘之间，S01 差异率 **5.637% → 0.827%**、S02 **2.790% → 0.562%**、S03 **1.029% → 0.416%**。校准动作大多不是“大改”，而是令牌级修正（容器宽度、间距、字号、圆角阴影、图片裁切/定位）。

### 6.3 残差归因

- **Hero 视频帧相位**：首屏是 3.8s 循环视频，静态截图只能对齐某一帧，属于可接受残差。
- **字体渲染**：参考站截图在 Windows 上回退到微软雅黑，与 PingFang 原设计存在字形差异。
- **hover 态**：静态比对不覆盖 mega menu 展开、卡片 hover 等状态，需要单独截图检查。
- **派生素材**：联系我们小图标/页脚徽标条是截图裁剪，边缘抗锯齿与官网原始素材有细微差异；其中 `contact/icon-qiwei.png` 是破图占位（已知问题，待替换，见 `docs/ATTRIBUTION.md` §5.2）。
- **PNG 编码差异**：同一画面两种无损编码不影响像素；但浏览器缩放/滚动条状态会影响坐标，因此截图统一 `--hide-scrollbars`、固定 1440×900。

---

## 7. 发布与验收

### 7.1 构建

```powershell
npm run build   # tsc --noEmit && vite build
```

产物（`dist/`，10 个文件 / 约 0.24 MB）：7 个 HTML 入口 + `assets/main-<hash>.js`（当前构建 235,940 B）+ `assets/main-<hash>.css`（13,239 B）+ `favicon.svg`。构建 base 为 `/jdl-logistics-clone/`，产物中脚本引用已验证带该前缀（文件名 hash 随构建变化，以实际产物为准）：

```html
<script type="module" crossorigin src="/jdl-logistics-clone/assets/main-Dkq1hUTy.js"></script>
<link rel="stylesheet" crossorigin href="/jdl-logistics-clone/assets/main-DHX5GBKv.css">
```

### 7.2 发布（Git Data API）

```powershell
$env:GH_TOKEN = (gh auth token)   # 需要 repo contents:write（首次启用 Pages 还需 pages:write）
npm run deploy                    # tools/deploy-gh.mjs → gh-pages
npm run publish:source            # tools/publish-source.mjs → main（git ls-files）
```

`tools/lib/gh-core.mjs` 的细节：

- `pushFilesAsCommit`：8 路并发上传 blob → 建 tree（不带 `base_tree`，整树替换）→ 建 commit（首提交无 parents，之后带上一提交 sha）→ `PATCH /git/refs/heads/<branch>` 强制移动分支。
- `ensurePages`：`GET /repos/{owner}/{repo}/pages`（未启用 404）→ `POST` 启用或 `PUT` 切换 source branch → 每 3s 轮询 `GET /pages/builds/latest`，直到 `built`（180s 超时）。
- Token 从环境变量读取，不写入文件、不提交仓库。

### 7.3 发布状态证据（GitHub API 实测）

| 分支 | 提交 | 时间（UTC） | 说明 |
|---|---|---|---|
| `main` | `3bdc8f49` | 2026-10-30T06:40:52Z | Initial commit |
| `gh-pages` | `8593b994` | 2026-10-30T06:42:18Z | `chore: 部署管线自检占位页`（根目录 `.nojekyll` + `index.html`） |
| `main` | `cbb5048d` | 2026-10-30T06:48:02Z | `chore(source): 同步源码 2026-10-30T06:47:51.133Z`（`publish-source.mjs` 产物） |

结论：**“构建产物 → Git Data API → Pages 构建”链路已跑通**（自检页为证）；线上当前仍是自检占位页，最终发布只需在最新 `dist/` 上执行 `npm run deploy`。

### 7.4 验收口径

- `tsc --noEmit` 通过（`npm run build` 前置）。
- 构建产物 7 个入口均生成，base 前缀正确。
- 首页四屏与参考图的像素差异率（见 §6.2）作为量化验收指标；区块 y/高度 ±2px；关键元素 rect ±2px。
- 导航零死链：5 个 mega menu 的二级/三级链接全部映射到 7 个落地页的 49 个锚点之一。
- 素材：144 个文件全部有出处记录；131 条登记 URL HEAD 复核 128/128 全 200（去重后）。
- 线上验收：发布后访问 <https://naruto7.github.io/jdl-logistics-clone/> 与 7 个路径（`/services/`、`/solutions/`、`/support/`、`/esg/`、`/about/`、`/project/`）。

---

## 8. 踩坑清单（按影响排序）

| # | 坑 | 现象 | 解法 |
|---|---|---|---|
| 1 | 内网/网络对 `github.com:443` 阻断 | `git push` 超时；无法用常规 CI 发布 | 改走 Git Data API（blob → tree → commit → ref），发布与源码同步共用 `gh-core.mjs` |
| 2 | GitHub Pages 子路径部署 | 写死 `href="/services/"` 在线上跳到域名根 → 404 | 所有站内链接走 `link()`（`BASE_URL`）；图片走 `asset()`（`import.meta.glob` 登记）；构建 base 固定 `/jdl-logistics-clone/` |
| 3 | Windows 编辑器原子写 + chokidar | dev server `EBUSY: resource busy or locked` 退出 | `vite.config.ts` 的 `server.watch.ignored` 排除 `*.tmp`、`*.tmpdir/**`、`qa/**` |
| 4 | 官网懒加载图片 | 直接截图出现灰色占位块（新闻卡、页脚徽标） | 截图前滚动预热 + 把 `img[data-src]` 强制换为 `src` 并 `decode()`，再截图 |
| 5 | 官网组件用图标字体/懒加载小图 | 无法通过 URL 单独下载（社交图标、徽标条、箭头） | 元素级截图 `el-shot.mjs` / 从参照截图 `crop.mjs` 裁剪，并在 `docs/ATTRIBUTION.md` 标注为「截图派生」 |
| 6 | `el.click()` 对部分交互无效 | 服务区/行业 tab 用合成事件点不动 | 改用真实鼠标事件 `page.mouse.click(x, y)` 并等待过渡 |
| 7 | Hero 视频帧不可控 | 像素比对首屏差异偏大 | 接受为已知边界；视觉验收用人工核对视频帧与静态图 |
| 8 | 整树发布替换 | `gh-pages` 上旧文件不残留，但 `.nojekyll` 也会被覆盖删除 | 当前产物无下划线文件不受影响；若需要，把 `.nojekyll` 放进 `dist/` 一起发布 |
| 9 | `dist/`/`recon/`/`qa/` 体积 | 仓库不应带上侦察截图与构建产物 | `.gitignore` 排除；`publish-source.mjs` 用 `git ls-files` 清单，天然排除 |
| 10 | 字体渲染平台差异 | Windows 回退微软雅黑，字宽与 macOS 截图不同 | 记录为已知差异；标题字体 FZLTDHK 用 `@font-face` 保证跨平台一致 |

---

## 9. 复盘

**奏效的做法**

1. **测量先行**：先有 322 项元素测量 + 8 区块高度链 + 设计令牌，再动手写组件；“像不像”从主观讨论变成可比较的数字。
2. **规格单一事实源**：`spec/` 同时被 6 个 Agent 消费，避免各自估字号、间距、颜色。
3. **写作用域切分**：每个 builder 只碰自己的 section 文件，公共文件归 Lead；并行 4 个区块实现没有出现文件级冲突。
4. **QA 作为客观门禁**：`compare.mjs` 的差异率 + `measure.mjs` 的 ±2px + `compare-elements.mjs` 的元素级对齐，让“改哪、改多少”有依据。
5. **发布自动化**：网络受限时绕行 REST API，发布/同步源码各一条命令，且不依赖本地 git push。

**待改进**

- 派生素材（截图裁剪）应纳入 manifest 与自动化核对（当前已用 SHA-256/模板匹配补齐 ATTRIBUTION，但没有生成流程固化）。
- `contact/icon-qiwei.png` 的破图占位需要替换为官网图标 + 圆底合成（详见 ATTRIBUTION）。
- 视觉回归基线（参考截图 + 差异率阈值）应进仓库/CI，而不是只留在本地 `recon/`、`qa/`。
- 移动端目前只保证不崩；若要“移动端不崩且不丑”，需要补一套断点与折叠导航。
- Hero 视频可考虑用 `poster` + 懒加载 `preload="metadata"`，减少首屏 3.97 MB 视频带来的带宽开销。

**最终账本**：页面高度 3099px / 8 区块 y-高度链零偏差目标 / 322 项元素测量 / 144 个素材文件 25.02MB / 7 个 MPA 页面 / 49 个内页锚点 / 首页首屏差异率 0.827%（校准时序见 §6）。

---

*本文档由项目实际执行数据整理；时间、命令、数值均可按文中命令复现。*
