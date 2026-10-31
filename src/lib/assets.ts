/**
 * 静态资源解析层
 *
 * why：MPA + GitHub Pages 子路径部署下，图片地址不能写死 `/assets/x.png`
 * （会被解析到域名根，绕过 base）。这里用 Vite 的 import.meta.glob 把
 * src/assets 下的文件编译期登记成「逻辑名 → 带 hash 且带 base 前缀的 URL」，
 * 组件只写逻辑名，资源路径的复杂度收敛在这一层。
 */
const modules = import.meta.glob<string>('../assets/**/*.{png,jpg,jpeg,webp,svg,gif,avif,mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const registry = new Map<string, string>();
for (const [file, url] of Object.entries(modules)) {
  const key = file.replace('../assets/', '');
  registry.set(key, url);
  // 同时登记不带扩展名的写法，方便数据层引用
  registry.set(key.replace(/\.[^.]+$/, ''), url);
}

export function asset(name: string): string {
  const hit = registry.get(name.replace(/^\/+/, ''));
  if (hit) return hit;
  if (import.meta.env.DEV) {
    console.warn(`[assets] 未找到资源：${name}`);
  }
  return '';
}

/** 返回全部已登记资源（用于调试页 / 资源清单核对） */
export function assetList(): Array<{ key: string; url: string }> {
  return [...registry.entries()].map(([key, url]) => ({ key, url }));
}
