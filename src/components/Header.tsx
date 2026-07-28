import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  activeSection: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const navLinks = [
  { id: 'home',        label: 'Home' },
  { id: 'threats',     label: 'Threats' },
  { id: 'features',    label: 'Features' },
  { id: 'attack-path', label: 'How It Works' },
  { id: 'integrations',label: 'Integrations' },
  { id: 'contact',     label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({ activeSection, theme, onToggleTheme }) => {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const menuRef                   = useRef<HTMLDivElement>(null);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on desktop resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) closeMobile(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openMobile  = () => { setIsOpen(true);  document.body.style.overflow = 'hidden'; };
  const closeMobile = () => { setIsOpen(false); document.body.style.overflow = ''; };
  const toggleMobile = () => isOpen ? closeMobile() : openMobile();

  return (
    <>
      {/* ── Nav bar ──────────────────────────────────────────── */}
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(8,8,8,0.92)'
            : 'rgba(8,8,8,0.6)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.07)'
            : '1px solid rgba(255,255,255,0.04)',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Subtle orange accent line at very top */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(232,119,34,0.5) 50%, transparent 100%)' }}/>

        <div className="max-w-7xl mx-auto px-4 sm:px-5 h-[64px] flex items-center justify-between gap-4">

          {/* ── Logo ─────────────────────────────────────────── */}
          <a
            href="#home"
            onClick={scrollTo('home')}
            className="flex items-center shrink-0 select-none no-underline group"
            style={{ gap: '0.35cm' }}
            aria-label="Drocol Technologies Limited"
          >
            <img
              src="/drocol-icon.svg"
              alt=""
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:scale-105"
              style={{ height: '34px', width: 'auto', objectFit: 'contain', display: 'block' }}
              draggable={false}
            />
            <img
              src="/drocol-wordmark.svg"
              alt="Drocol"
              className="transition-opacity duration-300 group-hover:opacity-90"
              style={{ height: '26px', width: 'auto', objectFit: 'contain', display: 'block' }}
              draggable={false}
            />
          </a>

          {/* ── Desktop nav — centre pill cluster ──────────────── */}
          <nav className="hidden lg:flex items-center" aria-label="Main navigation">
            <div className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-2xl border"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}>
              {navLinks.map(link => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={scrollTo(link.id)}
                    className="relative px-3.5 py-1.5 rounded-xl text-[13px] font-medium transition-all duration-200 select-none"
                    style={{
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                      background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)'; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.09)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>

          {/* ── Right actions ──────────────────────────────────── */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Live status pill — desktop only */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
              style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.8)]"/>
              <span className="text-[11px] font-inter font-semibold text-green-400 tracking-wide">All Systems Live</span>
            </div>

            {/* Theme toggle */}
            <a
              href="https://github.com/drocol-technologies"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
              aria-label="GitHub"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>

            {/* Book Demo CTA */}
            <a
              href="#contact"
              onClick={scrollTo('contact')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 group"
              style={{
                background: 'linear-gradient(135deg, #E87722, #F5A623)',
                boxShadow: '0 0 0 1px rgba(232,119,34,0.3), 0 4px 16px rgba(232,119,34,0.2)',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(232,119,34,0.5), 0 6px 24px rgba(232,119,34,0.35)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(232,119,34,0.3), 0 4px 16px rgba(232,119,34,0.2)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Book Demo
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5}/>
            </a>

            {/* Hamburger */}
            <button
              onClick={toggleMobile}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="flex lg:hidden w-10 h-10 items-center justify-center rounded-xl border transition-all duration-200"
              style={{ background: isOpen ? 'rgba(232,119,34,0.12)' : 'rgba(255,255,255,0.04)', borderColor: isOpen ? 'rgba(232,119,34,0.3)' : 'rgba(255,255,255,0.08)' }}
            >
              <div className="w-[18px] flex flex-col gap-[5px]">
                <span className="block h-[1.5px] bg-white rounded-full transition-all duration-300"
                  style={{ transform: isOpen ? 'translateY(6.5px) rotate(45deg)' : 'none', opacity: 1 }}/>
                <span className="block h-[1.5px] bg-white rounded-full transition-all duration-300"
                  style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? 'scaleX(0)' : 'scaleX(1)' }}/>
                <span className="block h-[1.5px] bg-white rounded-full transition-all duration-300"
                  style={{ transform: isOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none', opacity: 1 }}/>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu overlay ──────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={closeMobile}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              ref={menuRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[64px] inset-x-3 sm:inset-x-4 z-50 lg:hidden rounded-2xl border overflow-hidden"
              style={{
                background: 'rgba(10,10,10,0.98)',
                borderColor: 'rgba(255,255,255,0.09)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
              }}
            >
              {/* Top accent line */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.5), transparent)' }}/>

              {/* Nav links */}
              <nav className="py-2">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.a
                      key={link.id}
                      href={`#${link.id}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      onClick={e => { scrollTo(link.id)(e); closeMobile(); }}
                      className="flex items-center justify-between px-4 py-3.5 transition-colors duration-150"
                      style={{
                        background: isActive ? 'rgba(232,119,34,0.07)' : 'transparent',
                        borderLeft: isActive ? '2px solid #E87722' : '2px solid transparent',
                      }}
                      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      <span className="font-inter text-[15px] font-medium"
                        style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.65)' }}>
                        {link.label}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className="mx-4 h-px" style={{ background: 'rgba(255,255,255,0.06)' }}/>

              {/* Bottom CTA */}
              <div className="p-4 flex flex-col gap-2.5">
                <a
                  href="#contact"
                  onClick={e => { scrollTo('contact')(e); closeMobile(); }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #E87722, #F5A623)', boxShadow: '0 4px 16px rgba(232,119,34,0.3)', fontFamily: "'Inter', sans-serif" }}
                >
                  Book a Demo
                  <ArrowRight size={14} strokeWidth={2.5}/>
                </a>

                {/* Live status + theme in one row */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                    <span className="text-[11px] font-inter text-green-400 font-medium">All Systems Live</span>
                  </div>
                  <a
                    href="https://github.com/drocol-technologies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-inter text-white/40 hover:text-white/70 transition-colors"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to offset fixed header */}
      <div className="h-[64px]" aria-hidden="true"/>
    </>
  );
};
