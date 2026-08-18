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

export const Approach: React.FC = () => {
  return (
    <section id="approach" className="relative bg-[#0F0905] py-16 sm:py-24 md:py-32 overflow-hidden">

      {/* ── Background: fluid drifting color fields ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="fluid-bg">
          <span className="fluid-blob fluid-blob--1"/>
          <span className="fluid-blob fluid-blob--2"/>
          <span className="fluid-blob fluid-blob--3"/>
          <span className="fluid-blob fluid-blob--4"/>
        </div>
        {/* Vignette so heading + bento cards stay readable over the color fields */}
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#E87722] uppercase">Our approach</span>
          </div>
          <h2 className="font-bold tracking-[-0.03em] leading-[1.05] text-white mb-5"
            style={{ fontSize: 'clamp(28px, 4.5vw, 56px)' }}>
            We don't begin with tools.{' '}
            <span className="font-light italic text-[#E87722]">We begin with understanding.</span>
          </h2>
          <p className="text-white/50 font-inter text-[15px] sm:text-[16px] leading-relaxed">
            Before recommending a solution, we understand your organization, technology, risks, and objectives. We then identify the most important security gaps, prioritize what matters, and help you improve.
          </p>
        </motion.div>

        {/* Bento — the approach at a glance */}
        <div className="flex justify-center mb-10">
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
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 rounded-2xl border px-5 sm:px-6 py-4 sm:py-5"
          style={{ background: 'rgba(232,119,34,0.06)', borderColor: 'rgba(232,119,34,0.2)' }}
        >
          <div className="shrink-0 w-1 h-8 rounded-full" style={{ background: 'linear-gradient(180deg, #F2A95C, #E8862E)' }}/>
          <p className="text-[13px] sm:text-[14px] text-white/70 font-inter leading-relaxed">
            <span className="text-white font-semibold">Our work doesn't end with a report.</span>{' '}
            We help you understand what needs to change, how to change it, and whether the improvement actually worked.
          </p>
        </motion.div>

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
