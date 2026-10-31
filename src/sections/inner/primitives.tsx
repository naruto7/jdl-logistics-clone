import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { asset } from '@/lib/assets';
import { link } from '@/lib/links';

/* -------------------------------------------------------------------------- */
/* 版心                                                                        */
/* -------------------------------------------------------------------------- */

/** 内页统一版心：沿用首页 982px 版心，保证与首页同一视觉节奏 */
export function Container({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`container-page ${className}`}>{children}</div>;
}

/* -------------------------------------------------------------------------- */
/* 区块标题                                                                    */
/* -------------------------------------------------------------------------- */

export function SectionHead({
  eyebrow,
  title,
  desc,
  align = 'left',
  invert = false,
  action,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  align?: 'left' | 'center';
  invert?: boolean;
  action?: ReactNode;
}) {
  const centered = align === 'center';
  return (
    <div
      className={`flex flex-col gap-4 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={centered ? 'flex flex-col items-center' : ''}>
        {eyebrow ? (
          <p
            className={`flex items-center gap-2 text-[13px] font-medium tracking-[1px] ${
              invert ? 'text-white/70' : 'text-brand'
            }`}
          >
            <span className="h-[3px] w-6 rounded-full bg-brand" aria-hidden />
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={`mt-3 font-display text-[30px] leading-[1.3] tracking-[1px] ${
            invert ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
        {desc ? (
          <p
            className={`mt-3 max-w-[720px] text-[15px] leading-7 ${invert ? 'text-white/75' : 'text-ink-2'}`}
          >
            {desc}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 锚点区块                                                                    */
/* -------------------------------------------------------------------------- */

/** 吸顶头部 100px + 页内导航约 52px + 留白；Tailwind 需静态类名，故写字面量 */
const SCROLL_MT = 'scroll-mt-[168px]';

type Tone = 'white' | 'surface' | 'dark';

const TONE_CLASS: Record<Tone, string> = {
  white: 'bg-white',
  surface: 'bg-surface',
  dark: 'bg-dark text-white',
};

/**
 * 锚点区块：id 必须与 nav.ts 的锚点一致。
 * scroll-mt 保证从其他页面带 #hash 进来时，标题不会被吸顶头部遮住。
 */
export function AnchorSection({
  id,
  title,
  eyebrow,
  desc,
  tone = 'white',
  children,
  className = '',
  action,
}: {
  id: string;
  title?: string;
  eyebrow?: string;
  desc?: string;
  tone?: Tone;
  children?: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${SCROLL_MT} ${TONE_CLASS[tone]} py-[64px] ${className}`}
    >
      <Container>
        {title ? <SectionHead eyebrow={eyebrow} title={title} desc={desc} invert={tone === 'dark'} action={action} /> : null}
        {children ? <div className={title ? 'mt-10' : ''}>{children}</div> : null}
      </Container>
    </section>
  );
}

/** 卡片级锚点：22 个服务/行业锚点直接落在卡片上（比整页 section 更精准） */
export function AnchorCard({
  id,
  className = '',
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article id={id} className={`${SCROLL_MT} ${className}`}>
      {children}
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* 数据条                                                                      */
/* -------------------------------------------------------------------------- */

export function StatStrip({
  stats,
  invert = false,
  className = '',
}: {
  stats: readonly { value: string; label: string }[];
  invert?: boolean;
  className?: string;
}) {
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label} className={`border-l pl-5 ${invert ? 'border-white/20' : 'border-line'}`}>
          <dt className={`font-num text-[34px] leading-[1.1] ${invert ? 'text-white' : 'text-brand'}`}>
            {stat.value}
          </dt>
          <dd className={`mt-2 text-[13px] leading-6 ${invert ? 'text-white/70' : 'text-ink-3'}`}>{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------------------- */
/* 按钮                                                                        */
/* -------------------------------------------------------------------------- */

const PILL_BASE =
  'inline-flex items-center justify-center gap-1.5 rounded-full px-[26px] text-[14px] font-medium transition-all duration-200';

export function PillLink({
  href,
  children,
  variant = 'solid',
  className = '',
  onClick,
  target,
}: {
  href?: string;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'ghost' | 'white';
  className?: string;
  onClick?: () => void;
  target?: string;
}) {
  const variantClass =
    variant === 'solid'
      ? 'h-11 bg-brand text-white hover:bg-brand/90 hover:shadow-[0_10px_24px_rgba(252,55,55,0.35)]'
      : variant === 'outline'
        ? 'h-11 border border-brand/40 text-brand hover:border-brand hover:bg-brand/5'
        : variant === 'white'
          ? 'h-11 bg-white text-brand hover:bg-white/90'
          : 'h-11 border border-white/40 text-white hover:bg-white/10';
  const cls = `${PILL_BASE} ${variantClass} ${className}`;
  if (href) {
    return (
      <a
        href={link(href)}
        className={cls}
        target={target}
        rel={target === '_blank' ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* 媒体卡片                                                                    */
/* -------------------------------------------------------------------------- */

export function MediaCard({
  image,
  title,
  desc,
  tag,
  points,
  metric,
  actionHref,
  actionLabel = '咨询该服务',
  className = '',
}: {
  image?: string;
  title: string;
  desc: string;
  tag?: string;
  points?: string[];
  metric?: { value: string; label: string };
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}) {
  const src = image ? asset(image) : '';
  return (
    <div
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_6px_20px_rgba(26,26,26,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${className}`}
    >
      {src ? (
        <div className="relative h-[156px] overflow-hidden">
          <img
            src={src}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {metric ? (
            <span className="absolute bottom-0 left-0 rounded-tr-xl bg-brand-gradient px-3 py-1.5 font-num text-[15px] text-white">
              {metric.value}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <h3 className="text-[18px] font-semibold text-ink">{title}</h3>
          {tag ? (
            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] text-brand">{tag}</span>
          ) : null}
        </div>
        <p className="mt-2 text-[13px] leading-6 text-ink-2">{desc}</p>
        {points?.length ? (
          <ul className="mt-3 space-y-1.5">
            {points.slice(0, 3).map((point) => (
              <li key={point} className="flex gap-2 text-[12.5px] leading-5 text-ink-3">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand/70" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto pt-4">
          {actionHref ? (
            <a
              href={link(actionHref)}
              className="inline-flex items-center gap-1 text-[13px] font-medium text-brand transition-transform group-hover:translate-x-0.5"
            >
              {actionLabel}
              <span aria-hidden>→</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 底部 CTA                                                                    */
/* -------------------------------------------------------------------------- */

export function CtaBand({
  title,
  desc,
  primaryLabel = '联系客服 950616',
  primaryHref = 'tel:950616',
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  desc: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-white pb-[72px] pt-[8px]">
      <Container>
        <div className="relative overflow-hidden rounded-[20px] bg-brand-gradient px-8 py-12 text-white md:px-14">
          <span className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" aria-hidden />
          <span className="pointer-events-none absolute -bottom-24 right-24 h-44 w-44 rounded-full bg-white/10" aria-hidden />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[560px]">
              <h2 className="font-display text-[30px] leading-[1.3] tracking-[1px]">{title}</h2>
              <p className="mt-3 text-[14px] leading-7 text-white/85">{desc}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <PillLink href={primaryHref} variant="white">
                {primaryLabel}
              </PillLink>
              {secondaryLabel ? (
                <PillLink href={secondaryHref} variant="ghost">
                  {secondaryLabel}
                </PillLink>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 演示提示（登录 / 语言切换等不真实跳转的交互）                                 */
/* -------------------------------------------------------------------------- */

export function useNotice() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [message]);

  const notify = useCallback((text: string) => setMessage(text), []);

  const node = message ? (
    <div
      role="status"
      className="fixed bottom-8 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-ink px-6 py-3 text-[13px] text-white shadow-panel"
    >
      {message}
    </div>
  ) : null;

  return { notify, node };
}

/** 演示数据角标 */
export function DemoBadge({ children = '前端模拟演示' }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-brand/25 bg-brand/10 px-2.5 py-1 text-[11px] text-brand">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
      {children}
    </span>
  );
}

/** 数据来源说明 */
export function Footnote({ children }: { children: ReactNode }) {
  return (
    <Container>
      <p className="border-t border-line pt-6 text-[12px] leading-6 text-ink-3">{children}</p>
    </Container>
  );
}
