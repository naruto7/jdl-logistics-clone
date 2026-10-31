import { asset } from '@/lib/assets';
import { NewsCard } from './news/NewsCard';
import { MoreCard } from './news/MoreCard';
import { NEWS_CARDS } from './news/newsData';

/**
 * 新闻动态区（官网实测：y=2204，高 447，上下 padding 43.2）
 *
 * 还原要点（数值来自 spec/key-rects.json + 官网样式表）：
 * - 背景：整幅 cover-01 图片 cover 铺满，上面盖一层 blur(36px) + rgba(97,97,97,.36) 的遮罩
 *   （官网 DOM 是 .news-updates 的 background-image + 同级 .bg-overlay{backdrop-filter:blur(.5rem)}，
 *   这里用同样的 DOM 结构，保证模糊观感与截图一致）
 * - 标题：与各区块共用 .home-section-title 规范，白色 FZLTDHK 25.92/30.24，
 *   两侧红色短横线 17.28x1.44、间距 10.8，标题下留 25.2
 * - 内容：版心 982，卡片行 gap 14.4，4 张新闻卡 + 右侧更多卡（更多卡按官网会溢出卡片行右缘约 32px，照搬）
 *
 * 整体高度：43.2 + 30.24 + 25.2 + 305.28 + 43.2 = 447.12 → 容器固定 447（overflow hidden 吃掉 0.12px 亚像素）
 */
export function NewsSection() {
  return (
    <section
      data-section="news"
      className="relative h-[447px] overflow-hidden bg-no-repeat py-[43.2px] max-sm:h-auto"
      style={{
        backgroundImage: `url(${asset('news/cover-01.jpg')})`,
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
      }}
    >
      {/* 背景模糊 + 灰调遮罩：对应官网 .bg-overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: 'rgba(97, 97, 97, 0.36)',
          backdropFilter: 'blur(36px)',
          WebkitBackdropFilter: 'blur(36px)',
        }}
      />

      {/* 区块标题：白色 FZLTDHK + 两侧红色短横线 */}
      <h2 className="relative z-[1] mb-[25.2px] flex items-center justify-center gap-[10.8px] font-display text-[25.92px] leading-[30.24px] text-white max-sm:mb-[20px] max-sm:gap-[4.32px] max-sm:text-[14.4px] max-sm:leading-[16.8px]">
        <span aria-hidden className="h-[1.44px] w-[17.28px] shrink-0 bg-[#f10215] max-sm:w-[7.2px]" />
        <span>新闻动态</span>
        <span aria-hidden className="h-[1.44px] w-[17.28px] shrink-0 bg-[#f10215] max-sm:w-[7.2px]" />
      </h2>

      {/* 版心：标题与卡片行为官网实测的 982 宽、左边界 229 */}
      <div className="container-page relative z-[1]">
        <div className="flex gap-[14.4px] max-sm:flex-wrap max-sm:justify-center">
          {NEWS_CARDS.map((card) => (
            <NewsCard key={`${card.date}-${card.title}`} card={card} />
          ))}
          <MoreCard />
        </div>
      </div>
    </section>
  );
}
