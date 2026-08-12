import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import PillNav from './PillNav';
import { SpecularButton, specularPrimary } from './SpecularButton';

interface HeaderProps {
  activeSection: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const navLinks = [
  { id: 'home',       label: 'Home',       path: '/' },
  { id: 'help',       label: 'Solutions',  path: '/solutions' },
  { id: 'technology', label: 'Technology', path: '/technology' },
  { id: 'industries', label: 'Industries', path: '/industries' },
  { id: 'company',    label: 'Company',    path: '/company' },
  { id: 'research',   label: 'Research',   path: '/research' },
];

export const Header: React.FC<HeaderProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Stable item list so PillNav's layout effect doesn't re-run on scroll */
  const items = useMemo(
    () => navLinks.map(l => ({ label: l.label, href: l.path, ariaLabel: l.label })),
    []
  );

  /* Active nav item: current route wins; home page defaults to Home */
  const activeHref = pathname === '/' ? '/' : pathname;

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
          /* Keep the header composited so iOS renders it fixed with the blur */
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      >
        {/* Subtle warm accent line at very top */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(232,119,34,0.6) 50%, transparent 100%)' }}/>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 h-[64px] flex items-center justify-between">

          {/* ── Logo + company name — left, as before ────────── */}
          <Link
            to="/"
            aria-label="Drocol Technologies Limited"
            className="flex items-center shrink-0 select-none no-underline group"
            style={{ gap: '0.35cm' }}
          >
            <img
              src="/drocol-icon.png?v=2"
              alt=""
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:scale-[1.03] h-10 max-sm:h-6 w-auto object-contain block"
              style={{ objectFit: 'contain', display: 'block' }}
              draggable={false}
            />
            <img
              src="/drocol-wordmark-dark.svg?v=1"
              alt="Drocol"
              className="transition-transform duration-300 group-hover:scale-[1.03] h-[26px] max-sm:h-4 w-auto object-contain block"
              style={{ objectFit: 'contain', display: 'block' }}
              draggable={false}
            />
          </Link>

          {/* ── Book a Call button — right, takes you to /contact ── */}
          <div className="shrink-0 max-sm:hidden">
            <SpecularButton
              {...specularPrimary}
              size="sm"
              to="/contact"
              ariaLabel="Book a call"
              className="max-[319px]:hidden"
            >
              <Phone size={12} strokeWidth={2.4}/>
              Book a Call
            </SpecularButton>
          </div>

          {/* ── Centered pill nav ───────────────────────────── */}
          <PillNav
            logo="/drocol-icon.png?v=2"
            logoAlt="Drocol Technologies Limited"
            items={items}
            activeHref={activeHref}
            baseColor="#FAF7F0"
            pillColor="#ffffff"
            hoveredPillTextColor="#E87722"
            pillTextColor="#1A1A1A"
            initialLoadAnimation={false}
          />
        </div>
      </header>

      {/* Spacer to offset fixed header */}
      <div className="h-[64px]" aria-hidden="true"/>
    </>
  );
};
