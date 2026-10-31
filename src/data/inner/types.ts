/**
 * 内页共享数据类型。
 *
 * 约定：
 * - 每个内容对象都带 `id`，且 id 必须与 src/data/nav.ts 里对应锚点完全一致，
 *   这是「导航零死链」的唯一事实来源（页面用 id={item.id} 落地）。
 * - 图片字段统一写资源逻辑名（不含扩展名），由 lib/assets.ts 解析成带 base 的 URL。
 */

export type AnchorLink = {
  /** 与 nav.ts 一致的锚点 id（不含 #） */
  id: string;
  /** 栏目名 */
  name: string;
  /** 一句话定位（官网原话优先） */
  desc: string;
  /** 3-4 条能力要点 */
  points?: string[];
  /** 可选指标（数值 + 说明，取自官网正文） */
  metric?: { value: string; label: string };
  /** 资源逻辑名，如 inner/services/supply-chain */
  image?: string;
  /** 小标签，如「企业服务」「个人服务」 */
  tag?: string;
  /** 关联官方原始页面路径，仅作留档 */
  originalPath?: string;
};

export type HeroStat = { value: string; label: string };

export type Crumb = { label: string; href?: string };

export type PageHeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  crumbs: Crumb[];
  /** 头图右侧真实素材（资源逻辑名，可省略） */
  image?: string;
  /** 头图色调：品牌红 / 可持续绿 / 深灰 */
  tone?: 'brand' | 'green' | 'slate';
  stats?: HeroStat[];
};

export type NavItem = { id: string; label: string };

export type FaqItem = { q: string; a: string };

export type NewsItem = {
  title: string;
  date: string;
  tag?: string;
  cover?: string;
  href?: string;
};
