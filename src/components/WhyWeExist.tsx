import React from 'react';
import { motion } from 'framer-motion';

export const WhyWeExist: React.FC = () => {
  return (
    <section id="why" className="relative bg-[#F3EDE2] py-16 sm:py-24 md:py-32 lg:py-36 overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'linear-gradient(rgba(23,23,23,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}/>
        {/* Top-right amber bloom */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 65%)', filter: 'blur(80px)' }}/>
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(23,23,23,0.1) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.15) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3 py-1.5 rounded-full border border-[#E87722]/25 bg-[#E87722]/[0.07]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722] shrink-0 animate-pulse"/>
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] text-[#E87722] uppercase">
              Why we exist
            </span>
          </div>

          {/* Heading — Space Grotesk, the site's primary display font */}
          <h2 className="font-sans font-bold tracking-[-0.03em] leading-[1.05] text-neutral-900 mb-5 sm:mb-8"
            style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            Confidence<br/>before crisis.
          </h2>

          {/* Body — Inter, matching site body copy style */}
          <p className="font-inter leading-relaxed text-neutral-600 mx-auto max-w-2xl"
            style={{ fontSize: 'clamp(14px, 1.8vw, 17px)' }}>
            Organizations should not have to wait for a breach, failed audit, or security incident to understand their risk. Drocol helps organizations identify weaknesses early, make better security decisions, and build resilience before a crisis happens.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
