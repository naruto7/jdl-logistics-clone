import {
  CASE_STUDIES,
  INDUSTRY_SOLUTIONS,
  LATEST_CASES,
  LOGISTICS_TECH_SOLUTIONS,
  SOLUTION_VALUES,
  SOLUTIONS_FOOTNOTE,
  SOLUTIONS_HERO,
  SOLUTIONS_NAV,
} from '@/data/inner/solutions';
import { asset } from '@/lib/assets';
import { link, sectionLink } from '@/lib/links';
import { PageHero } from '@/sections/inner/PageHero';
import { PageNav } from '@/sections/inner/PageNav';
import { useAnchorScroll } from '@/sections/inner/useAnchorScroll';
import {
  AnchorCard,
  AnchorSection,
  CtaBand,
  Footnote,
  MediaCard,
  PillLink,
  StatStrip,
} from '@/sections/inner/primitives';

/** 方案优势：从官网行业方案页的「方案优势」整理 */
const SOLUTION_EDGE = [
  { title: '全渠道 E2E', desc: '线上线下仓配一体、跨境、O2O 多渠道多场景的解决方案与运营能力。' },
  { title: '一盘货库存共享', desc: '唯一码/串码精细化管理，线上线下多渠道库存融合，提高库存周转效率。' },
  { title: '正逆一体', desc: '正向发货稳定高效，逆向取件退货便捷安全，客退质检与翻新流程标准化。' },
  { title: '大促弹性保障', desc: '峰值订单处理能力弹性扩充，十五年大促运营经验保障时效达成。' },
];

/** 案例数据条（取自官网行业客户案例页指标） */
const CASE_STATS = [
  { value: '95.5%', label: '一次订单满足率提升' },
  { value: '21%', label: '履约时效提升' },
  { value: '8.5%', label: '订单满足率提升' },
  { value: '35%', label: '库存金额降低' },
];

