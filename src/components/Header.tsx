import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, theme, onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSpinning(true);
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      setIsSpinning(false);
    }, 900);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'threats', label: 'Threats' },
    { id: 'features', label: 'Features' },
    { id: 'attack-path', label: 'How It Works' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="site-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={handleLogoClick} 
          className="logo-container dark flex items-center gap-3.5 select-none no-underline"
        >
          <div className={`logo-mark w-12 h-12 relative flex-shrink-0 ${isSpinning ? 'spin-once' : ''}`} title="Click to spin">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" fill="none" className="w-full h-full object-contain block origin-center transition-all duration-400">
              <defs>
                <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="1.3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Connecting lines */}
              <path d="M60 15A39 39 0 0 1 94 73 M94 73A39 39 0 0 1 26 73 M26 73A39 39 0 0 1 60 15" stroke="#f5f5f5" strokeWidth="3.5" strokeLinecap="round" className="opacity-95"/>
              {/* Top security shield */}
              <g transform="translate(60 15)" filter="url(#glow)">
                <path d="M0-12 11-7.5V3.5 C11 9.5 6 14.3 0 17 C-6 14.3-11 9.5-11 3.5v-11Z" fill="#f5f5f5"/>
                <circle r="6.1" fill="#111" />
                <path d="M3.2-3.3 C2-4.5-2.6-4.8-3-1.8 C-3.4.8 3.1.1 3 3 C2.9 5.8-1.7 5.5-3.3 4.2 M0-6v12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
              </g>
              {/* Internet shield */}
              <g transform="translate(94 73)" filter="url(#glow)">
                <path d="M0-12 11-7.5V3.5 C11 9.5 6 14.3 0 17 C-6 14.3-11 9.5-11 3.5v-11Z" fill="#ff6a00"/>
                <circle r="6.2" fill="#fff" />
                <circle r="5" fill="none" stroke="#ff6a00" strokeWidth="1.1"/>
                <path d="M-5 0H5 M-4.2-2.5h8.4 M-4.2 2.5h8.4 M0-5c-2.2 2.4-2.2 7.6 0 10 M0-5c2.2 2.4 2.2 7.6 0 10" stroke="#ff6a00" strokeWidth=".9" strokeLinecap="round"/>
              </g>
              {/* Eye shield */}
              <g transform="translate(26 73)" filter="url(#glow)">
                <path d="M0-12 11-7.5V3.5 C11 9.5 6 14.3 0 17 C-6 14.3-11 9.5-11 3.5v-11Z" fill="#93a4b8"/>
                <circle r="6.2" fill="#0f1720" />
                <path d="M-5 0 C-2.7-4.2 2.7-4.2 5 0 C2.7 4.2-2.7 4.2-5 0Z" fill="none" stroke="#78c7ef" strokeWidth="1.1"/>
                <circle r="2" fill="#78c7ef" />
                <circle r=".8" fill="#e9f8ff" />
              </g>
            </svg>
          </div>
          <div className="logo-wordmark-wrap h-12 flex items-center">
            <svg viewBox="0 0 260 78" xmlns="http://www.w3.org/2000/svg" aria-label="Drocol Technologies Limited" className="h-full w-auto block">
              <text className="wordmark-text fill-white font-bold tracking-tighter" x="0" y="44" fontSize="52">Drocol</text>
              <rect className="wordmark-o-accent fill-[#FF6A00] origin-center" x="115" y="27.5" width="7" height="7" rx="1.5" ry="1.5" />
              <text className="wordmark-sub-text fill-[#FF6A00] font-sans font-semibold tracking-[3.5px]" x="0" y="65" fontSize="9.5">TECHNOLOGIES LIMITED</text>
            </svg>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2 desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`nav-pill ${activeSection === link.id ? 'active' : ''} ${link.id === 'home' ? 'home-pill' : ''}`}
            >
              {link.id === 'home' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 inline-block"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              )}
              {link.label}
            </a>
          ))}
        </div>

        {/* Book Demo Button & Hamburger */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle - Minimal toggle switch */}
          <button
            onClick={onToggleTheme}
            className={`relative w-[52px] h-[26px] rounded-full transition-all duration-300 flex items-center ${
              theme === 'dark' 
                ? 'bg-[#E87722]/20 border border-[#E87722]/30' 
                : 'bg-white/10 border border-white/15'
            }`}
            aria-label="Toggle dark mode"
          >
            <span className={`absolute w-[18px] h-[18px] rounded-full transition-all duration-300 flex items-center justify-center ${
              theme === 'dark' 
                ? 'translate-x-[30px] bg-[#E87722]' 
                : 'translate-x-[2px] bg-white'
            }`}>
              {theme === 'dark' ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
            </span>
          </button>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="btn-primary hidden md:inline-flex items-center gap-2"
          >
            Book Demo
            <ArrowRight size={14} strokeWidth={2.5} />
          </a>
          <button 
            onClick={toggleMenu}
            className={`hamburger flex lg:hidden ${isOpen ? 'open' : ''}`} 
            aria-label="Toggle menu"
          >
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.id === 'home' && (
                <svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              )}
              {link.id === 'threats' && (
                <svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
              )}
              {link.id === 'features' && (
                <svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              )}
              {link.id === 'attack-path' && (
                <svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              )}
              {link.id === 'integrations' && (
                <svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
              )}
              {link.id === 'contact' && (
                <svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.0-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
              )}
              {link.label}
            </a>
          ))}
          <div className="px-5 pt-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="btn-accent w-full justify-center flex items-center gap-2"
            >
              Book a Demo
              <ArrowRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};