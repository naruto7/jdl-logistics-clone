#!/usr/bin/env node
/**
 * 从侦察数据中抽取「需要下载的资源清单」：字体、logo、图标、背景图、二维码、新闻封面等，
 * 输出 spec/asset-plan.json（原始 URL → 本地目标路径 → 用途说明）。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const readJson = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'));
const measure = readJson('recon/logs/raw-measure.json');
const content = readJson('recon/logs/raw-content.json');
const footerRaw = readJson('recon/logs/raw-footer.json');
const assetsRaw = readJson('recon/logs/raw-assets.json');
const html = readFileSync(resolve(ROOT, 'recon/dom/home.html'), 'utf8');

const plan = [];
const add = (url, target, note) => {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return;
  if (plan.some((p) => p.url === url)) return;
  plan.push({ url, target, note });
};

// 1) 字体（官网自有的品牌字体，复刻需要它才能对齐字重/字形）
console.log('=== FONT FACES ===');
for (const face of measure.fontFaces ?? []) {
  const family = /font-family:\s*([^;]+);/.exec(face)?.[1]?.trim();
  const urls = [...String(face).matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((m) => m[1]);
  const weight = /font-weight:\s*([^;]+);/.exec(face)?.[1]?.trim() ?? '400';
  console.log(`font ${family} weight=${weight} urls=${urls.length}`);
  urls.forEach((url, index) => {
    const ext = (url.match(/\.(woff2|woff|ttf|otf)(\?|$)/i)?.[1] ?? 'woff2').toLowerCase();
    const safe = String(family).replace(/["'\s]/g, '');
    add(url, `fonts/${safe}-${weight}-${index}.${ext}`, `品牌字体 ${family} ${weight}`);
  });
}

// 2) 常规图片与背景（按资源探针顺序挑出首页实际用到的）
const IMG_PLAN = {
  0: ['brand/logo.png', '顶部 logo（JDL 京东物流）'],
  1: ['ui/icon-menu.png', '导航图标：菜单'],
  2: ['ui/icon-user.png', '导航图标：用户/登录'],
  3: ['ui/icon-arrow-bottom.png', '导航下拉箭头'],
  4: ['ui/icon-express.svg', '菜单图标：物流服务'],
  5: ['ui/icon-chain.svg', '菜单图标：增值服务'],
  6: ['ui/icon-service.svg', '菜单图标：京东服务'],
  7: ['ui/icon-transport.svg', '菜单图标：发重货'],
  8: ['ui/icon-inter.svg', '菜单图标：寄国际'],
  9: ['banner/banner-01.jpg', '首屏轮播图 1'],
  10: ['banner/banner-02.jpeg', '首屏轮播图 2'],
  11: ['banner/banner-03.jpeg', '首屏轮播图 3'],
  12: ['banner/banner-04.jpg', '首屏轮播图 4'],
  13: ['banner/banner-05.jpeg', '首屏轮播图 5'],
  14: ['ui/icon-search.png', '运单查询输入框搜索图标'],
  15: ['service/lines-express.png', '场景服务：快递快运（选中大图）'],
  16: ['service/lines-supplyChain.png', '场景服务：仓配一体'],
  17: ['service/lines-bulky.png', '场景服务：大件'],
  18: ['service/lines-warehouse.png', '场景服务：送仓'],
  19: ['service/lines-coldChain.png', '场景服务：冷链'],
  20: ['service/lines-medicine.png', '场景服务：医药'],
  21: ['service/lines-servicePlus.png', '场景服务：京东服务'],
  22: ['service/lines-capacity.png', '场景服务：运力'],
  23: ['service/lines-inter.png', '场景服务：国际物流'],
  24: ['service/lines-technology.png', '场景服务：物流科技'],
  25: ['service/express-truck.png', '快递快运服务卡车大图'],
  26: ['industry/icon-consumer.png', '行业方案 icon：快消'],
  27: ['industry/icon-dress.png', '行业方案 icon：服饰'],
  28: ['industry/icon-homeAppliances.png', '行业方案 icon：家电'],
  29: ['industry/icon-digital.png', '行业方案 icon：3C'],
  30: ['industry/icon-car.png', '行业方案 icon：汽车'],
  31: ['industry/icon-fresh.png', '行业方案 icon：生鲜'],
  32: ['network/icon-earth.png', '网络特性 icon：全网覆盖'],
  33: ['network/icon-menu.png', '网络特性 icon：数实融合'],
  34: ['network/icon-chain.png', '网络特性 icon：全链共生'],
  35: ['network/icon-time.png', '网络特性 icon：7X24 小时服务'],
  36: ['news/cover-01.jpg', '新闻封面 1（Q1 业绩）'],
  37: ['contact/tel.png', '联系电话图标'],
  38: ['contact/qrcode-jdl-express.jpeg', '二维码：京东快递'],
  39: ['contact/qrcode-jdl.jpeg', '二维码：京东物流'],
  40: ['contact/qrcode-jdl-express-mini.jpeg', '二维码：京东快递小程序'],
  41: ['contact/footer-weixin.png', '页脚企业微信'],
  42: ['contact/qiwei-float.png', '悬浮企业微信二维码'],
  43: ['nav/nav-bg-1.png', '导航下拉背景纹理'],
  44: ['search/second-top-bg.png', '快捷查询面板背景'],
  45: ['search/icon-send.png', '快捷入口图标：我要寄件'],
  46: ['search/icon-aging.png', '快捷入口图标：运费&时效查询'],
  47: ['search/icon-range.png', '快捷入口图标：服务范围'],
  48: ['search/icon-network.png', '快捷入口图标：网点查询'],
  49: ['service/service-active.png', '场景服务选中态胶囊背景'],
  50: ['service/icon-group.png', '场景服务选中角标'],
  51: ['industry/consumer.jpeg', '行业解决方案背景大图（快消）'],
  52: ['network/network-bg2.png', '物流网络背景 2（点阵地球）'],
  53: ['network/network-bg.jpg', '物流网络背景 1'],
  58: ['float/icon-qiwei.webp', '悬浮按钮：企业微信'],
  59: ['float/icon-chat.png', '悬浮按钮：客服'],
  60: ['float/icon-contact.png', '悬浮按钮：联系我们'],
};

for (const [index, [target, note]] of Object.entries(IMG_PLAN)) {
  const item = assetsRaw[Number(index)];
  add(item?.src, target, note ?? '');
}

// 3) 页脚资质徽标与其它 footer 图片
for (const [index, image] of (footerRaw.imgs ?? []).entries()) {
  const name = image.alt ? `footer/badge-${String(image.alt).replace(/[^\w\u4e00-\u9fa5]/g, '').slice(0, 12)}.png` : `footer/footer-${index}.png`;
  add(image.src, name, `页脚图片：${image.alt || index}`);
}

// 4) 新闻封面：DOM 里可能以 background-image 或 data 属性延迟加载
const newsUrls = [...new Set([...html.matchAll(/(image-1[0-9]{12}\.(?:jpg|jpeg|png|webp))/g)].map((m) => m[1]))];
for (const [index, file] of newsUrls.entries()) {
  add(`https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/${file}`, `news/cover-extra-${index + 1}.${file.split('.').pop()}`, `新闻封面候选：${file}`);
}

// 5) 首屏轮播文案/图片兜底
for (const [index, slide] of (content.heroSlides ?? []).entries()) {
  for (const image of slide.imgs ?? []) {
    if (image?.src) add(image.src, `banner/slide-${index + 1}.${(image.src.split('.').pop() ?? 'jpg').split('?')[0]}`, `首屏轮播 ${index + 1}`);
  }
}

writeFileSync(resolve(ROOT, 'spec/asset-plan.json'), JSON.stringify(plan, null, 2));
console.log(`\n[asset-plan] 共 ${plan.length} 个资源`);
const byDir = plan.reduce((acc, p) => {
  const dir = p.target.split('/')[0];
  acc[dir] = (acc[dir] ?? 0) + 1;
  return acc;
}, {});
console.log('[asset-plan] 分组：', JSON.stringify(byDir));
