import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { SpecularButton, specularPrimary, specularOutlineLight } from './SpecularButton';

export const Footer: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const { pathname } = useLocation();

  // Hide the top CTA banner on the sub-pages that already have their own CTA band
  const showCtaBanner = !['/solutions', '/technology', '/research'].includes(pathname);

  const handleLogoClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 900);
  };

  const cols = [
    {
      heading: 'Solutions',
      links: [
        { label: 'Assess',  to: '/solutions' },
        { label: 'Advise',  to: '/solutions' },
        { label: 'Train',   to: '/solutions' },
        { label: 'Build',   to: '/technology' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'Company', to: '/company' },
        { label: 'Industries', to: '/industries' },
        { label: 'Research', to: '/research' },
        { label: 'Insights', to: '/research' },
        { label: 'About',    to: '/' },
        { label: 'Contact',  to: '/contact' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy',      to: '' },
        { label: 'Terms of Service',    to: '' },
        { label: 'Security Disclosure', to: '' },
        { label: 'NDPR Compliance',     to: '' },
      ],
    },
  ];

  return (
    <footer className="relative bg-[#060606] overflow-hidden">

      {/* ── Background: darkest + angled gradient stripes + amber edge ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Very subtle angled ruled lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(160deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 40px)',
        }}/>
        {/* Top-center orange accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(60px)' }}/>
        {/* Bottom-center faint glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(50px)' }}/>
        {/* Top separator */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(232,119,34,0.25) 50%, rgba(255,255,255,0.06) 70%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Top CTA Banner (hidden on Solutions / Technology / Research) ── */}
        {showCtaBanner && (
        <div className="py-14 md:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.05] mb-3">
                Let's build <span className="text-transparent bg-clip-text italic font-light"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #E87722, #F5A623)',
                    display: 'inline-block',
                    padding: '0.12em 0.18em',
                    margin: '-0.12em -0.18em',
                  }}>
                  confidence
                </span> together.
              </h2>
              <p className="text-white/40 font-inter text-sm leading-relaxed">
                Whether you're preparing for compliance, strengthening your security posture, or building the next generation of digital services — we're here to help.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <SpecularButton
                {...specularPrimary}
                size="lg"
                to="/contact"
              >
                Let's talk
                <ArrowRight size={14} strokeWidth={2.5}/>
              </SpecularButton>
              <SpecularButton
                {...specularOutlineLight}
                size="lg"
                to="/solutions"
              >
                Explore Solutions
              </SpecularButton>
            </div>
          </div>
        </div>
        )}

        {/* ── Main Footer Grid ────────────────────────────── */}
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="inline-flex items-center mb-6 select-none no-underline"
              style={{ gap: '0.4cm' }}
              aria-label="Drocol Technologies Limited"
            >
              <img src="/drocol-icon-light.png?v=1" alt="" aria-hidden="true"
                style={{ height: '36px', width: 'auto', objectFit: 'contain', display: 'block' }}
                draggable={false}/>
              <img src="/drocol-wordmark.svg" alt="Drocol"
                style={{ height: '26px', width: 'auto', objectFit: 'contain', display: 'block' }}
                draggable={false}/>
            </Link>
            <p className="text-white/35 font-inter text-sm leading-relaxed mb-6">
              Better security creates stronger organizations. Stronger organizations create a more secure digital future.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { icon: <Instagram size={15}/>, label: 'Instagram', href: 'https://www.instagram.com/drocol.tech' },
                { icon: <Linkedin size={15}/>, label: 'LinkedIn', href: '#' },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="w-8 h-8 rounded-lg border flex items-center justify-center text-white/40 transition-all duration-200"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = '#E87722'; el.style.borderColor = '#E87722'; el.style.color = '#fff'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.color = 'rgba(255,255,255,0.4)'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-white/25 mb-5">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-white/40 font-inter transition-colors duration-150 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="text-sm text-white/40 font-inter transition-colors duration-150 hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ─────────────────────────────────── */}
        <div className="py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-[11px] text-white/25 font-inter">
            © 2026 Drocol Technologies Ltd. RC: 1742893. Made with ❤️ in Lagos.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Security'].map(item => (
              <a key={item} href="#" className="text-[11px] text-white/25 hover:text-white/50 font-inter transition-colors duration-150">
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
