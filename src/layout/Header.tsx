import { useEffect, useState } from 'react';
import { TOP_NAV, UTILITY_NAV, type NavGroup } from '@/data/nav';
import { asset } from '@/lib/assets';
import type { PageKey } from '@/App';

/** 一级导航 → 页面 key 的映射，用于高亮当前栏目 */
const PAGE_BY_HREF: Record<string, PageKey> = {
  '/': 'home',
  '/services/': 'services',
  '/solutions/': 'solutions',
  '/support/': 'support',
  '/esg/': 'esg',
  '/about/': 'about',
};

function MegaPanel({ groups }: { groups: NavGroup[] }) {
  const columns = groups.length;
  return (
    <div
      className="absolute inset-x-0 top-full z-40 border-t border-line bg-white shadow-[0_18px_36px_rgba(0,0,0,0.08)]"
      role="menu"
    >
      <div
        className="container-page grid gap-x-10 gap-y-8 py-8"
        style={{ gridTemplateColumns: `repeat(${Math.min(columns, 5)}, minmax(0, 1fr))` }}
      >
        {groups.map((group) => (
          <div key={group.title ?? group.items[0]?.label}>
            {group.title ? (
              <p className="mb-3 flex items-center gap-1.5 text-[15px] font-semibold text-ink">
                <span className="h-3 w-1 rounded-full bg-brand" aria-hidden />
                {group.title}
              </p>
            ) : null}
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={`${group.title}-${item.label}`}>
                  <a
                    href={item.href}
                    className="text-[14px] text-ink-2 transition-colors hover:text-brand"
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Header({ current }: { current: PageKey }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const logoSrc = asset('logo/logo');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? 'shadow-[0_4px_18px_rgba(31,35,41,0.08)]' : ''
      }`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="container-page flex h-20 items-center justify-between">
        {/* logo */}
        <a href="/" className="flex shrink-0 items-center gap-3" aria-label="京东物流 首页">
          {logoSrc ? (
            <img src={logoSrc} alt="京东物流" className="h-9 w-auto" />
          ) : (
            <span className="flex items-baseline gap-2">
              <span className="text-[26px] font-black italic tracking-tight text-brand">JDL</span>
              <span className="text-[19px] font-semibold tracking-wide text-ink">京东物流</span>
            </span>
          )}
        </a>

        {/* 一级导航 */}
        <nav className="flex items-center" aria-label="主导航">
          {TOP_NAV.map((item) => {
            const key = PAGE_BY_HREF[item.href];
            const active = key === current;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.groups ? item.label : null)}
              >
                <a
                  href={item.href}
                  aria-haspopup={item.groups ? 'true' : undefined}
                  aria-expanded={item.groups ? openMenu === item.label : undefined}
                  className={`relative block px-5 py-7 text-[16px] transition-colors ${
                    active ? 'font-semibold text-brand' : 'text-ink hover:text-brand'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-5 bottom-0 h-[3px] rounded-t bg-brand transition-opacity ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden
                  />
                </a>
              </div>
            );
          })}
        </nav>

        {/* 右侧辅助导航 */}
        <div className="flex shrink-0 items-center gap-4 text-[13px] text-ink-3">
          {UTILITY_NAV.map((item, index) => (
            <span key={item.label} className="flex items-center gap-4">
              {index > 0 ? <span className="h-3 w-px bg-line" aria-hidden /> : null}
              <a href={item.href} className="transition-colors hover:text-brand">
                {item.label}
              </a>
            </span>
          ))}
        </div>
      </div>

      {/* mega menu：跟随头部，整幅横向面板 */}
      {TOP_NAV.map((item) =>
        item.groups && openMenu === item.label ? <MegaPanel key={item.label} groups={item.groups} /> : null,
      )}
    </header>
  );
}
