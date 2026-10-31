import {
  ABOUT_CONTACT,
  ABOUT_FOOTNOTE,
  ABOUT_HERO,
  ABOUT_NAV,
  ABOUT_QRCODES,
  GROUP_SITES,
  HONORS,
  INVESTOR_INFO,
  JOBS_INFO,
  LANGS,
  MISSION_VISION,
  NEWS_ITEMS,
  PROFILE_PARAGRAPHS,
  PROFILE_STATS,
  TIMELINE,
  VIDEOS_OFFICIAL_URL,
  VIDEO_ITEMS,
} from '@/data/inner/about';
import heroVideo from '@/assets/banner/hero-video.mp4';
import { asset } from '@/lib/assets';
import { link, sectionLink } from '@/lib/links';
import { PageHero } from '@/sections/inner/PageHero';
import { PageNav } from '@/sections/inner/PageNav';
import { useAnchorScroll } from '@/sections/inner/useAnchorScroll';
import {
  AnchorSection,
  CtaBand,
  Footnote,
  PillLink,
  SectionHead,
  StatStrip,
  useNotice,
} from '@/sections/inner/primitives';

export function AboutPage() {
  useAnchorScroll();
  const { notify, node } = useNotice();
  const poster = asset('inner/about/video-thumb-a');

  return (
    <>
      <PageHero content={ABOUT_HERO} />
      <PageNav items={ABOUT_NAV} />

      {/* #profile 企业介绍 */}
      <AnchorSection
        id="profile"
        eyebrow="企业介绍"
        title="中国领先的技术驱动的供应链解决方案及物流服务商"
        desc="以「技术驱动，引领全球高效流通和可持续发展」为使命，致力于成为全球最值得信赖的供应链基础设施服务商。"
        tone="white"
      >
        <div className="grid gap-10 md:grid-cols-[1.15fr_1fr]">
          <div>
            {PROFILE_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 12)} className="mt-4 text-[14px] leading-8 text-ink-2 first:mt-0">
                {paragraph}
              </p>
            ))}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {MISSION_VISION.map((item) => (
                <div key={item.label} className="rounded-xl bg-surface p-4">
                  <p className="text-[12px] text-brand">{item.label}</p>
                  <p className="mt-2 text-[13px] font-medium leading-6 text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-line bg-white p-6 shadow-[0_6px_20px_rgba(26,26,26,0.05)]">
            <p className="text-[14px] font-semibold text-ink">关键数据</p>
            <StatStrip stats={PROFILE_STATS} className="mt-4 grid-cols-2 md:grid-cols-2" />
            <p className="mt-5 border-t border-line pt-4 text-[12px] leading-5 text-ink-3">
              数据来自京东物流官网公开口径；仓库数量与仓储面积随业务发展持续更新。
            </p>
          </div>
        </div>

        {/* 公司历程 */}
        <div className="mt-14">
          <SectionHead eyebrow="公司历程" title="从自建物流到一体化供应链" />
          <ol className="mt-8 space-y-4">
            {TIMELINE.map((item, index) => {
              const image = item.image ? asset(item.image) : '';
              return (
                <li
                  key={`${item.date}-${item.title}`}
                  className="grid gap-5 rounded-xl border border-line bg-white p-5 md:grid-cols-[120px_1fr] md:items-center"
                >
                  <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1">
                    <span className="font-num text-[22px] leading-none text-brand">{item.date}</span>
                    <span className="text-[11.5px] text-ink-3">{index === 0 ? '起点' : `第 ${index + 1} 阶段`}</span>
                  </div>
                  <div className={image ? 'md:grid md:grid-cols-[1fr_220px] md:items-center md:gap-6' : ''}>
                    <div>
                      <p className="text-[15px] font-semibold text-ink">{item.title}</p>
                      <p className="mt-1.5 text-[13px] leading-6 text-ink-2">{item.desc}</p>
                    </div>
                    {image ? (
                      <img
                        src={image}
                        alt={item.title}
                        loading="lazy"
                        className="mt-4 h-[120px] w-full rounded-lg object-cover md:mt-0"
                      />
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* 企业荣誉 */}
        <div className="mt-12 rounded-xl bg-surface p-6">
          <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
            <span className="h-4 w-1 rounded-full bg-brand" aria-hidden />
            企业荣誉与认可
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {HONORS.map((honor) => (
              <li key={honor} className="flex gap-2.5 rounded-lg bg-white px-4 py-3 text-[13px] leading-6 text-ink-2">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                {honor}
              </li>
            ))}
          </ul>
        </div>
      </AnchorSection>

      {/* #news 新闻中心 */}
      <AnchorSection
        id="news"
        eyebrow="新闻中心"
        title="了解京东物流最新资讯"
        desc="公司动态、可持续发展、国际业务与行业方案的最新报道。"
        tone="surface"
        action={
          <PillLink href={link('https://www.jdl.com/news/list')} target="_blank" variant="outline">
            更多新闻（官网）
          </PillLink>
        }
      >
        <div className="grid gap-5 md:grid-cols-2">
          {/* 头条 */}
          <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-white md:row-span-2">
            <div className="relative h-[240px] overflow-hidden">
              <img
                src={asset(NEWS_ITEMS[0].cover ?? '')}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                loading="lazy"
              />
              <span className="absolute left-0 top-0 bg-brand px-3 py-1.5 text-[12px] text-white">头条</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-[12px] text-ink-3">
                {NEWS_ITEMS[0].tag} · {NEWS_ITEMS[0].date}
              </p>
              <h3 className="mt-2 text-[18px] font-semibold leading-7 text-ink">{NEWS_ITEMS[0].title}</h3>
              <p className="mt-3 text-[13px] leading-7 text-ink-2">
                京东物流在 11.11 期间落地系列好服务，AI 新成果全面应用，持续提升履约效率与消费者体验。
              </p>
              <a
                href={link('https://www.jdl.com/news/list')}
                target="_blank"
                rel="noreferrer"
                className="mt-auto pt-4 text-[13px] font-medium text-brand"
              >
                阅读原文 →
              </a>
            </div>
          </article>

          {/* 其余新闻 */}
          <div className="grid gap-4">
            {NEWS_ITEMS.slice(1, 5).map((news) => (
              <article
                key={news.title}
                className="group flex gap-4 rounded-xl border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <img
                  src={asset(news.cover ?? '')}
                  alt=""
                  loading="lazy"
                  className="h-[84px] w-[120px] shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="text-[11.5px] text-ink-3">
                    {news.tag} · {news.date}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-[13.5px] font-medium leading-6 text-ink transition-colors group-hover:text-brand">
                    {news.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 列表：剩余新闻 */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {NEWS_ITEMS.slice(5).map((news) => (
            <article
              key={news.title}
              className="flex gap-4 rounded-xl border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-card"
            >
              <img
                src={asset(news.cover ?? '')}
                alt=""
                loading="lazy"
                className="h-[76px] w-[112px] shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <p className="text-[11.5px] text-ink-3">
                  {news.tag} · {news.date}
                </p>
                <h3 className="mt-1 line-clamp-2 text-[13px] font-medium leading-6 text-ink">{news.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </AnchorSection>

      {/* #videos 视频中心 */}
      <AnchorSection
        id="videos"
        eyebrow="视频中心"
        title="用视频看见供应链"
        desc="从无人仓、智能仓储到大件送装与绿色减碳，一组短片了解京东物流的真实作业场景。"
        tone="dark"
        action={
          <PillLink href={VIDEOS_OFFICIAL_URL} target="_blank" variant="ghost">
            更多视频（官网）
          </PillLink>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* 主视频：复用首页 banner 视频素材 */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <video
              className="aspect-video w-full object-cover"
              src={heroVideo}
              poster={poster}
              controls
              muted
              loop
              playsInline
              preload="none"
            />
            <div className="p-5">
              <p className="text-[15px] font-semibold text-white">京东物流 · 一体化供应链服务</p>
              <p className="mt-1.5 text-[12.5px] leading-6 text-white/55">
                本站视频素材取自京东物流官网首页主视觉，仅用于学习复刻演示。
              </p>
            </div>
          </div>

          {/* 视频列表 */}
          <div className="grid max-h-[460px] gap-3 overflow-y-auto pr-1">
            {VIDEO_ITEMS.map((video) => (
              <button
                key={video.title}
                type="button"
                onClick={() => notify('演示站点不提供视频播放：完整视频请前往京东物流官网视频中心')}
                className="group flex gap-3 rounded-lg border border-white/10 p-2 text-left transition-colors hover:bg-white/5"
              >
                <div className="relative h-[58px] w-[100px] shrink-0 overflow-hidden rounded-md">
                  <img src={asset(video.cover)} alt="" loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] text-white">
                    {video.duration}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="line-clamp-2 text-[12.5px] leading-5 text-white/85 group-hover:text-white">
                    {video.title}
                  </p>
                  <p className="mt-1 text-[11px] text-white/40">京东物流视频中心</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </AnchorSection>

      {/* #investor 投资者关系 */}
      <AnchorSection
        id="investor"
        eyebrow="投资者关系"
        title="投资者关系"
        desc="京东物流于 2021 年 5 月在香港联交所主板上市，持续通过官网投资者关系频道披露财务与公司治理信息。"
        tone="white"
        action={
          <PillLink href={link(INVESTOR_INFO.url)} target="_blank" variant="outline">
            访问投资者关系频道
          </PillLink>
        }
      >
        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          <dl className="grid grid-cols-2 gap-4">
            {INVESTOR_INFO.listing.map((item) => (
              <div key={item.label} className="rounded-xl border border-line bg-white p-5">
                <dt className="text-[12.5px] text-ink-3">{item.label}</dt>
                <dd className="mt-1.5 text-[15px] font-semibold text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-xl bg-surface p-6">
            <p className="text-[14px] font-semibold text-ink">信息披露</p>
            <ul className="mt-3 space-y-2.5">
              {INVESTOR_INFO.links.map((item) => (
                <li key={item} className="flex items-center justify-between border-b border-line pb-2.5 text-[13px] text-ink-2 last:border-none last:pb-0">
                  {item}
                  <a
                    href={link(INVESTOR_INFO.url)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] text-brand hover:underline"
                  >
                    查看 →
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12px] leading-5 text-ink-3">
              本站为学习复刻演示，不提供投资建议；财务与公告数据请以 ir.jdl.com 官方披露为准。
            </p>
          </div>
        </div>
      </AnchorSection>

      {/* #contact 联系我们 */}
      <AnchorSection
        id="contact"
        eyebrow="联系我们"
        title="联系我们"
        desc="京东物流欢迎社会企业咨询合作，您可以拨打咨询热线或扫码添加企业合作微信。"
        tone="surface"
      >
        <div className="grid gap-6 md:grid-cols-[1fr_320px]">
          <dl className="grid gap-4 sm:grid-cols-2">
            {ABOUT_CONTACT.map((item) => (
              <div key={item.label} className="rounded-xl border border-line bg-white p-5">
                <dt className="text-[12.5px] text-ink-3">{item.label}</dt>
                <dd className="mt-1.5 text-[15px] font-semibold leading-6 text-ink">
                  {'href' in item && item.href ? (
                    <a href={item.href} className="transition-colors hover:text-brand">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
                <p className="mt-1 text-[12px] leading-5 text-ink-3">{item.note}</p>
              </div>
            ))}
          </dl>
          <div className="rounded-xl border border-line bg-white p-6">
            <p className="text-[14px] font-semibold text-ink">扫码关注</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {ABOUT_QRCODES.map((qr) => (
                <figure key={qr.label} className="text-center">
                  <img
                    src={asset(qr.image)}
                    alt={`${qr.label}二维码`}
                    loading="lazy"
                    className="mx-auto h-[72px] w-[72px] rounded-md border border-line object-contain"
                  />
                  <figcaption className="mt-2 text-[11px] text-ink-3">{qr.label}</figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-4 border-t border-line pt-4 text-[12px] leading-5 text-ink-3">
              也可在官网「联系我们」页获取在线客服与企业合作入口。
            </p>
          </div>
        </div>
      </AnchorSection>

      {/* #jobs 招贤纳士 */}
      <AnchorSection
        id="jobs"
        eyebrow="招贤纳士"
        title="加入京东物流"
        desc={JOBS_INFO.intro}
        tone="white"
        action={
          <PillLink href={link(JOBS_INFO.url)} target="_blank" variant="solid">
            前往京东招聘
          </PillLink>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOBS_INFO.directions.map((direction) => (
            <div key={direction.title} className="rounded-xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card">
              <p className="text-[15px] font-semibold text-ink">{direction.title}</p>
              <p className="mt-2 text-[12.5px] leading-6 text-ink-2">{direction.desc}</p>
            </div>
          ))}
        </div>
      </AnchorSection>

      {/* #group 集团网站 */}
      <AnchorSection
        id="group"
        eyebrow="集团网站"
        title="京东集团旗下站点"
        desc="京东物流是京东集团旗下业务板块，以下为集团及兄弟业务的官方网站。"
        tone="white"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GROUP_SITES.map((site) => (
            <a
              key={site.name}
              href={site.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card"
            >
              <div>
                <p className="text-[15px] font-semibold text-ink group-hover:text-brand">{site.name}</p>
                <p className="mt-1 text-[12px] text-ink-3">{site.desc}</p>
              </div>
              <span className="text-brand" aria-hidden>
                ↗
              </span>
            </a>
          ))}
        </div>
      </AnchorSection>

      {/* #lang 语言切换 */}
      <AnchorSection
        id="lang"
        eyebrow="语言 / Language"
        title="语言切换"
        desc="官网提供简体中文、繁體中文与 English 三个版本；本站复刻演示仅实现简体中文内容。"
        tone="surface"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() =>
                notify(
                  lang.active ? '当前已是简体中文（本站仅提供简体中文内容）' : `演示站点暂未提供 ${lang.name} 版本`,
                )
              }
              className={`rounded-xl border p-6 text-left transition-all ${
                lang.active
                  ? 'border-brand/40 bg-white shadow-card'
                  : 'border-line bg-white hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[17px] font-semibold text-ink">{lang.native}</p>
                {lang.active ? (
                  <span className="rounded-full bg-brand px-2.5 py-0.5 text-[11px] text-white">当前</span>
                ) : (
                  <span className="text-[11px] text-ink-3">{lang.code}</span>
                )}
              </div>
              <p className="mt-2 text-[12.5px] leading-6 text-ink-3">
                {lang.active ? '本站复刻演示的默认语言版本。' : '官网对应语言版本入口，演示站点暂未实现。'}
              </p>
            </button>
          ))}
        </div>
      </AnchorSection>

      <CtaBand
        title="想进一步了解京东物流？"
        desc="从企业介绍、新闻动态到合作洽谈：可致电 950616，或前往官网查看更多信息。"
        primaryLabel="致电 950616"
        primaryHref="tel:950616"
        secondaryLabel="查看服务与产品"
        secondaryHref={sectionLink('/services/', 'express')}
      />
      <Footnote>{ABOUT_FOOTNOTE}</Footnote>
      {node}
    </>
  );
}
