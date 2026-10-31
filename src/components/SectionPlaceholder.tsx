import { SITE } from '@/data/site';
import { link } from '@/lib/links';

/**
 * 内页占位骨架：由各栏目负责人替换为真正的落地页内容。
 * 保留统一的版心、标题层级与声明区，保证「先能跑、再精修」。
 */
export function SectionPlaceholder({
  title,
  subtitle,
  note,
}: {
  title: string;
  subtitle: string;
  note?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="container-page py-24">
        <p className="text-[13px] tracking-[2px] text-brand">京东物流 · {SITE.cloneTitle}</p>
        <h1 className="mt-3 text-[42px] font-bold leading-tight text-ink">{title}</h1>
        <p className="mt-4 max-w-[720px] text-[16px] leading-8 text-ink-2">{subtitle}</p>
        {note ? <p className="mt-2 max-w-[720px] text-[14px] leading-7 text-ink-3">{note}</p> : null}
        <div className="mt-10 rounded-card border border-line bg-white p-8 shadow-card">
          <p className="text-[15px] leading-8 text-ink-2">
            本页正在按官网内容结构还原中（页面骨架已就绪，内容区块陆续填充）。
            返回 <a className="text-brand underline" href={link('/')}>首页</a> 查看已完成的首页复刻。
          </p>
        </div>
      </div>
    </section>
  );
}
