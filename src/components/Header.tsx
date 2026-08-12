import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  activeSection: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const navLinks = [
  { id: 'home',        label: 'Home',       path: '/' },
  { id: 'help',        label: 'Solutions',  path: '/solutions' },
  { id: 'technology',  label: 'Technology', path: '/technology' },
  { id: 'research',    label: 'Research',   path: '/research' },
  { id: 'contact',     label: 'Contact',    path: '/contact' },
];

export const Header: React.FC<HeaderProps> = ({ activeSection, theme, onToggleTheme }) => {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const menuRef                   = useRef<HTMLDivElement>(null);
  const navigate                  = useNavigate();
  const { pathname }              = useLocation();

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

  // Navigate to a route; when already on that route, smooth-scroll to the section if it exists
  const goTo = (id: string, path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === path) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(path);
    }
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
            ? 'linear-gradient(135deg, rgba(250,247,240,0.94), rgba(244,237,224,0.9))'
            : 'linear-gradient(135deg, rgba(250,247,240,0.78), rgba(244,237,224,0.66))',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          borderBottom: scrolled
            ? '1px solid rgba(26,26,26,0.08)'
            : '1px solid rgba(26,26,26,0.06)',
          boxShadow: scrolled ? '0 8px 32px rgba(26,26,26,0.10)' : 'none',
        }}
      >
        {/* Subtle warm accent line at very top */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(232,119,34,0.6) 50%, transparent 100%)' }}/>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 h-[64px] flex items-center justify-between gap-4">

          {/* ── Logo ─────────────────────────────────────────── */}
          <a
            href="/"
            onClick={goTo('home', '/')}
            className="flex items-center shrink-0 select-none no-underline group"
            style={{ gap: '0.35cm' }}
            aria-label="Drocol Technologies Limited"
          >
            <img
              src="/drocol-icon.png?v=2"
              alt=""
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ height: '40px', width: 'auto', objectFit: 'contain', display: 'block' }}
              draggable={false}
            />
            <img
              src="/drocol-wordmark-dark.svg?v=1"
              alt="Drocol"
              className="transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ height: '26px', width: 'auto', objectFit: 'contain', display: 'block' }}
              draggable={false}
            />
          </a>

          {/* ── Desktop nav — centre pill cluster ──────────────── */}
          <nav className="hidden lg:flex items-center" aria-label="Main navigation">
            <div className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-2xl border"
              style={{ background: 'rgba(255,255,255,0.5)', borderColor: 'rgba(26,26,26,0.08)' }}>
              {navLinks.map(link => {
                const isActive = pathname === link.path || (pathname === '/' && activeSection === link.id);
                return (
                  <a
                    key={link.id}
                    href={link.path}
                    onClick={goTo(link.id, link.path)}
                    className="relative px-3.5 py-1.5 rounded-xl text-[13px] font-medium transition-all duration-200 select-none"
                    style={{
                      color: isActive ? '#1A1A1A' : 'rgba(26,26,26,0.62)',
                      background: isActive ? 'rgba(232,119,34,0.16)' : 'transparent',
                      backdropFilter: isActive ? 'blur(8px)' : 'none',
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      if (!isActive) {
                        el.style.color = 'rgba(26,26,26,0.9)';
                        el.style.background = 'rgba(232,119,34,0.1)';
                        el.style.backdropFilter = 'blur(8px)';
                      }
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      if (!isActive) {
                        el.style.color = 'rgba(26,26,26,0.62)';
                        el.style.background = 'transparent';
                        el.style.backdropFilter = 'none';
                      }
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: 'rgba(232,119,34,0.16)', backdropFilter: 'blur(8px)' }}
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

            {/* Hamburger */}
            <button
              onClick={toggleMobile}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="flex lg:hidden w-10 h-10 items-center justify-center rounded-xl border transition-all duration-200"
              style={{ background: isOpen ? 'rgba(232,119,34,0.15)' : 'rgba(26,26,26,0.06)', borderColor: isOpen ? 'rgba(232,119,34,0.4)' : 'rgba(26,26,26,0.12)' }}
            >
              <div className="w-[18px] flex flex-col gap-[5px]">
                <span className="block h-[1.5px] bg-[#1A1A1A] rounded-full transition-all duration-300"
                  style={{ transform: isOpen ? 'translateY(6.5px) rotate(45deg)' : 'none', opacity: 1 }}/>
                <span className="block h-[1.5px] bg-[#1A1A1A] rounded-full transition-all duration-300"
                  style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? 'scaleX(0)' : 'scaleX(1)' }}/>
                <span className="block h-[1.5px] bg-[#1A1A1A] rounded-full transition-all duration-300"
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
                  const isActive = pathname === link.path || (pathname === '/' && activeSection === link.id);
                  return (
                    <motion.a
                      key={link.id}
                      href={link.path}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      onClick={e => { goTo(link.id, link.path)(e); closeMobile(); }}
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

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to offset fixed header */}
      <div className="h-[64px]" aria-hidden="true"/>
    </>
  );
};
