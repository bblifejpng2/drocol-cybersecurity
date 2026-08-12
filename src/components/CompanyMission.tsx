import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, GraduationCap, Cpu } from 'lucide-react';

const pillars = [
  {
    icon: <ShieldCheck size={22} strokeWidth={1.6}/>,
    title: 'Expertise',
    body: 'Certified consultants who translate security into business language — so risk decisions are made with confidence, not guesswork.',
  },
  {
    icon: <Search size={22} strokeWidth={1.6}/>,
    title: 'Research',
    body: 'Original research that maps the threats most relevant to African organizations, published openly to raise the whole market.',
  },
  {
    icon: <GraduationCap size={22} strokeWidth={1.6}/>,
    title: 'Education',
    body: 'Training and awareness that build real security capability inside every client — so protection survives after we leave.',
  },
  {
    icon: <Cpu size={22} strokeWidth={1.6}/>,
    title: 'Technology',
    body: 'AI-powered tooling that automates the repeatable work, freeing our experts to focus on the complex problems only humans can solve.',
  },
];

export const CompanyMission: React.FC = () => {
  return (
    <section className="relative bg-[#080808] py-20 md:py-28 overflow-hidden">
      {/* ── Background: faint grid + amber ambient + noise ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}/>
        <div className="absolute -top-32 right-0 w-[600px] h-[400px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 65%)', filter: 'blur(90px)' }}/>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.08]">
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

        {/* Mission pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border p-6"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(232,119,34,0.12)', color: '#E87722' }}>
                {pillar.icon}
              </div>
              <h3 className="text-[16px] font-bold text-white mb-2 tracking-tight">{pillar.title}</h3>
              <p className="text-[13px] text-white/45 font-inter leading-relaxed">{pillar.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
