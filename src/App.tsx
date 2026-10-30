import type { ReactElement } from 'react';
import { Footer } from './layout/Footer';
import { Header } from './layout/Header';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EsgPage } from './pages/EsgPage';
import { ProjectPage } from './pages/ProjectPage';
import { ServicesPage } from './pages/ServicesPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { SupportPage } from './pages/SupportPage';

export type PageKey = 'home' | 'services' | 'solutions' | 'support' | 'esg' | 'about' | 'project';

const ROUTES: Record<PageKey, () => ReactElement> = {
  home: HomePage,
  services: ServicesPage,
  solutions: SolutionsPage,
  support: SupportPage,
  esg: EsgPage,
  about: AboutPage,
  project: ProjectPage,
};

export function App({ page }: { page: PageKey }) {
  const Page = ROUTES[page] ?? HomePage;
  return (
    <div className="flex min-h-screen flex-col">
      <Header current={page} />
      <main id="main" className="flex-1">
        <Page />
      </main>
      <Footer />
    </div>
  );
}
