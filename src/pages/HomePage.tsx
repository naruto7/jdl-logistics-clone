import { Hero } from '@/sections/home/Hero';
import { ServiceSection } from '@/sections/home/ServiceSection';
import { IndustrySection } from '@/sections/home/IndustrySection';
import { NetworkSection } from '@/sections/home/NetworkSection';
import { NewsSection } from '@/sections/home/NewsSection';

/**
 * 首页编排：只负责区块顺序与组合，具体实现由各 section 组件负责。
 * 顺序与官网一致（实测 y 坐标见 spec/home-spec.json）：
 * banner(100) → service(546) → industry(1185) → network(1689) → news(2204) → contact/footer(2651+2802)
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <ServiceSection />
      <IndustrySection />
      <NetworkSection />
      <NewsSection />
    </>
  );
}
