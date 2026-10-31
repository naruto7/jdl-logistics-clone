# 素材出处清单（ATTRIBUTION）

> **非官方声明**：本项目是对京东物流官方网站（<https://www.jdl.com/>）的前端学习复刻，与京东物流（京东集团）无任何隶属关系。
> 页面文案、图片、Logo、品牌字体、视频等素材的版权归京东物流所有，仅用于学习与技术演示，**不作任何商业用途**；如权利人认为不妥，可联系删除。

## 1. 覆盖范围与核对方法

| 项 | 值 |
|---|---|
| 枚举范围 | `src/assets/`（不含 `manifest.json` 登记文件） |
| 素材文件数 | **144** 个（首页 91 + 内页 53） |
| 素材总大小 | **25.02 MB**（26,231,012 字节） |
| 登记来源 | `src/assets/manifest.json`（首页 78 条）+ `src/assets/inner/manifest.json`（内页 53 条）+ `spec/asset-plan.json`（计划 74 条） |
| 出处分类 | A 官网原图（登记）131 个；B 官网原图（未登记，recon 字节校验）9 个；C 截图派生 4 个 |
| URL 复核 | 登记 URL 去重 128 条，HEAD 复核通过 **128 条**（全部 HTTP 200） |

核对动作（可复现）：

1. 用 Node 枚举 `src/assets/**` 全部文件，记录路径、字节数、图片宽高（PNG/JPEG/WebP 头解析）、SHA-256。
2. 与两份 manifest 的 `target` 交叉核对：登记即 **A 官网原图**，出处取 manifest 的 `url`；并对每条 URL 做 HTTP HEAD 复核可达性。
3. 未登记文件与 `recon/assets/index.json`（侦察阶段从官网同 URL 直下的 92 个基准素材）做 SHA-256 比对：字节一致即 **B 官网原图·未登记**，出处取 recon 记录的原始 URL。
4. 仍无法匹配的图形（官网用图标字体绘制/懒加载小图/多图拼条，无法单独下载）走 **C 截图派生**：用 pngjs 在参照截图里做逐像素模板匹配，定位到唯一的 `(x,y,w,h)` 裁剪矩形后记录来源截图路径。

> 注：`qa/`（参照截图/差异图）与 `recon/`（侦察素材包）都是本地校准目录，已在 `.gitignore` 中排除、不随源码发布；表中的截图路径用于说明派生素材的生成方式与可复现坐标。

## 2. 分类图例

- **A 官网原图**：从 manifest 登记的官网原始 URL 直接下载，字节与线上一致（HEAD 复核 200）。
- **B 官网原图·未登记**：未写入 manifest，但 SHA-256 与 recon 基准包中「官网同 URL 下载」的文件完全相同，判定为官网原图，并在表中给出 recon 记录的原 URL。
- **C 截图派生**：官网无法单独下载的图形，从参照截图按像素矩形裁剪；表中给出「来源截图路径 + (x,y,w,h)」。派生图仅复刻显示效果，不是官网原始素材。

## 3. 目录汇总

| 目录 | 文件数 | 大小 | A 官网原图 | B 未登记原图 | C 截图派生 |
|---|---|---|---|---|---|
| `banner/` | 6 | 5455.0 KB | 6 | 0 | 0 |
| `brand/` | 1 | 2.3 KB | 1 | 0 | 0 |
| `contact/` | 9 | 130.4 KB | 6 | 0 | 3 |
| `float/` | 3 | 9.7 KB | 3 | 0 | 0 |
| `fonts/` | 5 | 5117.9 KB | 5 | 0 | 0 |
| `footer/` | 6 | 32.0 KB | 5 | 0 | 1 |
| `industry/` | 16 | 1451.4 KB | 7 | 9 | 0 |
| `nav/` | 1 | 3.5 KB | 1 | 0 | 0 |
| `network/` | 6 | 426.8 KB | 6 | 0 | 0 |
| `news/` | 11 | 3976.2 KB | 11 | 0 | 0 |
| `search/` | 5 | 339.1 KB | 5 | 0 | 0 |
| `service/` | 13 | 225.2 KB | 13 | 0 | 0 |
| `ui/` | 9 | 20.1 KB | 9 | 0 | 0 |
| `inner/about/` | 11 | 2342.7 KB | 11 | 0 | 0 |
| `inner/esg/` | 2 | 1246.3 KB | 2 | 0 | 0 |
| `inner/news/` | 6 | 1034.8 KB | 6 | 0 | 0 |
| `inner/services/` | 23 | 2290.7 KB | 23 | 0 | 0 |
| `inner/solutions/` | 11 | 1512.0 KB | 11 | 0 | 0 |
| **合计** | **144** | **25.02 MB** | **131** | **9** | **4** |

