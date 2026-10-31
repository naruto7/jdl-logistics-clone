import { link } from '@/lib/links';
import { ArrowRightIcon } from './NewsCard';
import { MORE_ENTRIES } from './newsData';

/**
 * 右侧「更多」卡（官网实测 171.36 x 227.52，距卡片行顶部 15.84，左右各留 7.2 外边距）
 *
 * 半透明玻璃卡片：背景 rgba(0,0,0,0.2) + backdrop-blur(4.32px)，
 * 内部垂直居中排两个胶囊按钮（每个 122.4 x 36，圆角 18，白 20% 底）。
 */
export function MoreCard() {
  return (
    <div
      className="my-[15.84px] mx-[7.2px] flex h-[227.52px] w-[171.36px] shrink-0 flex-col items-center justify-center gap-[28.8px] rounded-[14.4px] max-sm:hidden"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(4.32px)',
        WebkitBackdropFilter: 'blur(4.32px)',
      }}
    >
      {MORE_ENTRIES.map((entry) => (
        <a
          key={entry.label}
          href={link(entry.href)}
          className="flex h-[36px] w-[122.4px] items-center justify-center rounded-[18px] text-[12.96px] leading-none text-white transition-colors duration-200 hover:text-[#f10215]"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          {entry.label}
          <ArrowRightIcon className="h-[1em] w-[1em]" />
        </a>
      ))}
    </div>
  );
}
