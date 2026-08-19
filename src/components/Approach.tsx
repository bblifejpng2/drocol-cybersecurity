import React from 'react';
import { motion } from 'framer-motion';
import MagicBento from './MagicBento';

const approachCards = [
  { color: '#0D0600', label: 'Phase 01', title: 'Understand', description: 'Learn about your organization, environment, objectives, and risks.' },
  { color: '#0D0600', label: 'Phase 02', title: 'Assess', description: 'Identify vulnerabilities, weaknesses, and security gaps.' },
  { color: '#0D0600', label: 'Phase 03', title: 'Prioritize', description: 'Determine which risks require immediate attention.' },
  { color: '#0D0600', label: 'Phase 04', title: 'Improve', description: 'Implement practical security improvements.' },
  { color: '#0D0600', label: 'Phase 05', title: 'Verify', description: 'Validate that the improvements have actually reduced the risk.' },
];

const phases = [
  { num: '01', title: 'Understand', body: 'Learn your organization, environment, objectives, and risk landscape before anything else.' },
  { num: '02', title: 'Assess', body: 'Identify vulnerabilities, weaknesses, and security gaps across every surface.' },
  { num: '03', title: 'Prioritize', body: 'Rank risk by real-world impact — not severity scores alone.' },
  { num: '04', title: 'Improve', body: 'Implement targeted, practical security improvements that actually fit your environment.' },
  { num: '05', title: 'Verify', body: 'Confirm the improvements worked. Close the loop. Repeat.' },
];

export const Approach: React.FC = () => {
  return (
    <section id="approach" className="relative bg-[#0F0905] py-20 sm:py-28 md:py-36 overflow-hidden">

      {/* ── Fluid background blobs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="fluid-bg">
          <span className="fluid-blob fluid-blob--1"/>
          <span className="fluid-blob fluid-blob--2"/>
          <span className="fluid-blob fluid-blob--3"/>
          <span className="fluid-blob fluid-blob--4"/>
        </div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 40%, transparent 0%, rgba(15,9,5,0.5) 80%, rgba(15,9,5,0.88) 100%)',
        }}/>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.35) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.2) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Top label + headline — full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#E87722] uppercase">Our approach</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-bold tracking-[-0.03em] leading-[1.05] text-white max-w-2xl"
              style={{ fontSize: 'clamp(28px, 4.5vw, 56px)' }}>
              We don't begin with tools.{' '}
              <span className="font-light italic text-[#E87722]">We begin with understanding.</span>
            </h2>
            <p className="text-white/45 font-inter text-[14px] sm:text-[15px] leading-relaxed max-w-sm lg:text-right lg:pb-1">
              Five phases. One goal — security that actually works for your organization.
            </p>
          </div>
        </motion.div>

        {/* ── Two-column body ── */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 xl:gap-16 items-start">

          {/* Left — numbered phase list */}
          <div className="flex flex-col gap-0">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex gap-5 pb-8 last:pb-0"
              >
                {/* vertical connector line */}
                {i < phases.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px"
                    style={{ background: 'linear-gradient(180deg, rgba(232,119,34,0.3) 0%, rgba(232,119,34,0.05) 100%)' }}/>
                )}

                {/* number badge */}
                <div className="shrink-0 w-10 h-10 rounded-full border border-[#E87722]/30 bg-[#E87722]/[0.08] flex items-center justify-center z-10
                  group-hover:border-[#E87722]/70 group-hover:bg-[#E87722]/[0.15] transition-all duration-300">
                  <span className="font-mono text-[11px] font-bold text-[#E87722]">{phase.num}</span>
                </div>

                {/* text */}
                <div className="pt-1.5">
                  <h3 className="text-white font-semibold text-[16px] tracking-tight mb-1
                    group-hover:text-[#E87722] transition-colors duration-300">
                    {phase.title}
                  </h3>
                  <p className="text-white/45 font-inter text-[13px] leading-relaxed">{phase.body}</p>
                </div>
              </motion.div>
            ))}

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex items-start gap-4 rounded-2xl border px-5 py-4"
              style={{ background: 'rgba(232,119,34,0.06)', borderColor: 'rgba(232,119,34,0.2)' }}
            >
              <div className="shrink-0 mt-1 w-1 h-8 rounded-full" style={{ background: 'linear-gradient(180deg, #F2A95C, #E8862E)' }}/>
              <p className="text-[13px] text-white/65 font-inter leading-relaxed">
                <span className="text-white font-semibold">Our work doesn't end with a report.</span>{' '}
                We help you understand what needs to change, how to change it, and whether the improvement actually worked.
              </p>
            </motion.div>
          </div>

          {/* Right — MagicBento */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end lg:sticky lg:top-28"
          >
            <MagicBento
              textAutoHide
              enableStars
              enableSpotlight
              enableBorderGlow
              enableTilt={false}
              enableMagnetism={false}
              clickEffect
              spotlightRadius={400}
              particleCount={12}
              glowColor="232, 119, 34"
              disableAnimations={false}
              cards={approachCards}
            />
          </motion.div>

        </div>
      </div>

      <style>{`
        .fluid-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .fluid-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          will-change: transform;
        }
        .fluid-blob--1 {
          width: 48%;
          height: 60%;
          left: -8%;
          top: 6%;
          background: radial-gradient(circle, rgba(232,119,34,0.5) 0%, transparent 70%);
          animation: fluidDrift1 24s ease-in-out infinite alternate;
        }
        .fluid-blob--2 {
          width: 42%;
          height: 55%;
          right: -6%;
          top: 18%;
          background: radial-gradient(circle, rgba(245,166,35,0.42) 0%, transparent 70%);
          animation: fluidDrift2 28s ease-in-out infinite alternate;
        }
        .fluid-blob--3 {
          width: 40%;
          height: 50%;
          left: 22%;
          bottom: -12%;
          background: radial-gradient(circle, rgba(138,69,13,0.55) 0%, transparent 70%);
          animation: fluidDrift3 21s ease-in-out infinite alternate;
        }
        .fluid-blob--4 {
          width: 34%;
          height: 44%;
          right: 14%;
          bottom: 6%;
          background: radial-gradient(circle, rgba(255,140,26,0.3) 0%, transparent 70%);
          animation: fluidDrift4 26s ease-in-out infinite alternate;
        }
        @keyframes fluidDrift1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(14vw, 9vh) scale(1.18); }
        }
        @keyframes fluidDrift2 {
          from { transform: translate(0, 0) scale(1.1); }
          to   { transform: translate(-12vw, 11vh) scale(0.95); }
        }
        @keyframes fluidDrift3 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(9vw, -10vh) scale(1.15); }
        }
        @keyframes fluidDrift4 {
          from { transform: translate(0, 0) scale(1.08); }
          to   { transform: translate(-8vw, -8vh) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fluid-blob { animation: none; }
        }
      `}</style>
    </section>
  );
};
