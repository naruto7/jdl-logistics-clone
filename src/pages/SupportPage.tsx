import { MERCHANT_SERVICES, SUPPORT_FOOTNOTE, SUPPORT_HERO, SUPPORT_NAV } from '@/data/inner/support';
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
  useNotice,
} from '@/sections/inner/primitives';
import {
  BranchLookup,
  ContactPanel,
  CoverageLookup,
  EtaQuery,
  FaqAccordion,
  LoginPanel,
  WaybillQuery,
} from '@/sections/inner/support-tools';

/** 快捷入口：把官网「服务支持」菜单里的常用工具做成卡片 */
const QUICK_ENTRIES = [
  { title: '查快递', desc: '输入运单号查看全流程轨迹', anchor: 'track' },
  { title: '运费时效', desc: '寄件地/收件地/重量查时效', anchor: 'eta' },
  { title: '服务范围', desc: '查看省市覆盖与派送范围', anchor: 'coverage' },
  { title: '网点查询', desc: '营业部、分拨中心与冷链仓', anchor: 'branch' },
];

export function SupportPage() {
  useAnchorScroll();
  const { notify, node } = useNotice();

  return (
    <>
      <PageHero content={SUPPORT_HERO} />
      <PageNav items={SUPPORT_NAV} />

      {/* 快捷入口 */}
      <section className="border-b border-line bg-white py-[40px]">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_ENTRIES.map((entry) => (
              <a
                key={entry.anchor}
                href={`#${entry.anchor}`}
                className="group rounded-xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card"
              >
                <p className="flex items-center justify-between text-[15px] font-semibold text-ink">
                  {entry.title}
                  <span className="text-brand transition-transform group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </p>
                <p className="mt-2 text-[12.5px] leading-6 text-ink-3">{entry.desc}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* #track 运单查询 */}
      <AnchorSection
        id="track"
        eyebrow="01 · 运单查询"
        title="运单查询"
        desc="输入运单号查看揽收、中转、派送全流程节点。演示站点使用前端模拟数据，不请求真实接口。"
        tone="white"
      >
        <WaybillQuery />
      </AnchorSection>

      {/* #eta 时效查询 */}
      <AnchorSection
        id="eta"
        eyebrow="02 · 运费时效查询"
        title="运费时效查询"
        desc="官网表单包含寄件地、收件地、寄件时间、重量与体积；这里保留最常用的三项，给出不同产品线的预计时效。"
        tone="surface"
      >
        <EtaQuery />
      </AnchorSection>

      {/* #coverage 服务范围 */}
      <AnchorSection
        id="coverage"
        eyebrow="03 · 服务范围查询"
        title="服务范围查询"
        desc="京东物流服务覆盖超 99% 的人口，配送范围覆盖全国 2800+ 区县。"
        tone="white"
      >
        <CoverageLookup />
      </AnchorSection>

      {/* #branch 网点查询 */}
      <AnchorSection
        id="branch"
        eyebrow="04 · 网点查询"
        title="网点查询"
        desc="按城市查询营业部、分拨中心、冷链仓与大件站点。"
        tone="surface"
      >
        <BranchLookup />
      </AnchorSection>

      {/* #merchant 商家服务 */}
      <AnchorSection
        id="merchant"
        eyebrow="05 · 商家服务"
        title="商家服务"
        desc="面向企业客户与商家的物流合作、系统对接与结算能力。"
        tone="white"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MERCHANT_SERVICES.map((service) => (
            <div key={service.title} className="flex flex-col rounded-xl border border-line bg-white p-5">
              <p className="text-[15px] font-semibold text-ink">{service.title}</p>
              <p className="mt-2 flex-1 text-[12.5px] leading-6 text-ink-2">{service.desc}</p>
              <button
                type="button"
                onClick={() => notify(`演示站点不提供真实办理入口：「${service.title}」请前往京东物流官网或联系客户经理`)}
                className="mt-4 h-9 rounded-full border border-brand/40 text-[12.5px] font-medium text-brand transition-colors hover:border-brand hover:bg-brand/5"
              >
                {service.action}
              </button>
            </div>
          ))}
        </div>
      </AnchorSection>

      {/* #faq 常见问题 */}
      <AnchorSection
        id="faq"
        eyebrow="06 · 常见问题"
        title="常见问题"
        desc="寄件、查件、理赔、冷链与国际业务的高频问题整理自分站服务说明。"
        tone="white"
      >
        <FaqAccordion />
        <p className="mt-6 text-[12.5px] text-ink-3">
          没有找到答案？可致电 950616，或将问题发送给在线客服。
        </p>
      </AnchorSection>

      {/* #contact 联系我们 */}
      <AnchorSection
        id="contact"
        eyebrow="07 · 联系我们"
        title="联系我们"
        desc="企业合作、寄件咨询与售后问题，都可以通过以下方式联系京东物流。"
        tone="surface"
      >
        <ContactPanel />
      </AnchorSection>

      {/* #login 登录 */}
      <AnchorSection
        id="login"
        eyebrow="08 · 登录"
        title="登录入口"
        desc="个人寄件、企业月结与商家工具分别有不同的登录入口；本站为复刻演示，不提供真实账号体系。"
        tone="white"
        action={<DemoBadge>演示站点</DemoBadge>}
      >
        <LoginPanel notify={notify} />
        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl bg-surface px-5 py-4">
          <p className="text-[13px] text-ink-2">
            真实账号登录请访问京东物流官网或京东商家工作台。
          </p>
          <PillLink href={link('https://www.jdl.com/')} target="_blank" variant="outline">
            前往京东物流官网
          </PillLink>
        </div>
      </AnchorSection>

      <CtaBand
        title="还有问题没解决？"
        desc="客服热线 950616，周一至周日 8:00-22:00；企业合作可扫码添加专属物流顾问，24×7 即时响应。"
        primaryLabel="致电 950616"
        primaryHref="tel:950616"
        secondaryLabel="查看服务与产品"
        secondaryHref={sectionLink('/services/', 'express')}
      />
      <Footnote>{SUPPORT_FOOTNOTE}</Footnote>
      {node}
    </>
  );
}
