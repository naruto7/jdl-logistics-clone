/**
 * 站内链接解析
 *
 * 为什么需要它：站点部署在 GitHub Pages 的子路径 `/jdl-logistics-clone/` 下，
 * 而开发环境在根路径。写死 `href="/services/"` 会在生产环境跳到域名根（404）。
 * 统一通过 link() 处理，用 Vite 注入的 BASE_URL 拼接前缀，开发/生产两套环境都正确。
 *
 * 注意：本函数是**幂等**的——已经带 base 前缀的地址会原样返回。
 * 这样即使调用链上被包了两次（常见于「数据层 link() → 组件层又 link()」），
 * 也不会产生 /jdl-logistics-clone/jdl-logistics-clone/... 的双前缀。
 */
const BASE = import.meta.env.BASE_URL; // 开发为 '/'，构建为 '/jdl-logistics-clone/'
const BASE_PREFIX = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;

export function link(path: string): string {
  if (!path) return path;
  // 外链、锚点、协议链接原样返回
  if (/^(https?:\/\/|mailto:|tel:|#|\/\/)/.test(path)) return path;

  // 幂等保护：已经带 base 前缀（或等于 base）的直接返回
  if (BASE_PREFIX && (path === BASE_PREFIX || path.startsWith(`${BASE_PREFIX}/`))) return path;

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PREFIX}${normalized}` || '/';
}

/** 带锚点的站内链接：link('/services/', 'express') → /jdl-logistics-clone/services/#express */
export function sectionLink(path: string, anchor?: string): string {
  const base = link(path);
  if (!anchor) return base;
  // 地址已含锚点时不再重复追加
  return base.includes('#') ? base : `${base}#${anchor}`;
}
