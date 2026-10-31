import { SITE } from '@/data/site';
import { asset } from '@/lib/assets';
import { link } from '@/lib/links';

/**
 * 页脚 = 联系我们条（151px）+ 页脚主体（297px），实测：
 * - 联系我们：背景 #23252B，标题 12.96px，电话 36px JDZhengHT，右侧三个联系图标 26x26
 * - 页脚主体：6 列链接（列间距 97px，列标题 17.28px fw600 白色，子链接 13.44px 70% 白）
 *   + 资质徽标条（953x53）+ 底部备案条（36px，10% 白底）
 * 官网无「非官方」声明，本站按甲方要求追加简短声明与项目说明入口。
 */

const CONTACT_ICONS = [
  { icon: 'contact/icon-wechat.png', label: '微信公众号' },
  { icon: 'contact/icon-miniprogram.png', label: '小程序' },
  { icon: 'contact/icon-qiwei.png', label: '企业微信' },
];

const LINK_COLUMNS = [
  {
    title: '更多推荐',
    links: [
      { label: '京东服务', href: '/services/' },
      { label: '最新资讯', href: '/about/#news' },
      { label: '航空业务合作', href: '/services/#fullCargo' },
      { label: '商家优惠通道', href: '/support/#merchant' },
    ],
  },
  {
    title: '便捷入口',
    links: [
      { label: '商家工作台', href: '/support/#login' },
      { label: '电子合同签约', href: '/support/#merchant' },
      { label: '意见反馈', href: '/support/#contact' },
    ],
  },
  {
    title: '服务支持',
    links: [
      { label: '寄快递', href: '/services/#express' },
      { label: '查快递', href: '/support/#track' },
      { label: '服务范围查询', href: '/support/#coverage' },
      { label: '服务细则', href: '/support/#faq' },
      { label: '物流合作', href: '/support/#contact' },
    ],
  },
  {
    title: '可持续发展',
    links: [
      { label: 'ESG', href: '/esg/#esg' },
      { label: '碳足迹计算', href: '/esg/#green' },
    ],
  },
  {
    title: '关于我们',
    links: [
      { label: '公司介绍', href: '/about/#profile' },
      { label: '新闻公告', href: '/about/#news' },
      { label: '投资者关系', href: '/about/#investor' },
      { label: '联系我们', href: '/about/#contact' },
      { label: '政企合作', href: '/about/#group' },
    ],
  },
  {
    title: '友情链接',
    links: [{ label: '德邦快递', href: '/about/#group' }],
  },
];

export function Footer() {
  return (
    <>
      {/* 联系我们条 */}
      <section data-section="contact" className="relative h-auto w-full bg-dark py-8 lg:h-[151px] lg:py-0">
        <div className="container-page pt-0 lg:pt-[43px]" data-qa="contact">
          <p className="text-[12.96px] leading-[18px] text-white">联系我们</p>
          <div className="mt-[12px] flex h-[36px] items-center" data-qa="contact-row">
            <img src={asset('contact/tel.png')} alt="客服电话" className="mr-[9px] h-[24px] w-[24px]" />
            <span className="font-num text-[36px] leading-[36px] text-white">950616</span>
            <div className="ml-[31px] flex items-center gap-[16px]">
              {CONTACT_ICONS.map((item) => (
                <img
                  key={item.label}
                  src={asset(item.icon)}
                  alt={item.label}
                  title={item.label}
                  className="h-[26px] w-[26px] cursor-pointer transition-opacity hover:opacity-80"
                />
              ))}
            </div>
          </div>
        </div>
        {/* 与页脚主体之间的分隔线（实测容器宽度、位于联系我们条底部上方 15px） */}
        <div className="absolute inset-x-0 bottom-[15px]">
          <div className="container-page h-px bg-white/10" />
        </div>
      </section>

      {/* 页脚主体 */}
      <footer data-section="footer" className="h-auto w-full bg-dark lg:h-[297px]">
        <div className="container-page px-[14.4px] pt-[20px]">
          <div className="flex flex-wrap gap-x-[32px] gap-y-[18px] lg:h-[188px] lg:gap-[97px]">
            {LINK_COLUMNS.map((column, columnIndex) => (
              <div key={column.title} className="shrink-0" data-qa={`footer-col-${columnIndex}`}>
                <p className="text-[17.28px] font-semibold leading-[25.92px] text-white">{column.title}</p>
                <ul className="mt-[16px] space-y-[15.5px] text-[13.44px] leading-[13.44px]">
                  {column.links.map((item) => (
                    <li key={item.label}>
                      <a
                        href={link(item.href)}
                        className="block whitespace-nowrap text-[13.44px] leading-[13.44px] text-white/70 transition-colors hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 资质徽标条：官网由多张图片组成，这里用元素级截图保持像素一致 */}
          <img
            data-qa="footer-badges"
            src={asset('footer/badges.png')}
            alt="资质与备案徽标"
            className="h-[53px] w-[953px] object-cover"
          />
        </div>

        {/* 底部备案条：官方文案 + 复刻声明 + 项目说明入口 */}
        <div className="flex min-h-[36px] w-full flex-wrap items-center justify-center gap-x-[10px] gap-y-1 px-4 py-2 text-center text-[13.44px] leading-[22.85px] text-white/60 lg:h-[36px] lg:flex-nowrap lg:py-0">
          <span>2004-{new Date().getFullYear()}@京东物流版权所有</span>
          <a href={link('/about/#investor')} className="transition-colors hover:text-white">
            投资者关系
          </a>
          <span>Investor Relations</span>
          <a href={link('/support/#faq')} className="transition-colors hover:text-white">
            服务细则
          </a>
          <span>个人信息保护规则</span>
          <span>营业执照</span>
          <span>京公网安备11011502005548号</span>
          <span>增值电信业务经营许可证：京ICP备20010510号-7</span>
          <span className="text-white/40">·</span>
          <span className="text-white/50">非官方复刻 · 仅供学习演示</span>
          <a href={link('/project/')} className="text-white/70 underline-offset-2 transition-colors hover:text-white hover:underline">
            关于本项目
          </a>
        </div>
        <p className="sr-only">{SITE.disclaimer}</p>
      </footer>
    </>
  );
}