## 4. 逐文件清单

> 「URL 复核」仅对 A 类登记 URL 做 HEAD 实测；B 类的原 URL 在 recon 阶段已成功下载，不再重复请求。

### `src/assets/banner/`（6 个，5455.0 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `banner-01.jpg` | 1920×620 | 138.8 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1791613642202.jpg | 首屏轮播图 1 | ✓ 200 |
| `banner-02.jpeg` | 1920×620 | 134.2 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1789093630895.jpeg | 首屏轮播图 2 | ✓ 200 |
| `banner-03.jpeg` | 3840×1240 | 458.1 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1789720893747.jpeg | 首屏轮播图 3 | ✓ 200 |
| `banner-04.jpg` | 1920×620 | 503.4 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1767858541029.jpg | 首屏轮播图 4 | ✓ 200 |
| `banner-05.jpeg` | 1920×620 | 253.7 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1789093547877.jpeg | 首屏轮播图 5 | ✓ 200 |
| `hero-video.mp4` | 视频 | 3966.8 KB | 官网原图 | https://scsw-cdn.jdl.com/jd-ex/static_video_logistic_homeBanner.mp4 | 首屏动画视频（红色立方体） | ✓ 200 |

### `src/assets/brand/`（1 个，2.3 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `logo.png` | 347×58 | 2.3 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/home/logo-s.png | 顶部 logo（JDL 京东物流） | ✓ 200 |

### `src/assets/contact/`（9 个，130.4 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `footer-weixin.png` | 396×396 | 17.5 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/home/footer-weixing-260427.png | 页脚企业微信 | ✓ 200 |
| `icon-miniprogram.png` | 26×26 | 0.9 KB | 截图派生 | qa/ref-footer-S01.png (448,530,26,26) | 联系我们条圆形社交图标（26×26）；pngjs 逐像素模板匹配一致 | — |
| `icon-qiwei.png` | 26×26 | 0.4 KB | 截图派生 | qa/ref-footer-S01.png (490,530,26,26)（该处图标当时未加载） | 联系我们条圆形社交图标（26×26）；裁剪时第三枚图标尚未加载，图上是灰框破图占位；留存截图中找不到像素一致来源，待用官方 icon-wechat-work-white.png 重新合成 | — |
| `icon-wechat.png` | 26×26 | 0.9 KB | 截图派生 | qa/ref-footer-S01.png (406,530,26,26) | 联系我们条圆形社交图标（26×26）；pngjs 逐像素模板匹配一致；同像素也出现在 qa/state-full.png(415,2729)（本站渲染） | — |
| `qiwei-float.png` | 396×396 | 10.2 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/images/feedback/qiwei-float-260728.png | 悬浮企业微信二维码 | ✓ 200 |
| `qrcode-jdl-express-mini.jpeg` | 284×284 | 33.0 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/code/jdl-express-mini.jpeg | 二维码：京东快递小程序 | ✓ 200 |
| `qrcode-jdl-express.jpeg` | 284×284 | 31.4 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/code/jdl-express-code.jpeg | 二维码：京东快递 | ✓ 200 |
| `qrcode-jdl.jpeg` | 284×284 | 35.4 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/code/jdl-code.jpeg | 二维码：京东物流 | ✓ 200 |
| `tel.png` | 64×64 | 0.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/code/tel.png | 联系电话图标 | ✓ 200 |

### `src/assets/float/`（3 个，9.7 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `icon-chat.png` | 108×108 | 1.0 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/sidebar/icon-chat.png | 悬浮按钮：客服 | ✓ 200 |
| `icon-contact.png` | 108×108 | 1.5 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/sidebar/icon-contact.png | 悬浮按钮：联系我们 | ✓ 200 |
| `icon-qiwei.webp` | 162×162 | 7.2 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/sidebar/enterprise-WeChat-action.webp | 悬浮按钮：企业微信 | ✓ 200 |

