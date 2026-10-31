import { SERVICE_TYPES, ITEMS_PER_PAGE, SERVICE_ITEM_WIDTH, SERVICE_ACTIVE_BG, serviceIcon } from './data';

/**
 * 场景服务横向轮播条（官网 .service-types-wrapper）
 *
 * 结构对齐官网：外层 overflow-hidden 只裁切轮播条本身，左右圆形箭头是外层兄弟节点，
 * 绝对定位到版心两侧（左 174 / 右 1234），避免被裁掉。
 * 每屏 5 项（项宽 196.55 = 982.75/5），共 2 屏；scrollIndex 控制 translateX。
 * 激活项：图标 51.84px 以顶部中点为原点 scale(2) 放大到 103.7px，文字标签淡出，
 * 底部浮现 service-active.png 胶囊光晕（官网 .active-bar）。
 */
type ServiceTypesProps = {
  activeIndex: number;
  scrollIndex: number;
  onSelect: (index: number) => void;
  onScrollPage: (delta: 1 | -1) => void;
};

export function ServiceTypes({ activeIndex, scrollIndex, onSelect, onScrollPage }: ServiceTypesProps) {
  const maxIndex = Math.ceil(SERVICE_TYPES.length / ITEMS_PER_PAGE) - 1;
  const canPrev = scrollIndex > 0;
  const canNext = scrollIndex < maxIndex;

  return (
    <div className="relative h-[122.39px]">
      <div className="h-full overflow-hidden">
        <div
          className="flex pb-[8.64px] transition-transform duration-300"
          style={{
            // 官网 serviceStyle：translateX(13.65 * -scrollIndex rem) = 5 项宽
            transform: `translateX(-${scrollIndex * ITEMS_PER_PAGE * SERVICE_ITEM_WIDTH}px)`,
            borderBottom: '1px solid rgba(202, 204, 213, 0.1)',
          }}
        >
          {SERVICE_TYPES.map((item, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(index)}
                className="relative flex shrink-0 basis-[196.55px] cursor-pointer flex-col items-center border-0 bg-transparent p-0 text-left"
              >
                {/* service-con：图标 + 标签（激活时标签淡出，图标放大） */}
                <span className="block w-full">
                  <img
                    src={serviceIcon(item.key)}
                    alt=""
                    className={`mx-auto block h-[51.83px] w-[51.83px] object-cover transition-transform duration-300 ${
                      active ? 'origin-top scale-[2]' : ''
                    }`}
                  />
                  <span
                    className={`block w-full px-[3.6px] text-center text-[14.4px] leading-[20.16px] text-black transition-opacity duration-300 ${
                      active ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    {item.name}
                  </span>
                </span>
                {/* active-bar：选中态底部胶囊光晕 */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-1/2 top-[59.02px] h-[64.8px] w-[158.4px] -translate-x-1/2 bg-[length:100%_100%] bg-no-repeat transition-opacity duration-300 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ backgroundImage: `url(${SERVICE_ACTIVE_BG})` }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 左右圆形箭头：官网灰色禁用态（bg rgba(0,0,0,.1) + 白色箭头） */}
      <button
        type="button"
        aria-label="上一组服务"
        onClick={() => onScrollPage(-1)}
        disabled={!canPrev}
        className="svc-scroll-btn absolute left-[-54.72px] top-[21.6px] z-[2] flex h-[31.67px] w-[31.67px] items-center justify-center rounded-full border-0 bg-black/10 text-white disabled:cursor-not-allowed"
      >
        <ChevronIcon dir="left" />
      </button>
      <button
        type="button"
        aria-label="下一组服务"
        onClick={() => onScrollPage(1)}
        disabled={!canNext}
        className="svc-scroll-btn absolute right-[-54.72px] top-[21.6px] z-[2] flex h-[31.67px] w-[31.67px] items-center justify-center rounded-full border-0 bg-black/10 text-white disabled:cursor-not-allowed"
      >
        <ChevronIcon dir="right" />
      </button>
    </div>
  );
}

/** Element UI 图标的白色尖角，按官网观感（约 7x13、圆头描边）用 SVG 复刻 */
function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      aria-hidden
      className={dir === 'left' ? 'rotate-180' : ''}
    >
      <path
        d="M4.6 2.2 9.4 7l-4.8 4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
