import {
  ESG_COOPERATION,
  ESG_FOOTNOTE,
  ESG_HERO,
  ESG_NAV,
  ESG_PILLARS,
  ESG_REPORTS,
  ESG_REPORT_URL,
  GREEN_ACTIONS,
  GREEN_MILESTONES,
  GREEN_MODULES,
  GREEN_NEWS,
  GREEN_STATS,
} from '@/data/inner/esg';
import { asset } from '@/lib/assets';
import { link, sectionLink } from '@/lib/links';
import { PageHero } from '@/sections/inner/PageHero';
import { PageNav } from '@/sections/inner/PageNav';
import { useAnchorScroll } from '@/sections/inner/useAnchorScroll';
import {
  AnchorSection,
  Container,
  CtaBand,
  DemoBadge,
  Footnote,
  PillLink,
  SectionHead,
  StatStrip,
} from '@/sections/inner/primitives';

const SCROLL_MT = 'scroll-mt-[168px]';

export function EsgPage() {
  useAnchorScroll();
  const greenBanner = asset('inner/esg/green-banner');

  return (
    <>
      <PageHero content={ESG_HERO} />
      <PageNav items={ESG_NAV} />

      {/* #esg：ESG 治理 */}
      <AnchorSection
        id="esg"
        eyebrow="ESG · 环境 / 社会 / 治理"
        title="智链协同 共享未来"
        desc="京东物流把可持续发展嵌入供应链的每一个环节：从包装、运输、仓储到回收，形成可量化、可披露的绿色行动体系。"
        tone="white"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {ESG_PILLARS.map((pillar) => (
            <article key={pillar.key} className="flex h-full flex-col rounded-xl border border-line bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-gradient font-num text-[18px] text-white">
                  {pillar.key}
                </span>
                <p className="text-[16px] font-semibold text-ink">{pillar.title}</p>
              </div>
              <p className="mt-4 text-[13px] leading-6 text-ink-2">{pillar.desc}</p>
              <ul className="mt-4 space-y-2 border-t border-line pt-4">
                {pillar.points.map((point) => (
                  <li key={point} className="flex gap-2 text-[12.5px] leading-5 text-ink-3">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand/70" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* 绿色行动四项 */}
        <div className="mt-12">
          <SectionHead eyebrow="我们的行动" title="四个绿色行动方向" />
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GREEN_ACTIONS.map((action) => (
              <div key={action.title} className="rounded-xl bg-surface p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-[15px] text-brand shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                    {action.icon}
                  </span>
                  <span className="font-num text-[20px] text-brand">{action.stat}</span>
                </div>
                <p className="mt-4 text-[15px] font-semibold text-ink">{action.title}</p>
                <p className="mt-2 text-[12.5px] leading-6 text-ink-2">{action.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ESG 报告 */}
        <div className="mt-12 rounded-xl border border-line bg-surface/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[16px] font-semibold text-ink">ESG 报告</p>
              <p className="mt-1.5 text-[12.5px] text-ink-3">京东物流历年 ESG / 可持续发展报告（2021-2025）。</p>
            </div>
            <PillLink href={ESG_REPORT_URL} target="_blank" variant="outline">
              前往官网 ESG 频道
            </PillLink>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {ESG_REPORTS.map((report) => (
              <a
                key={report.year}
                href={ESG_REPORT_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between rounded-lg border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card"
              >
                <span className="font-num text-[26px] leading-none text-brand">{report.year}</span>
                <span className="mt-2 text-[12px] text-ink-3 group-hover:text-ink-2">{report.label}</span>
              </a>
            ))}
          </div>
        </div>
      </AnchorSection>

      {/* #green：青流计划（绿色主题区块，与品牌红形成对比） */}
      <section id="green" className={`${SCROLL_MT} relative overflow-hidden bg-dark py-[64px]`}>
        {greenBanner ? (
          <img
            src={greenBanner}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
        ) : null}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              'linear-gradient(100deg, rgba(8,26,17,0.94) 0%, rgba(12,40,25,0.82) 46%, rgba(20,64,42,0.55) 100%)',
          }}
        />
        <Container className="relative">
          <SectionHead
            eyebrow="青流计划 · 2017 至今"
            title="万向青流 共链未来"
            desc="青流计划是京东物流携手供应链上下游伙伴，推动供应链端到端绿色化、环保化的重要举措。"
            invert
            action={<DemoBadge>数据来自官网</DemoBadge>}
          />

          <StatStrip stats={GREEN_STATS.map((stat) => ({ value: `${stat.value}${stat.unit}`, label: stat.label }))} invert className="mt-10" />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GREEN_MODULES.map((module) => (
              <div key={module.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-[15px] font-semibold text-white">{module.title}</p>
                <p className="mt-2 text-[12.5px] leading-6 text-white/60">{module.desc}</p>
              </div>
            ))}
          </div>

          {/* 里程碑 */}
          <div className="mt-12">
            <p className="flex items-center gap-2 text-[13px] text-white/60">
              <span className="h-3 w-1 rounded-full bg-brand" aria-hidden />
              青流里程碑
            </p>
            <ol className="mt-5 grid gap-4 md:grid-cols-5">
              {GREEN_MILESTONES.map((milestone, index) => (
                <li key={`${milestone.year}-${milestone.title}`} className="relative rounded-xl border border-white/10 p-4">
                  <span className="font-num text-[18px] text-white/35">{String(index + 1).padStart(2, '0')}</span>
                  <p className="mt-1 text-[13px] font-medium text-white">{milestone.title}</p>
                  <p className="mt-1 text-[11.5px] leading-5 text-white/50">{milestone.desc}</p>
                  <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] text-white/70">
                    {milestone.year}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PillLink href={link('https://www.jdl.com/green')} target="_blank" variant="white">
              了解青流计划（官网）
            </PillLink>
            <PillLink href={sectionLink('/esg/', 'greenNews')} variant="ghost">
              查看环保资讯
            </PillLink>
          </div>
        </Container>
      </section>

      {/* #greenNews：环保资讯 */}
      <AnchorSection
        id="greenNews"
        eyebrow="环保资讯"
        title="绿色实践的最新进展"
        desc="来自京东物流官网「环保资讯」栏目的公开报道。"
        tone="surface"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GREEN_NEWS.map((news, index) => {
            const cover = news.cover ? asset(news.cover) : '';
            return (
              <article
                key={`${news.date}-${news.title}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative h-[150px] overflow-hidden">
                  {cover ? (
                    <img
                      src={cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="h-full w-full bg-surface" />
                  )}
                  {index < 2 ? (
                    <span className="absolute left-0 top-0 bg-brand px-2.5 py-1 text-[11px] text-white">最新</span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[12px] text-ink-3">{news.date}</p>
                  <h3 className="mt-2 text-[14px] font-medium leading-6 text-ink transition-colors group-hover:text-brand">
                    {news.title}
                  </h3>
                  <p className="mt-auto pt-3 text-[12px] text-ink-3">京东物流 · 环保资讯</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <PillLink href={link('https://www.jdl.com/greenNews')} target="_blank" variant="outline">
            更多环保资讯（官网）
          </PillLink>
          <p className="text-[12px] leading-5 text-ink-3">
            本页资讯标题与日期来自官网公开列表，仅用于学习复刻演示。
          </p>
        </div>
      </AnchorSection>

      {/* #contact 合作咨询 */}
      <AnchorSection
        id="contact"
        eyebrow="合作咨询"
        title="和青流计划一起做绿色供应链"
        desc="面向品牌客户、供应商与生态伙伴开放合作：绿色方案、低碳技术与碳管理能力可以组合落地。"
        tone="white"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {ESG_COOPERATION.map((item) => (
            <div key={item.title} className="rounded-xl border border-line bg-white p-6">
              <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                <span className="h-4 w-1 rounded-full bg-brand" aria-hidden />
                {item.title}
              </p>
              <p className="mt-3 text-[13px] leading-6 text-ink-2">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-4 rounded-xl bg-surface p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[15px] font-semibold text-ink">企业合作联系</p>
            <p className="mt-1.5 text-[12.5px] leading-6 text-ink-3">
              客服热线 950616（周一至周日 8:00-22:00）；企业合作可扫码添加专属物流顾问，24×7 即时响应。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PillLink href="tel:950616">致电 950616</PillLink>
            <PillLink href={sectionLink('/support/', 'contact')} variant="outline">
              更多联系方式
            </PillLink>
          </div>
        </div>
      </AnchorSection>

      <CtaBand
        title="让绿色成为供应链的默认选项"
        desc="从循环包装替换、绿色仓配方案到碳核算与科学碳目标辅导，青流计划向上下游伙伴开放合作。"
        primaryLabel="合作咨询 950616"
        primaryHref="tel:950616"
        secondaryLabel="查看 ESG 报告"
        secondaryHref={ESG_REPORT_URL}
      />
      <Footnote>{ESG_FOOTNOTE}</Footnote>
    </>
  );
}
