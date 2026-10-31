import type { PageHeroContent } from '@/data/inner/types';
import { asset } from '@/lib/assets';
import { link } from '@/lib/links';
import { Container, StatStrip } from './primitives';

/**
 * 内页通用头图区。
 *
 * 设计意图：官网上每个栏目是一条「主题大图」，配色各不相同（红/绿/蓝）。
 * 本站统一收敛为「品牌红作为主渐变 + 真实素材作为右侧质感层」，
 * 只在可持续发展页保留绿色调，保证 5 个内页与首页是同一套设计语言。
 */
const TONE_BG: Record<NonNullable<PageHeroContent['tone']>, string> = {
  brand: 'linear-gradient(115deg, #a41c19 0%, #db2f2c 40%, #fc3737 68%, #fe7968 100%)',
  green: 'linear-gradient(115deg, #0c2116 0%, #16402a 48%, #1f6b41 100%)',
  slate: 'linear-gradient(115deg, #14151a 0%, #23252b 52%, #3a3e48 100%)',
};

export function PageHero({ content }: { content: PageHeroContent }) {
  const tone = content.tone ?? 'brand';
  const image = content.image ? asset(content.image) : '';
  const mask = {
    maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 28%, #000 72%)',
    WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 28%, #000 72%)',
  } as const;

  return (
    <section className="relative overflow-hidden" aria-label={content.eyebrow}>
      {/* 品牌渐变底色 */}
      <div className="absolute inset-0" style={{ backgroundImage: TONE_BG[tone] }} aria-hidden />

      {/* 真实素材：右侧渐隐，作为质感层 */}
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-y-0 right-0 h-full w-[64%] object-cover opacity-45 mix-blend-luminosity"
          style={mask}
        />
      ) : null}

      {/* 暗色压层，保证白色文字对比度 */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(90deg, rgba(10,11,14,0.58) 0%, rgba(10,11,14,0.38) 46%, rgba(10,11,14,0.12) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[52%] opacity-30"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(circle at 18% 26%, rgba(255,255,255,0.4), transparent 58%)',
        }}
      />

      <Container className="relative pb-[52px] pt-[40px] md:pb-[64px] md:pt-[48px]">
        {/* 面包屑 */}
        <nav aria-label="面包屑" className="flex flex-wrap items-center gap-2 text-[12.5px] text-white/65">
          {content.crumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span className="text-white/35">/</span> : null}
              {crumb.href ? (
                <a href={link(crumb.href)} className="transition-colors hover:text-white">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-white/90">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <p className="mt-8 flex items-center gap-2 text-[12.5px] font-medium tracking-[2px] text-white/75">
          <span className="h-[3px] w-7 rounded-full bg-white/90" aria-hidden />
          {content.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-[40px] leading-[1.2] tracking-[1.5px] text-white md:text-[46px]">
          {content.title}
        </h1>
        <p className="mt-4 max-w-[660px] text-[15px] leading-8 text-white/80">{content.subtitle}</p>

        {content.stats?.length ? (
          <StatStrip stats={content.stats} invert className="mt-10 max-w-[900px]" />
        ) : null}
      </Container>
    </section>
  );
}
