import { SERVICE_ICON_GROUP, serviceDetailImage, serviceHref, serviceIcon, type ServiceType } from './data';

/**
 * 场景服务详情（官网 .service-content）
 *
 * 自上而下：标题 + 描述（标题下压一条品牌粉高亮）→ 白卡（产品服务列 + 官网列表）
 * → 红色渐变「立即咨询」按钮 → 右侧溢出卡片的大图。
 *
 * 切换服务时，整块内容以 key 重新挂载，复现官网 .animate-slide-up /
 * .animate-slide-up-diagonal 的入场曲线（见 service.css）。
 */
type ServiceDetailProps = {
  service: ServiceType;
};

export function ServiceDetail({ service }: ServiceDetailProps) {
  const image = serviceDetailImage(service.key);
  const icon = serviceIcon(service.key);
  // 产品列表：官网 display:grid + 列向填充（固定 5 行）。
  // 快递快运 9 项 → 自动排成两列；其余服务 3 项 → 自然只占第一列。
  const listGridStyle = {
    gridAutoFlow: 'column' as const,
    gridTemplateRows: 'repeat(5, minmax(0, max-content))',
    columnGap: 28.8,
    rowGap: 7.2,
  };

  return (
    <div className="relative">
      {/* key = 服务 key：切换时重挂载，触发入场动画 */}
      <div key={service.key}>
        <div className="svc-title-highlight svc-detail-title-block svc-anim relative w-[633.59px] max-w-full pl-[12.24px]">
          <h2 className="relative z-[1] text-[23.04px] font-semibold leading-[32.4px] text-[#23252b]">
            <a href={serviceHref(service.link)} className="transition-colors hover:text-brand">
              {service.name}
            </a>
          </h2>
          <p className="svc-detail-desc mt-[9.36px] line-clamp-2 w-[432px] max-w-[432px] text-[11.52px] leading-[17.28px] text-ink-3">
            {service.description}
          </p>
        </div>

        <div className="svc-card svc-anim svc-anim-delay relative mt-[14.4px] flex min-h-[175.68px] w-[731.52px] max-w-full items-center rounded-[14.4px] border-[0.72px] border-white/30 bg-white/[0.53] px-[1.44px] py-[21.6px] shadow-[0_11.52px_7.92px_rgba(0,0,0,0.02)]">
          <div className="w-[508.64px] max-w-full">
            <div className="flex items-center">
              {/* 产品服务：图标 + 名称，右侧一条 0.72px 竖分隔线 */}
              <div className="svc-card-header relative pl-[36px] pr-[28.8px]">
                <div className="relative z-[1] flex flex-col items-center">
                  <span
                    className="mb-[2.88px] block h-[18.72px] w-[18.72px] bg-[length:100%_100%] bg-no-repeat"
                    style={{ backgroundImage: `url(${SERVICE_ICON_GROUP})` }}
                  />
                  <h3 className="text-center text-[14.4px] font-semibold leading-[20.16px] text-black">产品服务</h3>
                </div>
              </div>

              {/* 产品列表：官网 display:grid + 列向填充（5 行），列宽 86.4、列间距 28.8、行距 7.2 */}
              <div className="svc-service-list grid pl-[21.6px]" style={listGridStyle}>
                {service.products.map((product) =>
                  product.isTitle ? (
                    <div
                      key={`title-${product.title}`}
                      className="min-w-[86.4px] text-[11.52px] font-black leading-[14.4px] text-[#23252b]"
                    >
                      {product.title}
                    </div>
                  ) : (
                    <a
                      key={`${product.title}-${product.link}`}
                      href={serviceHref(product.link ?? '/services/')}
                      className="min-w-[86.4px] text-[11.52px] leading-[14.4px] text-ink-2 transition-colors hover:text-brand"
                    >
                      {product.title}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <a
          href={serviceHref(service.cooperationUrl)}
          className="svc-anim svc-anim-delay ml-[38.88px] mt-[21.6px] flex h-[40.31px] w-[125.28px] items-center justify-center gap-0 rounded-[20.16px] bg-brand-gradient text-[12.96px] font-semibold leading-[12.96px] text-white shadow-[0_11.52px_7.2px_rgba(0,0,0,0.06)] transition-opacity hover:opacity-90"
        >
          <span>立即咨询</span>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden className="ml-[1.44px]">
            <path
              d="M4.6 1.9 9.4 6.5l-4.8 4.6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {image ? (
          // 快递快运：官网 v4 卡车大图，绝对定位溢出白卡右侧
          <img
            src={image}
            alt=""
            aria-hidden
            className="svc-image svc-anim-diagonal pointer-events-none absolute right-[-48.24px] top-[-26.64px] z-[1] h-[360px] w-[561.59px] object-cover"
          />
        ) : (
          // 其余服务素材库暂无实拍图：用该服务 line 图标放大做插画兜底（避免使用不对应的图）
          <div
            aria-hidden
            className="svc-image svc-anim-diagonal pointer-events-none absolute right-[-48.24px] top-[-26.64px] z-[1] flex h-[360px] w-[561.59px] items-center justify-center"
            style={{
              backgroundImage: 'radial-gradient(closest-side, rgba(254, 121, 104, 0.16), rgba(254, 121, 104, 0))',
            }}
          >
            <img src={icon} alt="" className="block h-[260px] w-[260px] object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}