### `src/assets/fonts/`（5 个，5117.9 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `FZLTDHK-400-0.woff2` | 字体 | 1020.6 KB | 官网原图 | https://jdl-carbon.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/fonts/FZLTDHK.woff2 | 品牌字体 FZLTDHK 400 | ✓ 200 |
| `FZLTDHK-400-1.woff` | 字体 | 1316.4 KB | 官网原图 | https://jdl-carbon.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/fonts/FZLTDHK.woff | 品牌字体 FZLTDHK 400 | ✓ 200 |
| `JDLangZhengTi-400-0.ttf` | 字体 | 2591.3 KB | 官网原图 | https://jdl-carbon.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/fonts/JDLangzhengTi-Regular.TTF | 品牌字体 JDLangZhengTi 400 | ✓ 200 |
| `JDZHT-400-0.ttf` | 字体 | 26.2 KB | 官网原图 | https://jdl-carbon.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/fonts/JDZH_Regular.ttf | 品牌字体 JDZHT 400 | ✓ 200 |
| `Roboto-400-0.ttf` | 字体 | 163.4 KB | 官网原图 | https://jdl-carbon.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/fonts/Roboto-Bold.ttf | 品牌字体 Roboto 400 | ✓ 200 |

### `src/assets/footer/`（6 个，32.0 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `badges.png` | 954×53 | 9.9 KB | 截图派生 | qa/ref-footer-S01.png (243,811,954,53) | 页脚资质徽标条（954×53，5 枚徽标合成）；pngjs 逐像素模板匹配一致 | — |
| `footer-0.png` | 130×50 | 4.1 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/home/ba-wangan.png | 页脚图片：0 | ✓ 200 |
| `footer-1.png` | 153×52 | 4.6 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/home/ba-kexin.png | 页脚图片：1 | ✓ 200 |
| `footer-2.png` | 47×52 | 5.0 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/home/ba-police.png | 页脚图片：2 | ✓ 200 |
| `footer-3.png` | 45×52 | 5.3 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/home/ba-anwang.png | 页脚图片：3 | ✓ 200 |
| `footer-4.png` | 51×52 | 3.1 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/home/ba-guoan.png | 页脚图片：4 | ✓ 200 |

### `src/assets/industry/`（16 个，1451.4 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `bg-car.jpeg` | 3840×1400 | 149.1 KB | 官网原图·未登记 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/car.jpeg | 行业解决方案背景：汽车 | recon 同 URL 字节一致 |
| `bg-consumer.jpeg` | 3840×1400 | 116.6 KB | 官网原图·未登记 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/consumer.jpeg | 行业解决方案背景：快消（与 industry/consumer.jpeg 同图） | recon 同 URL 字节一致 |
| `bg-digital.jpeg` | 3840×1400 | 125.4 KB | 官网原图·未登记 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/digital.jpeg | 行业解决方案背景：3C | recon 同 URL 字节一致 |
| `bg-dress.jpeg` | 3840×1400 | 111.5 KB | 官网原图·未登记 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/dress.jpeg | 行业解决方案背景：服装 | recon 同 URL 字节一致 |
| `bg-fresh.jpeg` | 3840×1400 | 182.5 KB | 官网原图·未登记 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/fresh.jpeg | 行业解决方案背景：生鲜 | recon 同 URL 字节一致 |
| `bg-homeAppliances.jpeg` | 3840×1400 | 179.7 KB | 官网原图·未登记 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/homeAppliances.jpeg | 行业解决方案背景：家电 | recon 同 URL 字节一致 |
| `bg-network-2.png` | 2392×1176 | 379.6 KB | 官网原图·未登记 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/network/network-bg2.png | 物流网络区背景 2（network/network-bg2.png 副本） | recon 同 URL 字节一致 |
| `bg-network.png` | 3831×1396 | 43.9 KB | 官网原图·未登记 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/network/network-bg.jpg | 物流网络区背景 1（network/network-bg.jpg 副本） | recon 同 URL 字节一致 |
| `bg-second-top.png` | 266×282 | 1.1 KB | 官网原图·未登记 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/second-top-bg.png | 快捷查询面板纹理（search/second-top-bg.png 副本） | recon 同 URL 字节一致 |
| `consumer.jpeg` | 3840×1400 | 116.6 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/consumer.jpeg | 行业解决方案背景大图（快消） | ✓ 200 |
| `icon-car.png` | 200×200 | 8.3 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/icon-car.png | 行业方案 icon：汽车 | ✓ 200 |
| `icon-consumer.png` | 200×200 | 8.1 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/icon-consumer.png | 行业方案 icon：快消 | ✓ 200 |
| `icon-digital.png` | 200×200 | 5.6 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/icon-digital.png | 行业方案 icon：3C | ✓ 200 |
| `icon-dress.png` | 200×200 | 8.6 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/icon-dress.png | 行业方案 icon：服饰 | ✓ 200 |
| `icon-fresh.png` | 200×200 | 5.9 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/icon-fresh.png | 行业方案 icon：生鲜 | ✓ 200 |
| `icon-homeAppliances.png` | 200×200 | 8.8 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/solution/icon-homeAppliances.png | 行业方案 icon：家电 | ✓ 200 |

