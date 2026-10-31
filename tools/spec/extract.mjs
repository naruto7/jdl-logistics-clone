#!/usr/bin/env node
/**
 * 侦察数据 → 工程规格书
 *
 * 读取 recon/logs/*.json（recon-scout 产出的原始探针数据），提炼成一份紧凑、
 * 去噪、带语义的规格文件 spec/home-spec.json，作为复刻实现的唯一事实源：
 *   - 布局：各区段 y/高度、版心宽度、关键元素 rect
 *   - 视觉：字体阶梯、颜色、按钮/卡片样式、背景图
 *   - 内容：首屏轮播、服务卡、行业 tab、网络数据、新闻、页脚
 *
 * 用法：node tools/spec/extract.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const read = (name) => JSON.parse(readFileSync(resolve(ROOT, 'recon/logs', name), 'utf8'));
const measure = read('raw-measure.json');
const content = read('raw-content.json');
const nav = read('raw-nav.json');
const footer = read('raw-footer.json');
const assets = read('raw-assets.json');
const interactions = read('raw-interactions.json');

const text = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
const rect = (r) => (r ? { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.w), h: Math.round(r.h) } : null);

/** 字体阶梯：按字号去重，保留代表性的排版样式 */
const typography = [];
const seenType = new Set();
for (const item of measure.typography) {
  const fs = Number(item.fsPx);
  if (!Number.isFinite(fs) || fs < 12) continue;
  const key = `${Math.round(fs)}|${item.fw}|${text(item.text).slice(0, 12)}`;
  if (seenType.has(key)) continue;
  seenType.add(key);
  typography.push({
    sample: text(item.text).slice(0, 24),
    fontSize: Math.round(fs * 100) / 100,
    fontWeight: item.fw,
    lineHeight: item.lh,
    letterSpacing: item.ls,
    color: item.colorHex,
    fontFamily: String(item.ff).split(',')[0],
  });
}

/** 导航：一级项 + 下拉面板分组/链接 */
const groupedNav = Object.values(nav).map((entry) => ({
  label: text(entry.label),
  box: rect(entry.box),
  tabs: (entry.tabs ?? []).map((tab) => text(tab.text ?? tab.label ?? '')).filter(Boolean),
  groups: (entry.groups ?? []).map((group) => ({
    title: text(group.title ?? group.label ?? ''),
    items: (group.items ?? group.links ?? []).map((item) => ({
      label: text(item.label ?? item.text ?? ''),
      href: item.href ?? item.link ?? '',
    })),
  })),
  flatLinks: (entry.flatLinks ?? []).map((item) => ({ label: text(item.label ?? item.text), href: item.href })),
}));

/** 页脚 */
const footerCols = (footer.cols ?? []).map((col) => ({
  title: text(col.title ?? ''),
  links: (col.links ?? []).map((l) => ({ label: text(l.label ?? l.text), href: l.href ?? '' })),
}));

