import {
  SERVICES_FOOTNOTE,
  SERVICES_HERO,
  SERVICES_NAV,
  SERVICE_GROUPS,
} from '@/data/inner/services';
import { sectionLink } from '@/lib/links';
import { PageHero } from '@/sections/inner/PageHero';
import { PageNav } from '@/sections/inner/PageNav';
import { useAnchorScroll } from '@/sections/inner/useAnchorScroll';
import {
  AnchorCard,
  AnchorSection,
  Container,
  CtaBand,
  Footnote,
  MediaCard,
  PillLink,
  SectionHead,
  StatStrip,
} from '@/sections/inner/primitives';

/** 寄件/入仓的通用履约流程（官网各产品页共用同一套链路） */
const SERVICE_PROCESS = [
  { step: '01', title: '在线下单', desc: '官网、小程序、商家工作台或开放平台下单，支持预约上门时间。' },
  { step: '02', title: '上门揽收', desc: '快递最快 1 小时上门，快运 2 小时上门，大件支持约时送装。' },
  { step: '03', title: '转运分拨', desc: '遍布全国的转运中心与卡班网络衔接，全链路节点可追踪。' },
  { step: '04', title: '派送签收', desc: '送货上门、智能自提、送装一体，末端按约交付。' },
];

/** 选择理由（取自官网各组网络与能力描述） */
const WHY_JDL = [
  {
    title: '六大网络协同',
    desc: '仓储网络、综合运输网络、最后一公里配送网络、大件网络、冷链物流网络与跨境物流网络高度协同。',
  },
  {
    title: '技术驱动',
    desc: '自主研发软件系统与核心智能设备，算法优化、数据分析与系统仿真能力贯穿仓运配全链路。',
  },
  {
    title: '服务保障',
    desc: '全国统一客服热线 950616，售前、售中、售后专业团队；电商物流行业领先的服务标准体系。',
  },
];

/** 按条目数量决定栅格密度（版心 982px） */
function gridClass(count: number): string {
  if (count >= 6) return 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3';
  if (count >= 4) return 'grid gap-5 sm:grid-cols-2 lg:grid-cols-4';
  return 'grid gap-5 md:grid-cols-2';
}

export function ServicesPage() {
  useAnchorScroll();

  return (
    <>
      <PageHero content={SERVICES_HERO} />
      <PageNav items={SERVICES_NAV} />

      {/* 履约流程 + 为什么选择京东物流 */}
      <section className="bg-white pb-[20px] pt-[64px]">
        <Container>
          <SectionHead
            eyebrow="服务流程"
            title="从下单到签收，一条链路跑通"
            desc="企业服务与个人服务共用同一张物流网络，只是产品时效、计费方式与增值服务不同。"
            action={<PillLink href={sectionLink('/support/', 'contact')}>咨询定制方案</PillLink>}
          />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_PROCESS.map((item) => (
              <li
                key={item.step}
                className="relative rounded-xl border border-line bg-white p-6 shadow-[0_6px_20px_rgba(26,26,26,0.04)]"
              >
                <span className="font-num text-[30px] leading-none text-brand/20">{item.step}</span>
                <p className="mt-3 text-[16px] font-semibold text-ink">{item.title}</p>
                <p className="mt-2 text-[13px] leading-6 text-ink-2">{item.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-white py-[48px]">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {WHY_JDL.map((item) => (
              <div key={item.title} className="rounded-xl bg-surface p-6">
                <p className="flex items-center gap-2 text-[16px] font-semibold text-ink">
                  <span className="h-4 w-1 rounded-full bg-brand" aria-hidden />
                  {item.title}
                </p>
                <p className="mt-3 text-[13px] leading-6 text-ink-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 22 个服务锚点：5 个分组区块，每个服务一张可定位的卡片 */}
      {SERVICE_GROUPS.map((group, index) => (
        <AnchorSection
          key={group.id}
          id={group.id}
          eyebrow={`服务与产品 · ${String(index + 1).padStart(2, '0')}`}
          title={group.title}
          desc={group.subtitle}
          tone={index % 2 === 0 ? 'surface' : 'white'}
        >
          <div className={gridClass(group.items.length)}>
            {group.items.map((item) => (
              <AnchorCard key={item.id} id={item.id}>
                <MediaCard
                  image={item.image}
                  title={item.name}
                  tag={item.tag}
                  desc={item.desc}
                  points={item.points}
                  metric={item.metric}
                  actionHref={sectionLink('/support/', 'contact')}
                  actionLabel="咨询该服务"
                />
              </AnchorCard>
            ))}
          </div>
        </AnchorSection>
      ))}

      {/* 网络能力数据条 */}
      <AnchorSection
        id="service-network"
        eyebrow="服务底座"
        title="覆盖全国、连接全球的物流网络"
        desc="上述服务共享同一套基础设施：仓、运、配与末端网络。"
        tone="dark"
      >
        <StatStrip stats={SERVICES_HERO.stats ?? []} invert className="mt-2" />
        <p className="mt-8 text-[12.5px] leading-6 text-white/50">
          数据为官网公开口径：仓库数量超 3600 个、仓库总管理面积超 3400 万平方米、海外仓覆盖全球 25 个国家和地区。
        </p>
      </AnchorSection>

      <CtaBand
        title="不确定该用哪个产品？"
        desc="告诉我们货量、时效与目的地，京东物流顾问会给出组合方案；个人寄件可直接在官网或小程序下单。"
        primaryLabel="咨询物流顾问"
        primaryHref={sectionLink('/support/', 'contact')}
        secondaryLabel="查看常见问题"
        secondaryHref={sectionLink('/support/', 'faq')}
      />
      <Footnote>{SERVICES_FOOTNOTE}</Footnote>
    </>
  );
}