### `src/assets/nav/`（1 个，3.5 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `nav-bg-1.png` | 684×720 | 3.5 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/nav/nav-bg-1.png | 导航下拉背景纹理 | ✓ 200 |

### `src/assets/network/`（6 个，426.8 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `icon-chain.png` | 74×72 | 0.9 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/network/icon-chain.png | 网络特性 icon：全链共生 | ✓ 200 |
| `icon-earth.png` | 72×72 | 1.0 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/network/icon-earth.png | 网络特性 icon：全网覆盖 | ✓ 200 |
| `icon-menu.png` | 74×72 | 0.4 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/network/icon-menu.png | 网络特性 icon：数实融合 | ✓ 200 |
| `icon-time.png` | 74×72 | 1.0 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/network/icon-time.png | 网络特性 icon：7X24 小时服务 | ✓ 200 |
| `network-bg.jpg` | 3831×1396 | 43.9 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/network/network-bg.jpg | 物流网络背景 1 | ✓ 200 |
| `network-bg2.png` | 2392×1176 | 379.6 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/network/network-bg2.png | 物流网络背景 2（点阵地球） | ✓ 200 |

### `src/assets/news/`（11 个，3976.2 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `cover-01.jpg` | 1080×1347 | 126.4 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1778584332412.jpg | 新闻封面：一图看懂！京东物流Q1收入同比增长29% 创上市以来一季度最 | ✓ 200 |
| `cover-02.jpg` | 625×833 | 278.4 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1777116909686.jpg | 新闻封面：一图读懂京东物流2025年ESG报告 | ✓ 200 |
| `cover-03.jpg` | 1080×825 | 625.4 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1777084969983.jpg | 新闻封面：全球最高标准京东物流斩获国际软件研发诺贝尔奖 | ✓ 200 |
| `cover-04.png` | 525×720 | 337.3 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1777116993194.png | 新闻封面：服务获权威认可！京东物流旗下JD Express Inves | ✓ 200 |
| `cover-extra-10.jpg` | 1080×1347 | 126.4 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1778584335831.jpg | 新闻封面候选：image-1778584335831.jpg | ✓ 200 |
| `cover-extra-11.jpg` | 625×833 | 278.4 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1777116913995.jpg | 新闻封面候选：image-1777116913995.jpg | ✓ 200 |
| `cover-extra-12.jpg` | 1080×825 | 625.4 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1777084975819.jpg | 新闻封面候选：image-1777084975819.jpg | ✓ 200 |
| `cover-extra-13.png` | 525×720 | 337.3 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1777117001065.png | 新闻封面候选：image-1777117001065.png | ✓ 200 |
| `cover-extra-7.jpg` | 625×833 | 278.4 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1777116909686.jpg | 新闻封面候选：image-1777116909686.jpg | ✓ 200 |
| `cover-extra-8.jpg` | 1080×825 | 625.4 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1777084969983.jpg | 新闻封面候选：image-1777084969983.jpg | ✓ 200 |
| `cover-extra-9.png` | 525×720 | 337.3 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1777116993194.png | 新闻封面候选：image-1777116993194.png | ✓ 200 |