const spec = {
  generatedAt: new Date().toISOString(),
  source: {
    url: measure.meta.url,
    viewport: { width: measure.meta.innerWidth, height: measure.meta.innerHeight, dpr: measure.meta.dpr },
    documentHeight: measure.documentHeight,
  },
  layout: {
    /** 版心：内容容器 x=229, w=982（1440 视口下） */
    container: rect(measure.container?.rect),
    header: measure.header?.rect ? rect(measure.header.rect) : null,
    utility: (measure.utility ?? []).map((u) => ({ text: text(u.text), rect: rect(u.rect), color: u.css?.colorHex })),
    navItems: (measure.nav?.items ?? []).map((item) => ({ label: text(item.text), rect: rect(item.rect), href: item.href })),
    sections: measure.sections.map((s) => ({
      key: s.key,
      rect: rect(s.rect),
      class: s.cls,
      background: s.css?.bg,
      backgroundImage: s.css?.bgImg,
      padding: s.css?.pad,
    })),
  },
  design: {
    colors: measure.colors,
    typography,
    buttons: measure.buttonStyles.map((b) => ({
      text: text(b.text),
      rect: rect(b.rect),
      background: b.bg,
      backgroundImage: b.bgImg,
      color: b.colorHex,
      borderRadius: b.br,
      boxShadow: b.shadow,
      padding: b.pad,
    })),
    cards: measure.cardStyles.map((c) => ({
      class: c.cls,
      rect: rect(c.rect),
      borderRadius: c.br,
      boxShadow: c.shadow,
      background: c.bg,
      backgroundImage: c.bgImg,
    })),
    fontFaces: measure.fontFaces,
    backgrounds: measure.backgrounds,
    mediaQueries: measure.mediaQueries,
  },
  content: {
    meta: content.meta,
    heroSlides: (content.heroSlides ?? []).map((slide) => ({
      index: slide.index,
      text: text(slide.texts?.map?.((t) => text(t))?.join(' | ') ?? slide.text ?? ''),
      images: (slide.imgs ?? []).map((i) => i.src),
    })),
    searchEntries: (content.search?.imgs ?? []).length,
    serviceDetailText: text(content.serviceDetail?.text),
    serviceCards: (content.serviceCards ?? []).map((card) => ({
      text: text(card.text),
      rect: rect(card.rect),
      images: (card.imgs ?? []).map((i) => i.src),
    })),
    industryTabs: (content.industryTabItems ?? []).map((tab) => ({
      text: text(tab.text),
      href: tab.href,
      rect: rect(tab.rect),
      images: (tab.imgs ?? []).map((i) => i.src),
    })),
    industryText: text(content.industryText),
    networkStats: text(content.network?.text),
    newsCards: (content.news?.cards ?? []).map((card) => ({
      class: card.cls,
      text: text(card.text),
      rect: rect(card.rect),
      images: (card.imgs ?? []).map((i) => i.src),
    })),
    contact: text(content.contactFooter?.text),
    footer: {
      text: text(footer.text),
      columns: footerCols,
      images: (footer.imgs ?? []).map((i) => ({ src: i.src, alt: text(i.alt), rect: rect(i.rect) })),
    },
    nav: groupedNav,
  },
  assets: assets.map((a, index) => ({
    index,
    kind: a.kind,
    src: a.src,
    alt: text(a.alt),
    natural: a.natural,
    display: rect(a.rect),
    context: text(a.parentText ?? a.path).slice(0, 80),
  })),
  interactions: {
    heroSlides: (interactions.heroSlides ?? []).map((s) => ({ index: s.index, text: text(s.text), images: (s.imgs ?? []).map((i) => i.src), class: s.cls })),
    serviceCycles: (interactions.serviceCycles ?? []).map((s) => ({ text: text(s.text), images: (s.imgs ?? []).map((i) => i.src), active: s.active })),
    industryTabs: (interactions.industryTabs ?? []).map((t) => ({ text: text(t.text), background: t.bg, activeTab: t.activeTab })),
  },
};

const target = resolve(ROOT, 'spec/home-spec.json');
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, JSON.stringify(spec, null, 2));

console.log(`[spec] 写出 ${target}`);
console.log(`[spec] 文档高度 ${spec.source.documentHeight}px；版心 ${JSON.stringify(spec.layout.container)}`);
console.log(`[spec] section: ${spec.layout.sections.map((s) => `${s.key}@${s.rect.y}+${s.rect.h}`).join(', ')}`);
console.log(`[spec] 字体阶梯 ${typography.length} 条；按钮 ${spec.design.buttons.length}；卡片 ${spec.design.cards.length}`);
console.log(`[spec] 导航一级项 ${spec.content.nav.length}；页脚列 ${spec.content.footer.columns.length}；新闻卡 ${spec.content.newsCards.length}`);
console.log(`[spec] 首屏轮播 ${spec.content.heroSlides.length}；服务轮播 ${spec.content.serviceCycles.length}；资源 ${spec.assets.length}`);