export function SolutionsPage() {
  useAnchorScroll();

  return (
    <>
      <PageHero content={SOLUTIONS_HERO} />
      <PageNav items={SOLUTIONS_NAV} />

      {/* 行业方案：7 个锚点 */}
      <AnchorSection
        id="group-industry"
        eyebrow="行业方案"
        title="按行业特性定制的供应链方案"
        desc="每个行业的货型、时效、退货与末端服务要求都不同；京东物流以同一张网络 + 行业化流程来适配。"
        tone="white"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {INDUSTRY_SOLUTIONS.map((item) => (
            <AnchorCard key={item.id} id={item.id} className="h-full">
              <MediaCard
                image={item.image}
                title={item.name}
                tag={item.tag}
                desc={item.desc}
                points={item.points}
                metric={item.metric}
                actionHref={sectionLink('/support/', 'contact')}
                actionLabel="索取行业方案"
              />
            </AnchorCard>
          ))}
          {/* 凑满 2 列栅格：定制方案入口 */}
          <div className="flex flex-col justify-between rounded-xl bg-brand-gradient p-7 text-white md:col-span-2">
            <div>
              <p className="font-display text-[24px] tracking-[1px]">没有找到匹配的行业？</p>
              <p className="mt-3 max-w-[620px] text-[13px] leading-7 text-white/85">
                京东物流为不同规模的品牌方、代理商、经销商与平台商家提供定制化方案。告诉我们 SKU 结构、订单波次、
                仓网与时效要求，即可获得一份可落地的供应链方案建议。
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <PillLink href={sectionLink('/support/', 'contact')} variant="white">
                联系方案顾问
              </PillLink>
              <PillLink href={sectionLink('/support/', 'faq')} variant="ghost">
                常见问题
              </PillLink>
            </div>
          </div>
        </div>
      </AnchorSection>

      {/* 物流科技方案：#logisticsTech */}
      <AnchorSection
        id="logisticsTech"
        eyebrow="物流科技"
        title="用科技把方案落到系统里"
        desc="从智能仓储到数智化供应链，京东物流把自研软硬件与算法能力做成可交付的产品，与行业方案组合使用。"
        tone="surface"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LOGISTICS_TECH_SOLUTIONS.map((tech) => (
            <a
              key={tech.name}
              href={sectionLink('/services/', tech.target)}
              className="group rounded-xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-semibold text-ink group-hover:text-brand">{tech.name}</p>
                <span className="text-brand" aria-hidden>
                  →
                </span>
              </div>
              <p className="mt-2 text-[12.5px] leading-6 text-ink-2">{tech.desc}</p>
            </a>
          ))}
        </div>
      </AnchorSection>

      {/* 行业案例：4 个锚点 */}
      <AnchorSection
        id="group-cases"
        eyebrow="行业案例"
        title="和客户一起把方案跑成结果"
        desc="以下数据与案例来自京东物流官网行业客户案例页。"
        tone="white"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {CASE_STUDIES.map((item) => {
            const cover = asset(item.image);
            return (
              <AnchorCard key={item.id} id={item.id} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_6px_20px_rgba(26,26,26,0.05)] transition-shadow hover:shadow-card">
                  <div className="relative h-[168px] overflow-hidden">
                    <img
                      src={cover}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-0 top-0 bg-dark/85 px-3 py-1 text-[12px] text-white">
                      {item.name}案例
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[17px] font-semibold text-ink">{item.subject}</h3>
                      <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] text-brand">客户案例</span>
                    </div>
                    <p className="mt-2 text-[13px] leading-6 text-ink-2">{item.desc}</p>
                    <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
                      {item.metrics.map((metric) => (
                        <div key={metric.label}>
                          <dt className="font-num text-[22px] leading-none text-brand">{metric.value}</dt>
                          <dd className="mt-1 text-[12px] text-ink-3">{metric.label}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-auto pt-4">
                      <a
                        href={sectionLink('/support/', 'contact')}
                        className="inline-flex items-center gap-1 text-[13px] font-medium text-brand transition-transform group-hover:translate-x-0.5"
                      >
                        咨询同行业方案
                        <span aria-hidden>→</span>
                      </a>
                    </div>
                  </div>
                </article>
              </AnchorCard>
            );
          })}
        </div>
      </AnchorSection>

      {/* 最新案例：#latestCases */}
      <AnchorSection
        id="latestCases"
        eyebrow="最新案例"
        title="最近跑通的三个行业场景"
        desc="来自京东物流官网「最新案例」栏目的公开报道。"
        tone="surface"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {LATEST_CASES.map((item) => (
            <article
              key={item.title}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative h-[150px] overflow-hidden">
                <img
                  src={asset(item.cover)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute left-0 top-0 bg-brand px-2.5 py-1 text-[11px] text-white">{item.tag}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[14.5px] font-medium leading-6 text-ink">{item.title}</h3>
                <p className="mt-2 text-[12.5px] leading-6 text-ink-2">{item.desc}</p>
                <a
                  href={link('https://www.jdl.com/activities')}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto pt-4 text-[12.5px] font-medium text-brand"
                >
                  查看案例（官网）→
                </a>
              </div>
            </article>
          ))}
        </div>
      </AnchorSection>

      {/* 方案价值 */}
      <AnchorSection
        id="group-value"
        eyebrow="方案价值"
        title="数字化 · 可视化 · 智能化"
        desc="以数据与算法把供应链从「成本中心」变成「增长引擎」。"
        tone="dark"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {SOLUTION_VALUES.map((value) => (
            <div key={value.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="font-display text-[22px] tracking-[1px] text-white">{value.title}</p>
              <p className="mt-3 text-[13px] leading-6 text-white/65">{value.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 p-6">
            <p className="text-[14px] font-medium text-white">方案优势</p>
            <ul className="mt-3 space-y-2.5">
              {SOLUTION_EDGE.map((edge) => (
                <li key={edge.title} className="flex gap-2.5 text-[12.5px] leading-6 text-white/65">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>
                    <span className="text-white/90">{edge.title}</span>：{edge.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 p-6">
            <p className="text-[14px] font-medium text-white">客户结果</p>
            <StatStrip stats={CASE_STATS} invert className="mt-4" />
          </div>
        </div>
        <div className="mt-8">
          <PillLink href={sectionLink('/support/', 'contact')} variant="white">
            获取行业方案
          </PillLink>
        </div>
      </AnchorSection>

      <CtaBand
        title="让供应链成为业务的增长引擎"
        desc="无论是消费品、3C、服饰、家电、汽车还是生鲜，京东物流都可以从仓网规划、库存计划到末端交付给出组合方案。"
        primaryLabel="联系方案顾问"
        primaryHref={sectionLink('/support/', 'contact')}
        secondaryLabel="看看服务与产品"
        secondaryHref={sectionLink('/services/', 'express')}
      />
      <Footnote>{SOLUTIONS_FOOTNOTE}</Footnote>
    </>
  );
}