### `src/assets/search/`（5 个，339.1 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `icon-aging.png` | 3696×176 | 90.8 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/aging-page.png | 快捷入口图标：运费&时效查询 | ✓ 200 |
| `icon-network.png` | 3696×176 | 85.9 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/netwwork.png | 快捷入口图标：网点查询 | ✓ 200 |
| `icon-range.png` | 3696×176 | 84.5 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/serve-range.png | 快捷入口图标：服务范围 | ✓ 200 |
| `icon-send.png` | 3696×176 | 76.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/send.png | 快捷入口图标：我要寄件 | ✓ 200 |
| `second-top-bg.png` | 266×282 | 1.1 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/second-top-bg.png | 快捷查询面板背景 | ✓ 200 |

### `src/assets/service/`（13 个，225.2 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `express-truck.png` | 1562×1002 | 146.8 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v4/home/service/express.png | 快递快运服务卡车大图 | ✓ 200 |
| `icon-group.png` | 52×52 | 1.0 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/service/icon-group.png | 场景服务选中角标 | ✓ 200 |
| `lines-bulky.png` | 216×216 | 7.9 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/lines/bulky.png | 场景服务：大件 | ✓ 200 |
| `lines-capacity.png` | 216×216 | 7.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/lines/capacity.png | 场景服务：运力 | ✓ 200 |
| `lines-coldChain.png` | 216×216 | 6.8 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/lines/coldChain.png | 场景服务：冷链 | ✓ 200 |
| `lines-express.png` | 216×216 | 7.9 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/lines/express.png | 场景服务：快递快运（选中大图） | ✓ 200 |
| `lines-inter.png` | 216×216 | 8.5 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/lines/inter.png | 场景服务：国际物流 | ✓ 200 |
| `lines-medicine.png` | 216×216 | 7.3 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/lines/medicine.png | 场景服务：医药 | ✓ 200 |
| `lines-servicePlus.png` | 216×216 | 7.3 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/lines/service%2B.png | 场景服务：京东服务 | ✓ 200 |
| `lines-supplyChain.png` | 216×216 | 4.8 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/lines/supplyChain.png | 场景服务：仓配一体 | ✓ 200 |
| `lines-technology.png` | 216×216 | 6.5 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/lines/technology.png | 场景服务：物流科技 | ✓ 200 |
| `lines-warehouse.png` | 216×216 | 7.4 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/lines/warehouse.png | 场景服务：送仓 | ✓ 200 |
| `service-active.png` | 440×180 | 5.2 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/service/service-active.png | 场景服务选中态胶囊背景 | ✓ 200 |

### `src/assets/ui/`（9 个，20.1 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `icon-arrow-bottom.png` | 32×32 | 0.3 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/menu/icon-arrow-bottom.png | 导航下拉箭头 | ✓ 200 |
| `icon-chain.svg` | — | 2.4 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/menu/icon-chain.svg | 菜单图标：增值服务 | ✓ 200 |
| `icon-express.svg` | — | 2.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/menu/icon-express.svg | 菜单图标：物流服务 | ✓ 200 |
| `icon-inter.svg` | — | 4.0 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/menu/icon-inter.svg | 菜单图标：寄国际 | ✓ 200 |
| `icon-menu.png` | 48×48 | 0.3 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/menu/icon-menu.png | 导航图标：菜单 | ✓ 200 |
| `icon-search.png` | 48×50 | 1.2 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/home/icon-search.png | 运单查询输入框搜索图标 | ✓ 200 |
| `icon-service.svg` | — | 4.1 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/menu/icon-service.svg | 菜单图标：京东服务 | ✓ 200 |
| `icon-transport.svg` | — | 4.5 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/menu/icon-transport.svg | 菜单图标：发重货 | ✓ 200 |
| `icon-user.png` | 48×48 | 0.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/menu/icon-user.png | 导航图标：用户/登录 | ✓ 200 |

