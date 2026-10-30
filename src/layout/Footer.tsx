import { SITE } from '@/data/site';

const FOOTER_COLUMNS = [
  {
    title: '关于京东物流',
    links: [
      { label: '企业介绍', href: '/about/#profile' },
      { label: '新闻中心', href: '/about/#news' },
      { label: '视频中心', href: '/about/#videos' },
      { label: '联系我们', href: '/about/#contact' },
    ],
  },
  {
    title: '服务与产品',
    links: [
      { label: '快递服务', href: '/services/#express' },
      { label: '快运服务', href: '/services/#freight' },
      { label: '仓配一体', href: '/services/#supplyChain' },
      { label: '冷链服务', href: '/services/#coldChain' },
    ],
  },
  {
    title: '解决方案',
    links: [
      { label: '消费品行业', href: '/solutions/#consumerGoods' },
      { label: '家电家居行业', href: '/solutions/#furnituredAppliance' },
      { label: '汽车行业', href: '/solutions/#vehicle' },
      { label: '大时尚行业', href: '/solutions/#bigFashion' },
    ],
  },
  {
    title: '客户服务',
    links: [
      { label: '运单查询', href: '/support/#track' },
      { label: '时效查询', href: '/support/#eta' },
      { label: '服务范围', href: '/support/#coverage' },
      { label: '常见问题', href: '/support/#faq' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface-2">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="mb-4 text-[15px] font-semibold text-ink">{column.title}</p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[13px] text-ink-2 transition-colors hover:text-brand">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-line md:border-l md:pl-10">
          <p className="text-[13px] text-ink-3">客服热线</p>
          <p className="text-[28px] font-bold tracking-tight text-brand">{SITE.phone}</p>
          <p className="mt-2 text-[13px] leading-6 text-ink-3">
            周一至周日 8:00-22:00
            <br />
            企业合作请邮件联系商务团队
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-6 text-[12px] leading-6 text-ink-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <p>
              © 2004-{new Date().getFullYear()} 京东物流 版权所有 · 京ICP备12031107号-1 · 京公网安备 11011302001362 号
            </p>
            <p className="max-w-[760px] text-ink-3">{SITE.disclaimer}</p>
          </div>
          <div className="flex flex-col gap-1 md:items-end">
            <p>
              复刻声明：非官方站点 · <a className="text-brand hover:underline" href="/project/">关于本项目</a>
            </p>
            <p>素材出处与原站链接见 README</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
