import type { CSSProperties } from 'react';
import { asset } from '@/lib/assets';
import { link } from '@/lib/links';
import type { NewsCardData } from './newsData';

/**
 * 箭头图标：参照站用的是 Element Plus 的 el-icon-arrow-right，
 * 这里用同一个 SVG path 复刻，避免引入图标库依赖。
 */
export function ArrowRightIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 1024 1024" fill="currentColor" aria-hidden>
      <path d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z" />
    </svg>
  );
}

/**
 * 单张新闻卡（官网实测 194.4 x 305.28）
 *
 * 结构（与官网 DOM 一一对应）：
 *   a.news-card
 *     └ div.card-main（封面 194.4x259.2，圆角 14.4，hover 时封面放大 / 日期隐藏 / 按钮浮现）
 *         ├ span.tag「新闻」（左上角，34.56 高，右下圆角 7.2）
 *         ├ img.card-image
 *         └ div.hover-mask（底部渐变 + 日期 + 查看详情按钮）
 *     └ h3.title（白色 14.4/20.16，两行截断）
 *
 * 尺寸说明：参照站根字号是随视口缩放的 rem（1440 视口下 1rem = 72px），
 * 实测值 194/259/14.4 等是 rem 换算后的像素，这里直接写换算后的 px 保证 1440 基准像素对齐。
 */
export function NewsCard({ card }: { card: NewsCardData }) {
  return (
    <a href={link(card.href)} className="block w-[194.4px] shrink-0 max-sm:w-[calc(50%-8px)]" aria-label={card.title}>
      {/* 封面卡：hover 交互的作用域（对应官网 .card-main:hover） */}
      <div className="group/card relative mb-[5.76px] h-[259.2px] w-full overflow-hidden rounded-[14.4px] bg-[#d8d8d8] max-sm:h-auto max-sm:aspect-[3/4]">
        {/* 封面图：与官网渲染一致——等比放大铺满卡片再居中裁切（object-fit: cover） */}
        <img
          src={asset(card.cover)}
          alt={card.title}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-[1.14]"
        />

        {/* 左上角「新闻」标签 */}
        <span className="absolute left-0 top-0 z-[1] h-[34.56px] rounded-br-[7.2px] bg-black/60 px-[14.4px] text-[14.4px] leading-[34.56px] text-white">
          新闻
        </span>

        {/* 底部渐变遮罩：日期常显，悬停后换成「查看详情」按钮 */}
        <div
          className="absolute inset-x-0 bottom-0 h-[74.88px]"
          style={{ backgroundImage: 'linear-gradient(1turn, #23252b, rgba(35, 37, 43, 0))' }}
        >
          <span className="absolute bottom-[14.4px] left-[14.4px] text-[14.4px] leading-[20.16px] text-white/50 group-hover/card:hidden">
            {card.date}
          </span>
          <div
            className="mx-auto mt-[15.12px] flex h-[40.32px] w-[129.6px] translate-y-[14.4px] items-center justify-center rounded-[20.16px] text-[12.96px] leading-none text-white opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100"
            style={{ backgroundImage: 'linear-gradient(149.03deg, #fe7968, #fc3737)' }}
          >
            查看详情
            <ArrowRightIcon className="ml-[1.44px] h-[1em] w-[1em]" />
          </div>
        </div>
      </div>

      {/* 卡下标题：白色两行截断 */}
      <h3 className="line-clamp-2 text-[14.4px] leading-[1.4] text-white [word-break:break-word]">{card.title}</h3>
    </a>
  );
}