### `src/assets/inner/about/`（11 个，2342.7 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `contact-banner.jpg` | 3840×880 | 208.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/about/img-banner-contact.jpg | 联系我们区块背景 | ✓ 200 |
| `course-02.jpg` | 938×528 | 64.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/about/img-course-02.jpg | 企业荣誉配图 | ✓ 200 |
| `course-03.jpg` | 938×528 | 167.9 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/about/img-course-03.jpg | 企业荣誉配图 | ✓ 200 |
| `course-06.jpg` | 938×528 | 26.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/about/img-course-06.jpg | 企业荣誉配图 | ✓ 200 |
| `develop-02.jpg` | 1424×640 | 156.6 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/about/img-develop-02.jpg | 公司历程配图 2 | ✓ 200 |
| `develop-03.jpg` | 1424×640 | 128.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/about/img-develop-03.jpg | 公司历程配图 3 | ✓ 200 |
| `develop-04.jpg` | 1424×640 | 41.3 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/about/img-develop-04.jpg | 公司历程配图 4 | ✓ 200 |
| `hero.png` | 3840×920 | 1150.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/about/img-banner-aboutus.png | 关于京东物流页头图 | ✓ 200 |
| `news-banner.jpg` | 3840×920 | 146.2 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/about/img-banner-news.jpg | 新闻中心区块背景 | ✓ 200 |
| `video-thumb-a.jpg` | 720×405 | 220.7 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1744191571591.jpg | 视频中心封面 A | ✓ 200 |
| `video-thumb-b.jpg` | 720×405 | 30.4 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1730855732312.jpg | 视频中心封面 B | ✓ 200 |

### `src/assets/inner/esg/`（2 个，1246.3 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `green-banner.png` | 3840×920 | 954.6 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/images/green/banner-green-01.png | 青流计划区块背景 | ✓ 200 |
| `hero.jpg` | 3840×800 | 291.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/esg/img-banner-top-v2-pc.jpeg | 可持续发展页头图 | ✓ 200 |

### `src/assets/inner/news/`（6 个，1034.8 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `cover-a.jpg` | 1080×600 | 341.1 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1792123815908.jpeg | 新闻中心封面 A | ✓ 200 |
| `cover-b.jpg` | 1080×720 | 77.0 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1789121684910.jpeg | 新闻中心封面 B | ✓ 200 |
| `cover-c.jpg` | 1080×722 | 92.4 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1787540523757.jpg | 新闻中心封面 C | ✓ 200 |
| `green-a.jpg` | 720×449 | 143.1 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1750988435859.jpg | 环保资讯封面 A | ✓ 200 |
| `green-b.png` | 720×476 | 312.6 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1749173852891.png | 环保资讯封面 B | ✓ 200 |
| `green-c.jpg` | 720×480 | 68.6 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1747969515154.jpg | 环保资讯封面 C | ✓ 200 |

