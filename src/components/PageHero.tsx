import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  label: string;
  title: React.ReactNode;
  intro?: string;
  theme?: 'dark' | 'light';
}

/** Shared hero header for sub-pages (Solutions / Technology / Research). */
export const PageHero: React.FC<PageHeroProps> = ({ label, title, intro, theme = 'dark' }) => {
  const light = theme === 'light';
  return (
    <section className={`relative pt-32 pb-14 sm:pt-40 sm:pb-20 md:pt-44 md:pb-24 overflow-hidden ${light ? 'bg-[#F8EFD2]' : 'bg-[#080808]'}`}>
      {/* ── Background: fine grid + amber bloom + noise ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: light
            ? 'repeating-linear-gradient(90deg, rgba(26,26,26,0.1) 0px, rgba(26,26,26,0.1) 1px, transparent 1px, transparent 80px)'
            : 'repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 80px)',
        }}/>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 65%)', filter: 'blur(80px)', opacity: light ? 0.16 : 0.1 }}/>
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.35) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#E87722] uppercase">{label}</span>
          </div>
          <h1 className={`font-sans font-bold tracking-[-0.03em] leading-[1.05] max-w-3xl ${light ? 'text-[#1A1A1A]' : 'text-white'}`}
            style={{ fontSize: 'clamp(30px, 5.5vw, 60px)' }}>
            {title}
          </h1>
          {intro && (
            <p className={`font-inter mt-5 max-w-2xl ${light ? 'text-[#1A1A1A]/60' : 'text-white/50'}`} style={{ fontSize: 'clamp(14px, 1.6vw, 17px)' }}>
              {intro}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};
