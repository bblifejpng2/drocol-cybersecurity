import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, GraduationCap, Cpu } from 'lucide-react';

const pillars = [
  {
    icon: <ShieldCheck size={20} strokeWidth={1.6}/>,
    title: 'Expertise',
    body: 'Certified consultants who translate security into business language — so risk decisions are made with confidence, not guesswork.',
  },
  {
    icon: <Search size={20} strokeWidth={1.6}/>,
    title: 'Research',
    body: 'Original research that maps the threats most relevant to African organizations, published openly to raise the whole market.',
  },
  {
    icon: <GraduationCap size={20} strokeWidth={1.6}/>,
    title: 'Education',
    body: 'Training and awareness that build real security capability inside every client — so protection survives after we leave.',
  },
  {
    icon: <Cpu size={20} strokeWidth={1.6}/>,
    title: 'Technology',
    body: 'AI-powered tooling that automates the repeatable work, freeing our experts to focus on the complex problems only humans can solve.',
  },
];

export const CompanyMission: React.FC = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #170D06 0%, #120B06 45%, #0E0805 100%)' }}>

      {/* ── Background: amber ambience + warm grid + noise ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -left-32 w-[700px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.16) 0%, transparent 65%)', filter: 'blur(100px)' }}/>
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(245,166,35,0.10) 0%, transparent 65%)', filter: 'blur(110px)' }}/>
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,220,160,0.4) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}/>
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{
          background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.5) 50%, transparent)',
        }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/25 bg-[#E87722]/[0.1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#E87722] uppercase">Our mission</span>
          </div>
          <h2 className="font-bold tracking-[-0.03em] leading-[1.05] text-white mb-6"
            style={{ fontSize: 'clamp(28px, 4.5vw, 54px)' }}>
            Make world-class cybersecurity{' '}
            <span className="italic text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(90deg, #E87722 0%, #F5A623 60%, #E87722 100%)',
              display: 'inline-block',
              padding: '0.12em 0.18em',
              margin: '-0.12em -0.18em',
            }}>accessible to Africa.</span>
          </h2>
          <p className="text-white/50 font-inter text-[15px] sm:text-[16px] leading-relaxed max-w-2xl">
            We exist so African organizations can grow with confidence — building security that becomes the
            foundation of their success, not a barrier to it. That mission shapes everything we do.
          </p>
        </motion.div>

        {/* ── Content: mission pillars + company image ── */}
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">

          {/* Left: pillars in a 2×2 grid */}
          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl border p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#E87722]/35"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', boxShadow: '0 0 0 1px rgba(232,119,34,0.04)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-[#E87722]/20"
                  style={{ background: 'rgba(232,119,34,0.12)', color: '#E87722' }}>
                  {pillar.icon}
                </div>
                <h3 className="text-[15px] font-bold text-white mb-2 tracking-tight">{pillar.title}</h3>
                <p className="text-[12.5px] text-white/45 font-inter leading-relaxed">{pillar.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: framed company image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[32px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(232,119,34,0.22) 0%, transparent 65%)', filter: 'blur(40px)' }}/>
            <div className="relative rounded-3xl overflow-hidden group"
              style={{
                border: '1px solid rgba(232,119,34,0.35)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,220,160,0.12), 0 0 60px rgba(232,119,34,0.08)',
                background: '#170D06',
              }}>
              <img
                src="/company-image.webp"
                alt="The Drocol team"
                loading="lazy"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
                draggable={false}
              />
              {/* top accent line */}
              <div className="absolute top-0 inset-x-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.9) 50%, transparent)' }}/>
              {/* bottom caption bar */}
              <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-5 py-3.5"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(10,5,2,0.85) 70%)' }}>
                <div className="font-mono text-[11px] tracking-widest text-[#F5A623] uppercase">Drocol Technologies</div>
                <div className="font-inter text-[11px] text-white/60">Lagos · Nigeria</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