### `src/assets/inner/services/`（23 个，2290.7 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `bulky.jpg` | 1200×720 | 97.1 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/bulky/bulky.jpeg | 大件服务卡片图 | ✓ 200 |
| `cleaning.jpg` | 1200×720 | 55.5 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/serviceplus/cleaning.jpeg | 京东服务+ 清洗服务卡片图 | ✓ 200 |
| `cold-chain.jpg` | 1200×720 | 209.3 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/coldChain/coldChain-m.jpeg | 冷链服务卡片图 | ✓ 200 |
| `cross-border.jpg` | 1200×720 | 71.2 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/crossBorder/guoji-m.jpeg | 国际物流卡片图 | ✓ 200 |
| `dedicated-line.jpg` | 1200×720 | 97.9 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/capacity/zhuanxianbaocang.jpeg | 专线包仓卡片图 | ✓ 200 |
| `digitized-supply-chain.jpg` | 1200×720 | 102.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/technology/shuzhihua.jpeg | 数智化供应链卡片图 | ✓ 200 |
| `education.jpg` | 1200×720 | 96.2 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/technology/jiaoyu.jpeg | 教育产业学院卡片图 | ✓ 200 |
| `express.jpg` | 1204×722 | 101.2 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/express/express-m.jpg | 快递服务卡片图 | ✓ 200 |
| `freight.jpg` | 1200×720 | 62.3 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v4/product/freight/freight-m.jpg | 快运服务卡片图 | ✓ 200 |
| `fresh-fastest.jpg` | 1200×720 | 63.1 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v4/product/express/freshFastest_VI.jpg | 生鲜特快卡片图 | ✓ 200 |
| `full-cargo.jpg` | 1200×720 | 91.4 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/capacity/quanjibaocang.jpeg | 全货机包机卡片图 | ✓ 200 |
| `heavy-cargo.jpg` | 1200×720 | 90.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/freight/tekuai-zhonghuo.jpeg | 重货标快卡片图 | ✓ 200 |
| `hero-express.jpg` | 3840×800 | 132.0 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v4/product/express/express-pc.jpg | 服务与产品页头图（快递服务主视觉） | ✓ 200 |
| `install.jpg` | 1200×720 | 55.8 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/serviceplus/install.jpeg | 安装服务卡片图 | ✓ 200 |
| `intelligent-park.jpg` | 1200×720 | 181.9 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/technology/zhineng-yuanqu.jpeg | 智能物流园区卡片图 | ✓ 200 |
| `intelligent-warehouse.jpg` | 1200×720 | 81.8 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/technology/zhinengcang.jpeg | 智能仓储卡片图 | ✓ 200 |
| `jd-fastest.jpg` | 1200×720 | 83.1 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/express/jdFastest.jpeg | 京东特快卡片图 | ✓ 200 |
| `jd-standard.jpg` | 1200×720 | 114.1 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v4/product/express/jdStandard_VI.jpg | 京东标快卡片图 | ✓ 200 |
| `medicine.jpg` | 1200×720 | 95.1 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/medicine/medicine.jpeg | 医药服务卡片图 | ✓ 200 |
| `repair.jpg` | 1200×720 | 65.2 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/serviceplus/repair.jpeg | 维修服务卡片图 | ✓ 200 |
| `service-plus-hero.jpg` | 3840×800 | 146.8 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/serviceplus/serviceplus-pc.jpeg | 京东服务+ 找服务卡片图 | ✓ 200 |
| `supply-chain.jpg` | 1200×720 | 104.3 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/product/supplyChain/supply-chain-m.jpeg | 仓配一体卡片图 | ✓ 200 |
| `warehouse.jpg` | 1200×720 | 92.2 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v4/product/warehouse/warehouse-m.jpg | 送仓服务卡片图 | ✓ 200 |

### `src/assets/inner/solutions/`（11 个，1512.0 KB）

| 文件 | 尺寸 | 大小 | 类型 | 原始 URL / 派生来源 | 用途 / 说明 | 复核 |
|---|---|---|---|---|---|---|
| `3c.png` | 1772×888 | 38.4 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/images/solution/img-3c-01.png | 3C 行业方案配图 | ✓ 200 |
| `appliances.png` | 1772×888 | 50.6 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/images/solution/img-jiadian-01.png | 家电行业方案配图 | ✓ 200 |
| `big-fashion.jpg` | 1772×480 | 87.4 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/solution/img-bfs-01.jpg | 大时尚行业案例配图 | ✓ 200 |
| `car.png` | 1772×888 | 47.5 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/images/solution/img-car-01.png | 汽车行业方案配图 | ✓ 200 |
| `consumer-goods.png` | 1772×888 | 23.4 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/images/solution/img-xfp-01.png | 消费品行业方案配图 | ✓ 200 |
| `dress.png` | 1772×888 | 49.1 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/images/solution/img-fz-01.png | 服饰行业方案配图 | ✓ 200 |
| `fresh.png` | 1772×888 | 35.1 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/solution/img-sx-01.png | 生鲜行业方案配图 | ✓ 200 |
| `furnishings.png` | 1772×888 | 27.7 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/images/solution/img-djj-01.png | 大家居行业方案配图 | ✓ 200 |
| `furniture-appliance.jpg` | 1772×777 | 238.6 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/solution/img-jdjj-01.jpg | 家电家居行业案例配图 | ✓ 200 |
| `hero-consumer.jpg` | 3840×920 | 695.0 KB | 官网原图 | https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/image-1725607001020.jpg | 解决方案页头图（消费品行业主视觉） | ✓ 200 |
| `industrial.jpg` | 1772×888 | 219.3 KB | 官网原图 | https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/images/solution/img-gyp-01.jpg | 工业品行业案例配图 | ✓ 200 |

### 登记文件（非素材，供核对）

- `src/assets/manifest.json`：首页素材登记（78 条，字段 `url/target/note/status/bytes`）。
- `src/assets/inner/manifest.json`：内页素材登记（53 条，`target` 相对 `src/assets/inner/`）。
- `spec/asset-plan.json`：素材计划（74 条，`url/target/note`），由 `tools/spec/plan-assets.mjs` 从侦察数据生成。

