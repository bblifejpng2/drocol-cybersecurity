import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ThreatDashboard } from './components/ThreatDashboard';
import { PartnerMarquee } from './components/PartnerMarquee';
import { PageTransition } from './components/PageTransition';
import { FeaturesCarousel } from './components/FeaturesCarousel';
import { AttackPathStack } from './components/AttackPathStack';
import { LiveScannerTerminal } from './components/LiveScannerTerminal';
import { Industries } from './components/Industries';
import { Integrations } from './components/Integrations';
import { DemoScheduler } from './components/DemoScheduler';
import { Footer } from './components/Footer';
import { SectionNav } from './components/SectionNav';

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(true);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Apply theme class to html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const sectionIds = ['home', 'threats', 'features', 'attack-path', 'integrations', 'contact'];
    
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
  }, []);

  return (
    <>
      {loading && <PageTransition />}
      <div className={`min-h-screen text-neutral-900 selection:bg-[#E87722]/30 selection:text-[#E87722] antialiased overflow-x-hidden theme-transition ${
        theme === 'light' ? 'bg-[#F3EDE2]' : 'bg-[#0B0B0B]'
      }`}>
        {/* Scroll Navigation Controls */}
        <SectionNav activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Main Sticky Header */}
        <Header activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />

        {/* Main Sections */}
        <main>
          <Hero />
          <ThreatDashboard />
          <PartnerMarquee />
          <FeaturesCarousel />
          <AttackPathStack />
          <LiveScannerTerminal />
          <Industries />
          <Integrations />
          <DemoScheduler />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;