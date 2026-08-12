import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ResearchPage } from './pages/ResearchPage';
import { CompanyPage } from './pages/CompanyPage';
import { ContactPage } from './pages/ContactPage';

// Map each route to the nav key it should light up
const routeSection: Record<string, string> = {
  '/solutions':  'help',
  '/technology': 'technology',
  '/research':   'research',
  '/contact':    'contact',
};

/**
 * Marks the session when a CTA link ("Let's talk" / "Book a call" / "Get in touch")
 * pointing at /contact is clicked. The contact page uses this to show the
 * direct-line call prompt ~5s after arrival from one of those buttons.
 */
const MarkCallArrival = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a');
      if (!a) return;
      try {
        const url = new URL(a.getAttribute('href') || '', window.location.href);
        if (url.pathname === '/contact') {
          sessionStorage.setItem('drocol-call-arrival', '1');
        }
      } catch { /* ignore malformed hrefs */ }
    };
    // Capture phase: runs before the router's own click handling / navigation.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
};

/** Scrolls to the top whenever the route changes (instant, ignoring smooth scroll). */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

const Layout = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [activeSection, setActiveSection] = useState<string>('home');

  // Site is intentionally dark-only — no theme toggle needed
  const theme: 'light' | 'dark' = 'dark';
  const toggleTheme = () => {};

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  // Active nav: sub-pages always map to their own key; home uses the scroll-spy
  useEffect(() => {
    setActiveSection(routeSection[pathname] ?? 'home');
  }, [pathname]);

  // Scroll-spy — only meaningful on the single-page home
  useEffect(() => {
    if (!isHome) return;

    const sectionIds = ['home', 'why', 'approach', 'industries', 'insights', 'vision'];

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        let currentSection = 'home';
        let bestDistance = Infinity;

        sectionIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const distance = Math.abs(rect.top);

            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
              currentSection = id;
            } else if (rect.top < window.innerHeight && rect.bottom > 0 && distance < bestDistance) {
              bestDistance = distance;
              currentSection = id;
            }
          }
        });

        setActiveSection(currentSection);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#E87722]/30 selection:text-[#E87722] antialiased overflow-x-hidden">
      <Header activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <>
      <ScrollToTop />
      <MarkCallArrival />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
