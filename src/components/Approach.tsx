import React from 'react';
import { motion } from 'framer-motion';
import MagicBento from './MagicBento';

const approachCards = [
  { color: '#0D0600', label: 'Phase 01', title: 'Understand', description: 'We learn how you operate and where your real risks lie — business context before technology.' },
  { color: '#0D0600', label: 'Phase 02', title: 'Discover', description: 'We map what attackers can reach: assets, identities, secrets, and the paths between them.' },
  { color: '#0D0600', label: 'Phase 03', title: 'Prioritize', description: 'Findings ranked by business impact, so the fixes that matter most come first.' },
  { color: '#0D0600', label: 'Phase 04', title: 'Improve', description: 'Practical remediation guidance — moving from findings to measurable change.' },
  { color: '#0D0600', label: 'Phase 05', title: 'Verify', description: 'Re-testing and validation to confirm the remediation actually holds.' },
  { color: '#0D0600', label: 'Phase 06', title: 'Sustain', description: 'Continuous improvement so security keeps pace as your business evolves.' },
];

export const Approach: React.FC = () => {
  return (
    <section id="approach" className="relative bg-[#0F0905] py-16 sm:py-24 md:py-32 overflow-hidden">

      {/* ── Background: circuit-board lines + dual glow ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1">
          <line x1="0" y1="175" x2="1440" y2="175"/>
          <line x1="0" y1="350" x2="1440" y2="350"/>
          <line x1="0" y1="525" x2="1440" y2="525"/>
          <line x1="240" y1="0" x2="240" y2="700"/>
          <line x1="720" y1="0" x2="720" y2="700"/>
          <line x1="1200" y1="0" x2="1200" y2="700"/>
          {[[240,175],[720,175],[1200,175],[240,350],[720,350],[1200,350],[240,525],[720,525],[1200,525]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="rgba(232,119,34,0.4)" stroke="none"/>
          ))}
        </svg>
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(80px)' }}/>
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)', filter: 'blur(80px)' }}/>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 50%, transparent)' }}/>
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
            <span className="text-white/40 font-light italic">We begin with understanding.</span>
          </h2>
          <p className="text-white/50 font-inter text-[15px] sm:text-[16px] leading-relaxed">
            Every engagement follows the same disciplined process — from understanding your business context to verifying that improvements have actually landed.
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
            Security improves when recommendations are implemented — and we stay with you until they are.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
