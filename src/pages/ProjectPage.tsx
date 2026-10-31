import { SITE } from '@/data/site';
import { link } from '@/lib/links';

/**
 * 关于本项目：向评审展示「复刻是怎么被工程化做出来的」。
 * 内容 = 项目概览 + 还原方法论 + 技术架构 + 素材版权 + 已知边界 + 分工。
 */
const ONLINE_URL = 'https://naruto7.github.io/jdl-logistics-clone/';
const REPO_URL = 'https://github.com/naruto7/jdl-logistics-clone';

const FACTS = [
  { value: '3099', unit: 'px', label: '首页文档总高度（与官网一致）' },
  { value: '322', unit: '项', label: '参考站元素级测量（rect + 计算样式）' },
  { value: '8', unit: '个', label: '区块 y/高度零偏差对齐' },
  { value: '75', unit: '份', label: '官网素材入库（图/视频/字体）' },
];

const STEPS = [
  {
    step: '01',
    title: '环境侦察',
    detail:
      '先量清工具链与网络边界：本机 github.com:443 不可达、api.github.com 与 Pages CDN 可达，因此设计「REST API 发布」链路而非 git push；Chrome 无头模式用于截图与探针。',
  },
  {
    step: '02',
    title: '参考站探针',
    detail:
      '用 puppeteer 打开 www.jdl.com，按 1440×900 视口采集 DOM、计算样式、文案、素材 URL：322 个元素 rect、85 条排版记录、61 个图片/背景、8 个 @font-face，沉淀为 spec/。',
  },
  {
    step: '03',
    title: '规格化',
    detail:
      '把探针数据提炼成唯一事实源 spec/home-spec.json + spec/key-rects.json：区块高度链、版心 982px、字号阶梯、主色 #FC3737、按钮/卡片样式，组件只消费规格不靠目测。',
  },
  {
    step: '04',
    title: '像素校准',
    detail:
      '实现后逐屏截图与官网参照图做像素比对（tools/qa/compare.mjs 输出差异率与差异图），配合关键元素 rect 比对（±2px 判定），迭代收敛而非一次性交付。',
  },
];

const STACK = [
  ['构建', 'Vite 7 · 多页入口（MPA）'],
  ['框架', 'React 19 + TypeScript（strict）'],
  ['样式', 'Tailwind CSS 4（设计令牌驱动）'],
  ['交互', '原生 hooks + CSS 动画（无第三方 UI 库）'],
  ['数据', '数据驱动：内容与组件分离'],
  ['发布', 'GitHub Pages · Git Data API 直推'],
];

const BOUNDARIES = [
  ['首屏视频帧', '官网首屏为动态视频，逐帧截图比对时只有该区域存在固有差异。'],
  ['hover 态', '导航 mega menu 与卡片 hover 已实现，但与官网的过渡曲线存在细微差异。'],
  ['内页深度', '5 个一级栏目为中等还原（结构 + 设计语言一致），未逐页做像素级复刻。'],
  ['移动端', '按约定 PC 1440 为主战场，移动端保证不崩、不做精细适配。'],
];

const ROLES = [
  ['Lead', '架构与地基、设计令牌、Header/Hero/Footer、规格与 QA 工具、集成与发布、验收'],
  ['recon-scout', '参考站侦察：截图、DOM、计算样式、文案、素材包、侦察报告'],
  ['builder-service', '面向丰富场景的物流服务 + 快递快运服务卡（轮播/联动）'],
  ['builder-industry', '热门行业解决方案（行业 tab 切换 + 背景切换）'],
  ['builder-network', '物流网络（数字滚动 + 特性圆钮 + 地球背景）'],
  ['builder-news', '新闻动态（新闻卡片 + 更多卡）'],
  ['builder-pages', '5 个一级栏目落地页（内容抓取 + 锚点体系）'],
];