## 5. 重复文件与已知问题

### 5.1 内容重复（SHA-256 相同）

| 文件 | 内容相同的文件 | 说明 |
|---|---|---|
| `industry/bg-consumer.jpeg`<br>`industry/consumer.jpeg` | 同组 | 同图复制到不同目录，避免跨目录引用 |
| `industry/bg-network-2.png`<br>`network/network-bg2.png` | 同组 | 同图复制到不同目录，避免跨目录引用 |
| `industry/bg-network.png`<br>`network/network-bg.jpg` | 同组 | 同图复制到不同目录，避免跨目录引用 |
| `industry/bg-second-top.png`<br>`search/second-top-bg.png` | 同组 | 同图复制到不同目录，避免跨目录引用 |
| `news/cover-01.jpg`<br>`news/cover-extra-10.jpg` | 同组 | 官网不同 URL 内容相同（CDN/CMS 镜像） |
| `news/cover-02.jpg`<br>`news/cover-extra-11.jpg`<br>`news/cover-extra-7.jpg` | 同组 | 官网不同 URL 内容相同（CDN/CMS 镜像） |
| `news/cover-03.jpg`<br>`news/cover-extra-12.jpg`<br>`news/cover-extra-8.jpg` | 同组 | 官网不同 URL 内容相同（CDN/CMS 镜像） |
| `news/cover-04.png`<br>`news/cover-extra-13.png`<br>`news/cover-extra-9.png` | 同组 | 官网不同 URL 内容相同（CDN/CMS 镜像） |

### 5.2 已知问题与建议

- **`src/assets/contact/icon-qiwei.png`（企业微信图标，26×26）**：C 类派生图，裁剪时官网第三枚社交图标未加载，图上为灰框破图占位；在留存的参照截图（`qa/ref-footer-S01.png`）中找不到像素一致来源。**建议**：用官网原图 `https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/static/v3/code/icon-wechat-work-white.png`（40×40 白色图标）叠加 `rgba(255,255,255,0.1)` 圆形底重新合成，替换后需重跑像素比对。
- **`src/assets/footer/badges.png`（954×53）**：不是官网单文件，而是页脚 5 枚资质徽标（`footer/footer-0.png` ~ `footer/footer-4.png`）在截图中的合成条，来源 `qa/ref-footer-S01.png (243,811,954,53)`。保留单文件是为了与官网「一条徽标带」的渲染逐像素一致；徽标本身各自为 A 类官方原图。
- **`src/assets/news/cover-extra-*.jpg|png`**：与 `news/cover-01~04` 内容逐字节相同（同一 CMS 图片被官网以不同 ID 暴露，HEAD 均 200），保留冗余副本用于新闻区扩展，可按需删除。
- **`src/assets/industry/bg-*.jpeg`、`bg-network*.png`、`bg-second-top.png`**：官网原图直下（B 类），与 `network/`、`search/` 下登记文件内容重复，是行业区按目录取用的副本。
- **字体文件**（`fonts/FZLTDHK-*`、`JDZHT-*`、`JDLangZhengTi-*`、`Roboto-*`）：均为官网品牌字体，版权归京东物流/字库权利人，仅随本演示项目加载，不得单独再分发或商用。
- **`hero-video.mp4`**：官网首屏视频（3.8s、1790×560、muted/autoplay/loop），A 类原图直下；视频内容的版权归京东物流，仅演示用。

若 HEAD 复核失败的登记 URL（0 条）：无。

## 6. 版权与使用边界

1. 本项目为**非官方、非商业的学习演示**，与京东物流（京东集团）无隶属或合作关系。
2. 所有素材版权归京东物流（京东集团）及相应权利人所有；本项目仅作前端技术演示与教学用途。
3. 素材不随项目授权再分发；如权利人要求，可删除 `src/assets/` 下相应文件并替换为占位图。
4. 页面中的运单查询等交互均为前端演示数据，不会请求官方接口；品牌名称、Logo 仅用于说明复刻对象。

---

清单生成：2026-10-30，对 `src/assets` 实际文件枚举（144 个）+ SHA-256 + pngjs 模板匹配 + HTTP HEAD 复核；如需更新，重新执行本清单的核对脚本即可。
