import { useEffect, useState } from 'react';
import type { NavItem } from '@/data/inner/types';
import { Container } from './primitives';

/**
 * 内页吸顶页内导航：把每个栏目的锚点集中成胶囊，滚动时高亮当前区块。
 * sticky top-[100px] = 让开全局头部（黑色辅助条 31px + 白色主导航 69px）。
 */
export function PageNav({ items }: { items: readonly NavItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');
  const idKey = items.map((item) => item.id).join('|');

  useEffect(() => {
    const ids = idKey.split('|').filter(Boolean);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-160px 0px -56% 0px', threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [idKey]);

  return (
    <div className="sticky top-[100px] z-30 border-y border-line bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="mr-1.5 shrink-0 text-[12px] text-ink-3">本页导航</span>
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActive(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] transition-colors ${
                  isActive ? 'bg-brand font-medium text-white' : 'text-ink-2 hover:bg-surface hover:text-ink'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
