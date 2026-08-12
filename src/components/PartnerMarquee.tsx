import React from 'react';
import { ArrowRight, Shield, Globe, Users } from 'lucide-react';
import { SpecularButton, specularPrimary } from './SpecularButton';

export const PartnerMarquee: React.FC = () => {
  const partners = [
    { name: 'Redream Solutions', handle: '@redreamsolutions', tagline: 'Technology & Innovation' },
    { name: 'Redream Solutions', handle: '@redreamsolutions', tagline: 'Technology & Innovation' },
    { name: 'Redream Solutions', handle: '@redreamsolutions', tagline: 'Technology & Innovation' },
    { name: 'Redream Solutions', handle: '@redreamsolutions', tagline: 'Technology & Innovation' },
    { name: 'Redream Solutions', handle: '@redreamsolutions', tagline: 'Technology & Innovation' },
  ];

  return (
    <section className="relative bg-[#0F0F0F] py-16 md:py-24 overflow-hidden">

      {/* ── Background: dark + subtle dot grid + faint amber centre ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}/>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(80px)' }}/>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.18) 50%, transparent)' }}/>
      </div>

      {/* ── Header ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 md:mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
              <span className="text-[11px] font-inter font-semibold tracking-widest text-[#E87722] uppercase">Strategic Partners</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.05]">
              Our Trusted<br/>
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #E87722, #F5A623)' }}>
                Ecosystem.
              </span>
            </h2>
            <p className="text-white/50 mt-4 max-w-md font-inter text-sm leading-relaxed">
              Proudly partnering with Redream Solutions to deliver world-class cybersecurity solutions across Africa.
            </p>
          </div>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <Shield size={14} className="text-[#E87722]"/>, label: '250+', sub: 'Organizations Protected' },
              { icon: <Globe size={14} className="text-[#E87722]"/>, label: '12+', sub: 'African Countries' },
              { icon: <Users size={14} className="text-[#E87722]"/>, label: '5+', sub: 'Active Partners' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.09)' }}>
                {stat.icon}
                <div>
                  <div className="text-white font-bold text-sm leading-none">{stat.label}</div>
                  <div className="text-white/40 text-[10px] font-inter mt-0.5">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Static partner grid ────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`group relative flex flex-row items-center gap-4 px-5 py-5 rounded-2xl border transition-colors duration-300 sm:flex-col sm:items-start ${index > 0 ? 'max-sm:hidden' : ''}`}
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              {/* Logo mark */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #E87722, #F5A623)', boxShadow: '0 4px 16px rgba(232,119,34,0.3)' }}>
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                  <path d="M8 6h9c4.4 0 7 2.4 7 6 0 2.5-1.4 4.4-3.6 5.3L24 26h-4.5l-3.2-8H12v8H8V6z" fill="#fff"/>
                  <path d="M12 10v5h4.5c2 0 3.2-1 3.2-2.5S18.5 10 16.5 10H12z" fill="rgba(255,255,255,0.5)"/>
                </svg>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1 sm:flex-none">
                <div className="font-bold text-white text-sm leading-tight truncate">{partner.name}</div>
                <div className="font-mono text-[10px] text-[#E87722]/70 mt-0.5 truncate">{partner.handle}</div>
                <div className="hidden sm:block text-white/35 font-inter text-xs mt-2 leading-snug">{partner.tagline}</div>
              </div>

              {/* Verified badge */}
              <div className="mt-auto ml-auto sm:ml-0 inline-flex items-center gap-1.5 shrink-0 w-fit rounded-full px-2 py-1"
                style={{ background: 'rgba(232,119,34,0.12)' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-[10px] font-semibold text-[#E87722] tracking-wide uppercase">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 md:mt-12 relative z-10">
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 rounded-2xl border"
          style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.09)' }}
        >
          <div>
            <div className="text-white font-semibold text-sm">Become a partner</div>
            <div className="text-white/40 font-inter text-xs mt-0.5">Join our ecosystem and help secure African enterprises together.</div>
          </div>
          <SpecularButton
            {...specularPrimary}
            size="md"
            href="mailto:hello@drocol.ng?subject=Partnership%20Enquiry%20%E2%80%94%20Drocol%20Technologies&body=Hi%20Drocol%20Team%2C%0A%0AI%20am%20interested%20in%20exploring%20a%20partnership%20with%20Drocol%20Technologies.%0A%0AOrganisation%3A%20%0AContact%20name%3A%20%0AWebsite%3A%20%0A%0APlease%20get%20in%20touch%20at%20your%20earliest%20convenience.%0A%0AThank%20you."
            className="shrink-0"
          >
            Partner With Us
            <ArrowRight size={13} strokeWidth={2.5}/>
          </SpecularButton>
        </div>
      </div>
    </section>
  );
};
