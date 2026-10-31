import { useCallback, useEffect, useState } from 'react';
import { TOP_NAV, UTILITY_NAV, type NavColumn, type NavLink, type NavMenu, type NavTop } from '@/data/nav';
import { asset } from '@/lib/assets';
import { link } from '@/lib/links';
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

/** 下拉面板：官网在导航下方弹出整幅面板，背景为白色 + 淡红色斜纹纹理 */
function MegaPanel({ menu }: { menu: NavMenu }) {
  const [tabIndex, setTabIndex] = useState(0);
  const activeTab = menu.tabs?.[tabIndex];
  const columns = activeTab?.columns ?? menu.columns ?? [];

  return (
    <div
      className="absolute inset-x-0 top-full z-40 border-t border-[#f2f2f2] bg-white/95 shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
      style={{ backgroundImage: `url(${asset('nav/nav-bg-1.png')})`, backgroundSize: 'cover' }}
      role="menu"
    >
      <div className="relative flex min-h-[300px] px-[85px] pb-[46px] pt-[28px]">
        {/* 左侧竖向 tab：仅「服务与产品」有 */}
        {menu.tabs ? (
          <ul className="mr-[95px] w-[160px] shrink-0 space-y-[6px]">
            {menu.tabs.map((tab, index) => (
              <li key={tab.label}>
                <button
                  type="button"
                  onMouseEnter={() => setTabIndex(index)}
                  onFocus={() => setTabIndex(index)}
                  className={`h-[44px] w-full rounded-[10px] text-[17.28px] leading-[44px] transition-colors ${
                    index === tabIndex ? 'bg-[#f2f3f5] font-semibold text-brand' : 'text-ink hover:text-brand'
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {/* 内容列 */}
        <div className="flex flex-1 gap-[46px]">
          {columns.map((column) => (
            <MegaColumn key={column.title} column={column} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MegaColumn({ column }: { column: NavColumn }) {
  return (
    <div className="min-w-[150px]">
      <p className="mb-[14px] flex items-center gap-[8px] text-[17.28px] font-semibold leading-none text-ink">
        {column.icon ? <img src={asset(column.icon)} alt="" className="h-[22px] w-[22px]" /> : null}
        {column.title}
      </p>
      <ul className="space-y-[13px]">
        {column.links.map((item) => (
          <li key={`${column.title}-${item.label}`}>
            <MegaLink item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MegaLink({ item }: { item: NavLink }) {
  if (!item.children?.length) {
    return (
      <a href={link(item.href)} className="block text-[14.4px] leading-[1.2] text-[#525765] transition-colors hover:text-brand" role="menuitem">
        {item.label}
      </a>
    );
  }
  return (
    <div>
      <a href={link(item.href)} className="block text-[14.4px] leading-[1.2] text-[#525765] transition-colors hover:text-brand">
        {item.label}
      </a>
      <ul className="mt-[10px] space-y-[8px] pl-[6px]">
        {item.children.map((child) => (
          <li key={child.label}>
            <a href={link(child.href)} className="flex items-start gap-[3px] text-[13.44px] leading-[1.35] text-[#868d9f] transition-colors hover:text-brand">
              <span aria-hidden>·</span>
              {child.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Header({ current }: { current: PageKey }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoSrc = asset('brand/logo.png');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const open = useCallback((label: string) => setOpenMenu(label), []);
  const close = useCallback(() => setOpenMenu(null), []);

  return (
    <header
      className={`sticky top-0 z-50 w-full ${scrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]' : ''}`}
      onMouseLeave={close}
    >
      {/* 黑色辅助条：高 31px，右侧「集团网站 / 简体中文 / 登录」12.48px 白字 */}
      <div className="h-[31px] w-full bg-black">
        <div className="container-header flex h-full items-center justify-end gap-[38px]">
          {UTILITY_NAV.map((item, index) => (
            <a
              key={item.label}
              data-qa={`util-${index}`}
              href={link(item.href)}
              className={`flex items-center gap-[6px] text-[12.48px] leading-none text-white transition-opacity hover:opacity-80 ${
                index === UTILITY_NAV.length - 1 ? 'gap-0' : 'hidden lg:flex'
              }`}
            >
              {item.label}
              {item.withArrow ? (
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden>
                  <path d="M1 1.5L4.5 4.5L8 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              ) : null}
            </a>
          ))}
        </div>
      </div>

      {/* 白色主导航：高 69px，logo 左、导航项在 974px 宽区域内等距分布 */}
      <div className="h-[69px] w-full bg-white/90 backdrop-blur-[6px]">
        <div className="container-header flex h-full items-center">
          <a href={link('/')} className="flex h-full w-auto shrink-0 items-center lg:w-[259px]" aria-label="京东物流 首页">
            {logoSrc ? (
              <img data-qa="logo" src={logoSrc} alt="京东物流" className="h-[27px] w-[161px] object-contain" />
            ) : (
              <span className="flex items-baseline gap-2">
                <span className="text-[26px] font-black italic tracking-tight text-brand">JDL</span>
                <span className="text-[19px] font-semibold text-ink">京东物流</span>
              </span>
            )}
          </a>

          <nav className="hidden h-full flex-1 items-stretch justify-between lg:flex" aria-label="主导航">
            {TOP_NAV.map((item: NavTop, index: number) => {
              const key = PAGE_BY_HREF[item.href];
              const active = key === current;
              return (
                <a
                  key={item.label}
                  data-qa={`nav-${index}`}
                  href={link(item.href)}
                  onMouseEnter={() => (item.menu ? open(item.label) : close())}
                  onFocus={() => (item.menu ? open(item.label) : close())}
                  aria-haspopup={item.menu ? 'true' : undefined}
                  aria-expanded={item.menu ? openMenu === item.label : undefined}
                  className={`relative flex items-center text-[15.36px] leading-none transition-colors ${
                    active || openMenu === item.label ? 'text-brand' : 'text-[#1a1a1a] hover:text-brand'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 bottom-0 h-[2px] bg-brand transition-opacity ${
                      active || openMenu === item.label ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* 移动端菜单按钮：桌面端隐藏（甲方验收口径为 PC 优先，移动端只需可用不崩） */}
          <button
            type="button"
            aria-label="打开菜单"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="ml-auto flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className="h-[2px] w-[20px] rounded bg-ink" />
            <span className="h-[2px] w-[20px] rounded bg-ink" />
            <span className="h-[2px] w-[20px] rounded bg-ink" />
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-line bg-white px-5 pb-4 lg:hidden">
            {TOP_NAV.map((item) => (
              <a
                key={item.label}
                href={link(item.href)}
                className="block border-b border-line/60 py-3 text-[15px] text-ink last:border-0"
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>

      {TOP_NAV.map((item) =>
        item.menu && openMenu === item.label ? <MegaPanel key={item.label} menu={item.menu} /> : null,
      )}
    </header>
  );
}
