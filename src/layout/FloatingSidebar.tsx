import { useEffect, useState } from 'react';
import { asset } from '@/lib/assets';
import { link } from '@/lib/links';

/**
 * 右侧悬浮客服组（实测：x=1368、宽 52；胶囊列表 52x153 + 圆形返回顶部 52x52，间距 14）
 * 位置固定在视口右下，随滚动常驻。
 */
const ITEMS = [
  { icon: 'float/icon-qiwei.webp', label: '企业微信', href: '/support/#contact' },
  { icon: 'float/icon-chat.png', label: '在线客服', href: '/support/#contact' },
  { icon: 'float/icon-contact.png', label: '联系我们', href: '/support/#contact' },
];

export function FloatingSidebar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      data-qa="float"
      className="fixed bottom-[41px] right-[20px] z-40 hidden w-[52px] flex-col items-center gap-[12px] xl:flex"
    >
      <ul className="w-[52px] rounded-full bg-white/90 py-[1.5px] shadow-[0_11.52px_7.92px_rgba(0,0,0,0.1)] backdrop-blur">
        {ITEMS.map((item) => (
          <li key={item.label}>
            <a
              href={link(item.href)}
              className="group flex h-[50px] w-full flex-col items-center justify-center"
              title={item.label}
              aria-label={item.label}
            >
              <img
                src={asset(item.icon)}
                alt=""
                className="h-[39px] w-[39px] transition-transform duration-200 group-hover:scale-105"
              />
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="返回顶部"
        className={`flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/90 shadow-[0_11.52px_7.92px_rgba(0,0,0,0.1)] backdrop-blur transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden>
          <path d="M1 8L7 2L13 8" stroke="#23252b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