export function ProjectPage() {
  return (
    <div className="bg-white">
      {/* 头图 */}
      <section className="relative overflow-hidden bg-dark">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'radial-gradient(900px 420px at 15% 0%, rgba(252,55,55,0.35), transparent 60%), radial-gradient(700px 380px at 85% 20%, rgba(254,121,104,0.25), transparent 65%)',
          }}
        />
        <div className="container-page relative py-[72px]">
          <p className="text-[13px] tracking-[3px] text-white/60">JDL LOGISTICS · VIBE CODING CLONE</p>
          <h1 className="mt-4 font-display text-[44px] leading-[1.2] text-white">关于本项目</h1>
          <p className="mt-4 max-w-[720px] text-[15px] leading-[1.9] text-white/70">
            本站是借助 Vibe Coding 完成的学习演示项目：以京东物流官方网站（www.jdl.com）为蓝本做前端复刻，
            用于展示「用 AI 辅助完成一个高还原度站点」的完整工程方法——从环境侦察、参考站测量、规格化，
            到多智能体并行实现、像素级校准与自动发布。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={ONLINE_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-brand-gradient h-[44px] rounded-full px-[26px] text-[14px] leading-[44px] font-medium text-white shadow-[0_10px_24px_rgba(252,55,55,0.35)] transition-transform hover:-translate-y-[1px]"
            >
              访问站点
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="h-[44px] rounded-full border border-white/30 px-[26px] text-[14px] leading-[44px] text-white/90 transition-colors hover:border-white/70 hover:text-white"
            >
              查看源码
            </a>
            <span className="ml-1 rounded-full border border-white/20 px-3 py-1 text-[12px] text-white/60">
              非官方 · 仅供学习演示
            </span>
          </div>
        </div>
      </section>

      {/* 关键数字 */}
      <section className="border-b border-line bg-surface">
        <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <p className="font-num text-[34px] leading-none text-brand">
                {fact.value}
                <span className="ml-1 text-[14px] text-ink-2">{fact.unit}</span>
              </p>
              <p className="mt-2 text-[12.5px] leading-[1.6] text-ink-3">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 还原方法论 */}
      <section className="container-page py-16">
        <SectionTitle en="METHOD" title="还原方法论：测量驱动，而不是目测" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {STEPS.map((step) => (
            <article key={step.step} className="rounded-[14px] border border-line p-6 transition-shadow hover:shadow-card">
              <p className="font-num text-[13px] tracking-[2px] text-brand">{step.step}</p>
              <h3 className="mt-2 text-[18px] font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.9] text-ink-2">{step.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-[14px] bg-surface px-6 py-5 text-[13px] leading-[1.9] text-ink-2">
          复现命令：
          <code className="mx-1 rounded bg-white px-2 py-0.5 text-[12px] text-brand">node tools/spec/probe.mjs</code>
          （采集官网元素）→
          <code className="mx-1 rounded bg-white px-2 py-0.5 text-[12px] text-brand">node tools/qa/measure.mjs</code>
          （区块对齐）→
          <code className="mx-1 rounded bg-white px-2 py-0.5 text-[12px] text-brand">node tools/qa/compare.mjs</code>
          （像素比对）
        </div>
      </section>

      {/* 技术架构 */}
      <section className="bg-surface py-16">
        <div className="container-page">
          <SectionTitle en="ARCHITECTURE" title="技术架构" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="overflow-hidden rounded-[14px] border border-line bg-white">
              {STACK.map(([key, value], index) => (
                <div
                  key={key}
                  className={`flex items-center gap-6 px-6 py-4 text-[13.5px] ${index ? 'border-t border-line' : ''}`}
                >
                  <span className="w-[52px] shrink-0 text-ink-3">{key}</span>
                  <span className="text-ink">{value}</span>
                </div>
              ))}
            </div>
            <div className="rounded-[14px] border border-line bg-white p-6">
              <p className="text-[13px] font-semibold text-ink">目录结构（节选）</p>
              <pre className="mt-3 overflow-x-auto text-[12px] leading-[1.9] text-ink-2">{`src/
├─ assets/        官网真实素材（含 manifest 出处）
├─ components/    通用组件（雪碧图动画等）
├─ data/          内容数据与导航结构（数据驱动）
├─ layout/        Header / Footer / 悬浮客服
├─ lib/           资源解析、链接 base 解析
├─ pages/         7 个页面入口
├─ sections/      首页区块 + 内页区块
└─ styles/        设计令牌（@theme）
spec/             参考站测量规格（唯一事实源）
tools/            探针 / 规格提取 / 素材抓取 / QA
docs/             Vibe Coding 过程与素材出处`}</pre>
            </div>
          </div>
          <div className="mt-6 rounded-[14px] border border-line bg-white p-6 text-[13.5px] leading-[1.9] text-ink-2">
            <p className="mb-2 text-[13px] font-semibold text-ink">发布链路：为什么不是 git push</p>
            本机网络对 <code className="rounded bg-surface px-1.5 py-0.5 text-[12px]">github.com:443</code> 不可达，
            但 <code className="rounded bg-surface px-1.5 py-0.5 text-[12px]">api.github.com</code> 可达。
            因此发布器走 GitHub REST 的 Git Data API：
            <span className="text-ink">上传 blob → 建 tree → 建 commit → 移动 ref → 触发 Pages 构建</span>，
            与推送 gh-pages 分支产物完全等价；源码另走同一条通道同步到 main 分支，保证仓库可审阅。
          </div>
        </div>
      </section>

      {/* 素材与版权 */}
      <section className="container-page py-16">
        <SectionTitle en="ASSETS" title="素材与版权声明" />
        <div className="mt-6 rounded-[14px] border border-line p-6 text-[13.5px] leading-[1.95] text-ink-2">
          <p>
            页面文案、图片、Logo、品牌字体等素材均来自京东物流官方网站（
            <a href="https://www.jdl.com/" target="_blank" rel="noreferrer" className="text-brand hover:underline">
              www.jdl.com
            </a>
            ），版权归京东物流（京东集团）所有。本项目仅作学习与技术演示用途，不含任何商业目的；如权利人认为不妥，可联系删除。
          </p>
          <p className="mt-3">
            每个素材文件的原始 URL 与用途记录在仓库的
            <a
              href={`${REPO_URL}/blob/main/docs/ATTRIBUTION.md`}
              target="_blank"
              rel="noreferrer"
              className="mx-1 text-brand hover:underline"
            >
              docs/ATTRIBUTION.md
            </a>
            （由工具自动核对 src/assets 生成）。
          </p>
          <p className="mt-3 text-[12.5px] text-ink-3">
            本站为非官方站点，与京东物流无任何隶属关系；页面中的运单查询等交互均为前端演示数据，不会请求任何官方接口。
          </p>
        </div>
      </section>

      {/* 已知边界 */}
      <section className="bg-surface py-16">
        <div className="container-page">
          <SectionTitle en="BOUNDARIES" title="已知差异与边界（诚实披露）" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {BOUNDARIES.map(([title, detail]) => (
              <div key={title} className="rounded-[12px] border border-line bg-white p-5">
                <p className="text-[14px] font-semibold text-ink">{title}</p>
                <p className="mt-1.5 text-[13px] leading-[1.85] text-ink-2">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 分工 */}
      <section className="container-page py-16">
        <SectionTitle en="TEAM" title="Vibe Coding 分工：多智能体并行" />
        <div className="mt-8 overflow-hidden rounded-[14px] border border-line">
          {ROLES.map(([role, duty], index) => (
            <div
              key={role}
              className={`flex flex-col gap-1 px-6 py-4 md:flex-row md:items-center md:gap-8 ${index ? 'border-t border-line' : ''}`}
            >
              <span className="w-[140px] shrink-0 font-num text-[13px] text-brand">{role}</span>
              <span className="text-[13px] leading-[1.8] text-ink-2">{duty}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13px] leading-[1.9] text-ink-3">{SITE.disclaimer}</p>
        <a
          href={link('/')}
          className="mt-6 inline-flex h-[40px] items-center rounded-full border border-line px-6 text-[13.5px] text-ink transition-colors hover:border-brand hover:text-brand"
        >
          ← 返回首页
        </a>
      </section>
    </div>
  );
}

function SectionTitle({ en, title }: { en: string; title: string }) {
  return (
    <div>
      <p className="text-[12px] tracking-[3px] text-ink-3">{en}</p>
      <h2 className="mt-2 font-display text-[26px] leading-[1.3] text-ink">{title}</h2>
    </div>
  );
}
