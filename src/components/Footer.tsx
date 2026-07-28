import React, { useState } from 'react';
import { Twitter, Linkedin, Github, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSpinning(true);
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => setIsSpinning(false), 900);
  };

  const navScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cols = [
    {
      heading: 'Product',
      links: [
        { label: 'Cloud Security',  id: 'features' },
        { label: 'Pen Testing',     id: 'features' },
        { label: 'Attack Paths',    id: 'attack-path' },
        { label: 'Integrations',    id: 'integrations' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'Careers',  id: '' },
        { label: 'Blog',     id: '' },
        { label: 'Contact',  id: 'contact' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy',       id: '' },
        { label: 'Terms of Service',     id: '' },
        { label: 'Security Disclosure',  id: '' },
        { label: 'NDPR Compliance',      id: '' },
      ],
    },
  ];

  return (
    <footer className="relative bg-[#060606] overflow-hidden">

      {/* ── Background ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px',
        }}/>
        {/* Top separator with orange accent */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(232,119,34,0.2) 50%, rgba(255,255,255,0.06) 70%, transparent)' }}/>
        {/* Subtle bottom-center glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(60px)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Top CTA Banner ─────────────────────────────── */}
        <div className="py-14 md:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.05] mb-3">
                Ready to secure your<br/>
                <span className="text-transparent bg-clip-text italic font-light"
                  style={{ backgroundImage: 'linear-gradient(90deg, #E87722, #F5A623)' }}>
                  enterprise stack?
                </span>
              </h2>
              <p className="text-white/40 font-inter text-sm leading-relaxed">
                Join 250+ Nigerian organizations that trust Drocol to protect their most critical infrastructure.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="#contact"
                onClick={navScroll('contact')}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #E87722 0%, #F5A623 100%)', boxShadow: '0 0 0 1px rgba(232,119,34,0.3), 0 8px 24px rgba(232,119,34,0.2)' }}
              >
                Book a Demo
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.5}/>
              </a>
              <a
                href="#features"
                onClick={navScroll('features')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white/70 border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:text-white transition-all duration-300"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>

        {/* ── Main Footer Grid ────────────────────────────── */}
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="#home"
              onClick={handleLogoClick}
              className="inline-flex items-center mb-6 select-none no-underline"
              style={{ gap: '0.4cm' }}
              aria-label="Drocol Technologies Limited"
            >
              <img src="/drocol-icon.svg" alt="" aria-hidden="true"
                style={{ height: '36px', width: 'auto', objectFit: 'contain', display: 'block' }}
                draggable={false}/>
              <img src="/drocol-wordmark.svg" alt="Drocol"
                style={{ height: '26px', width: 'auto', objectFit: 'contain', display: 'block' }}
                draggable={false}/>
            </a>
            <p className="text-white/35 font-inter text-sm leading-relaxed mb-6">
              Enterprise cybersecurity,<br/>built in Lagos for Africa.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { icon: <Twitter size={15}/>, label: 'Twitter' },
                { icon: <Linkedin size={15}/>, label: 'LinkedIn' },
                { icon: <Github size={15}/>, label: 'GitHub' },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
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
                    <a
                      href={link.id ? `#${link.id}` : '#'}
                      onClick={link.id ? navScroll(link.id) : undefined}
                      className="text-sm text-white/40 font-inter transition-colors duration-150 hover:text-white"
                    >
                      {link.label}
                    </a>
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
