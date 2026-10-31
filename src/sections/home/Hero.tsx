import { useState } from 'react';
import { AnimatedIcon } from '@/components/AnimatedIcon';
import { asset } from '@/lib/assets';
import { link } from '@/lib/links';

/** 快捷入口：4 个（实测每个 162x92，图标 63x63 逐帧雪碧图） */
const QUICK_ENTRIES = [
  { label: '我要寄件', icon: 'search/icon-send.png', tag: '寄多件更方便' },
  { label: '运费&时效查询', icon: 'search/icon-aging.png', tag: '' },
  { label: '服务范围', icon: 'search/icon-range.png', tag: '' },
  { label: '网点查询', icon: 'search/icon-network.png', tag: '' },
];

/**
 * 首屏：视频主视觉 + 标题文案 + 运单查询浮层。
 *
 * 参考实测（1440x900）：
 * - banner 区：头部下方 y=100，高 446
 * - 标题两行：x=101, y=227 起，37.44px/56.16 行高，#1A1A1A
 * - 查询浮层：(229,483,982,115)：红色运单卡 324x115 + 9px 间隙 + 白色快捷卡 649x115
 * - 运单卡内部：白色输入胶囊 (26,37,272,40)，按钮 91x33 贴右
 */
export function Hero() {
  const [waybill, setWaybill] = useState('');
  const [result, setResult] = useState<string | null>(null);

  /** 运单查询为纯前端演示：只做格式校验与示例结果，不请求任何外部接口 */
  const handleSearch = () => {
    const value = waybill.trim();
    if (!value) {
      setResult('请输入运单号或包裹号');
      return;
    }
    if (!/^[A-Za-z0-9-]{6,30}$/.test(value)) {
      setResult('运单号格式不正确，示例：JD0123456789');
      return;
    }
    setResult(`运单 ${value} 正在派送中 · 预计今日 18:00 前送达（演示数据）`);
  };

  return (
    <section data-section="banner" className="relative h-[446px] w-full">
      {/* 主视觉：官网同款首屏动画视频（裁剪只作用在视频容器，查询浮层需压住下一区块） */}
      <div className="absolute inset-x-0 top-0 h-[446px] overflow-hidden">
        <video
          className="h-full w-full object-cover"
          src={asset('banner/hero-video.mp4')}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
      </div>

      {/* 主标题文案（移动端缩小并靠左，桌面端严格对齐官网实测坐标） */}
      <div className="pointer-events-none absolute left-[24px] top-[86px] z-10 select-none lg:left-[101px] lg:top-[127px]">
        <p data-qa="hero-title" className="text-[24px] font-semibold leading-[36px] text-ink lg:text-[37.44px] lg:leading-[56.16px]">
          助力企业降本增效
        </p>
        <p className="text-[24px] font-semibold leading-[36px] text-ink lg:text-[37.44px] lg:leading-[56.16px]">
          一体化供应链解决方案专家
        </p>
      </div>

      {/* 运单查询 + 快捷入口浮层 */}
      <div
        data-section="search"
        data-qa="search"
        className="absolute left-1/2 top-[268px] z-20 flex h-[115px] w-[982px] max-w-[calc(100%-32px)] -translate-x-1/2 lg:top-[383px] lg:max-w-[calc(100%-48px)]"
      >
        {/* 红色运单查询卡 */}
        <div
          data-qa="search-card"
          className="relative h-[115px] w-[324px] max-w-full shrink-0 rounded-[14.4px]"
          style={{ backgroundImage: 'linear-gradient(155.87deg, #fe7968, #fc3737)' }}
        >
          <div
            data-qa="search-input"
            className="absolute left-[26px] top-[37px] flex h-[40px] w-[272px] items-center rounded-full bg-white pl-[13px]"
          >
            <img src={asset('ui/icon-search.png')} alt="" className="mr-[6px] h-[17px] w-[17px]" />
            <input
              value={waybill}
              onChange={(event) => {
                setWaybill(event.target.value);
                setResult(null);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleSearch();
              }}
              placeholder="请输入运单号或包裹号"
              aria-label="运单号或包裹号"
              className="h-full min-w-0 flex-1 bg-transparent text-[14.4px] text-ink outline-none placeholder:text-[#9aa0aa]"
            />
            <button
              type="button"
              data-qa="search-btn"
              onClick={handleSearch}
              className="absolute right-0 top-[3.5px] h-[33px] w-[91px] rounded-full text-[14.4px] font-medium text-white"
              style={{ backgroundImage: 'linear-gradient(149.03deg, #fe7968, #fc3737)' }}
            >
              查快递
            </button>
          </div>
          {result ? (
            <p className="absolute left-[26px] top-[82px] w-[272px] truncate text-[11.5px] leading-[16px] text-white/95">
              {result}
            </p>
          ) : null}
        </div>

        {/* 白色快捷入口卡（移动端隐藏，避免固定宽度溢出） */}
        <div
          data-qa="quick-wrap"
          className="ml-[9px] hidden h-[115px] w-[649px] rounded-[14.4px] bg-white/90 shadow-[0_11.52px_7.92px_rgba(0,0,0,0.02)] backdrop-blur-sm lg:block"
          style={{ backgroundImage: `url(${asset('search/second-top-bg.png')})`, backgroundSize: 'cover' }}
        >
          <div className="flex h-full items-start pt-[11px]">
            {QUICK_ENTRIES.map((entry, index) => (
              <a
                key={entry.label}
                data-qa={`quick-${index}`}
                href={link('/support/#track')}
                className="group relative flex h-[92px] w-[162px] flex-col items-center justify-center gap-[4px]"
              >
                {entry.tag ? (
                  <span
                    className="absolute left-[97px] top-[-3px] whitespace-nowrap rounded-[10px_10px_10px_2px] px-[4px] text-[7.92px] font-semibold leading-[16px] text-white"
                    style={{ backgroundImage: 'linear-gradient(155.87deg, #fe7968, #fc3737)' }}
                  >
                    {entry.tag}
                  </span>
                ) : null}
                <AnimatedIcon src={asset(entry.icon)} displaySize={63} />
                <span className="text-[14.4px] font-semibold leading-[20.16px] text-[#23252b]">{entry.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
