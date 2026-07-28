import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Globe, Users } from 'lucide-react';

export const PartnerMarquee: React.FC = () => {
  const partners = Array(10).fill({
    name: 'Redream Solutions',
    handle: '@redreamsolutions',
    tagline: 'Technology & Innovation',
  });

  return (
    <section className="relative bg-[#F3EDE2] py-16 md:py-24 overflow-hidden">

      {/* ── Background ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px',
        }}/>
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(23,23,23,0.07) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.1) 50%, transparent)' }}/>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(80px)' }}/>
      </div>

      {/* ── Header ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 md:mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
              <span className="text-[11px] font-inter font-semibold tracking-widest text-[#E87722] uppercase">Strategic Partners</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-neutral-950 leading-[1.05]">
              Our Trusted<br/>
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #E87722, #F5A623)' }}>
                Ecosystem.
              </span>
            </h2>
            <p className="text-neutral-600 mt-4 max-w-md font-inter text-sm leading-relaxed">
              Proudly partnering with Redream Solutions to deliver world-class cybersecurity solutions across Africa.
            </p>
          </motion.div>

          {/* Stats pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: <Shield size={14} className="text-[#E87722]"/>, label: '250+', sub: 'Organizations Protected' },
              { icon: <Globe size={14} className="text-[#E87722]"/>, label: '12+', sub: 'African Countries' },
              { icon: <Users size={14} className="text-[#E87722]"/>, label: '5+', sub: 'Active Partners' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border"
                style={{ background: 'rgba(255,255,255,0.6)', borderColor: 'rgba(23,23,23,0.08)' }}>
                {stat.icon}
                <div>
                  <div className="text-neutral-900 font-bold text-sm leading-none">{stat.label}</div>
                  <div className="text-neutral-500 text-[10px] font-inter mt-0.5">{stat.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Marquee ─────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden py-2 z-10">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #F3EDE2, transparent)' }}/>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #F3EDE2, transparent)' }}/>

        <div className="marquee-outer flex w-[200%]">
          {[1, 2].map(track => (
            <div key={track} className="marquee-track flex gap-4 md:gap-5 shrink-0" aria-hidden={track === 2}>
              {partners.map((partner, index) => (
                <div
                  key={`t${track}-${index}`}
                  className="group relative flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-2xl border transition-all duration-300 cursor-default shrink-0"
                  style={{
                    minWidth: '240px',
                    background: 'rgba(255,255,255,0.6)',
                    borderColor: 'rgba(23,23,23,0.08)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(232,119,34,0.35)';
                    el.style.background = 'rgba(232,119,34,0.06)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(23,23,23,0.08)';
                    el.style.background = 'rgba(255,255,255,0.6)';
                  }}
                >
                  {/* Logo mark */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl shrink-0 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #E87722, #F5A623)', boxShadow: '0 4px 16px rgba(232,119,34,0.3)' }}>
                    <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                      <path d="M8 6h9c4.4 0 7 2.4 7 6 0 2.5-1.4 4.4-3.6 5.3L24 26h-4.5l-3.2-8H12v8H8V6z" fill="#fff"/>
                      <path d="M12 10v5h4.5c2 0 3.2-1 3.2-2.5S18.5 10 16.5 10H12z" fill="rgba(255,255,255,0.5)"/>
                    </svg>
                  </div>

                  {/* Info */}
                  <div className="min-w-0">
                    <div className="font-bold text-neutral-900 text-sm leading-tight truncate">{partner.name}</div>
                    <div className="font-mono text-[10px] text-[#E87722]/80 mt-0.5 truncate">{partner.handle}</div>
                  </div>

                  {/* Verified badge */}
                  <div className="ml-auto shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(232,119,34,0.15)' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 md:mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 rounded-2xl border"
          style={{ background: 'rgba(255,255,255,0.6)', borderColor: 'rgba(23,23,23,0.08)' }}
        >
          <div>
            <div className="text-neutral-900 font-semibold text-sm">Become a partner</div>
            <div className="text-neutral-500 font-inter text-xs mt-0.5">Join our ecosystem and help secure African enterprises together.</div>
          </div>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white shrink-0 transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #E87722, #F5A623)', boxShadow: '0 4px 16px rgba(232,119,34,0.2)' }}
          >
            Partner With Us
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.5}/>
          </a>
        </motion.div>
      </div>

      <style>{`
        .marquee-outer {
          display: flex;
          overflow: hidden;
          user-select: none;
        }
        .marquee-track {
          display: flex;
          animation: scrollMarquee 40s linear infinite;
        }
        @keyframes scrollMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .marquee-outer:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
