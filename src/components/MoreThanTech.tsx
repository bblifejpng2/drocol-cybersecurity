import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, UserCheck, GitBranch, Heart } from 'lucide-react';

const pillars = [
  {
    icon: <Monitor size={22} strokeWidth={1.6}/>,
    title: 'Technology',
    body: 'Security tools create visibility — but only what they are configured to see. The right platform accelerates detection, maps attack paths, and reduces manual effort so experts can focus on what matters.',
    examples: ['Threat detection', 'Automated scanning', 'Attack path mapping'],
    color: '#3b82f6',
  },
  {
    icon: <UserCheck size={22} strokeWidth={1.6}/>,
    title: 'People',
    body: 'Experience creates understanding. Skilled security professionals interpret what tools surface, make judgment calls under pressure, and communicate risk in terms the business actually understands.',
    examples: ['Expert analysis', 'Incident response', 'Risk communication'],
    color: '#8b5cf6',
  },
  {
    icon: <GitBranch size={22} strokeWidth={1.6}/>,
    title: 'Process',
    body: 'Good decisions create resilience. Consistent, documented processes ensure that security holds even when people change, systems evolve, and new threats emerge. Discipline is what makes security repeatable.',
    examples: ['Change management', 'Vulnerability tracking', 'Compliance workflows'],
    color: '#10b981',
  },
  {
    icon: <Heart size={22} strokeWidth={1.6}/>,
    title: 'Culture',
    body: 'Organizations become secure when security becomes part of how they operate — not a department, not a checkbox. When every team member understands their role, the entire organization becomes harder to compromise.',
    examples: ['Security awareness', 'Leadership buy-in', 'Shared responsibility'],
    color: '#E87722',
  },
];

export const MoreThanTech: React.FC = () => {
  return (
    <section className="relative bg-[#F3EDE2] py-24 md:py-32 overflow-hidden">

      {/* ── Background: cream + wavy contour lines ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Concentric oval contour lines (topographic feel) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.055]" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" fill="none">
          {[160,220,280,340,400,460].map((r,i) => (
            <ellipse key={i} cx="720" cy="350" rx={r * 2.2} ry={r} stroke="rgba(23,23,23,0.5)" strokeWidth="1"/>
          ))}
        </svg>
        {/* Bottom amber wash */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(80px)' }}/>
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(23,23,23,0.1) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.15) 50%, transparent)' }}/>
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
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
            <span className="text-[11px] font-inter font-semibold tracking-widest text-[#E87722] uppercase">What security requires</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] text-neutral-900 mb-4">
            Security is more<br/>than technology.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-neutral-600 font-inter leading-relaxed max-w-xl">
            A firewall does not make an organization secure. Neither does a single policy document or an annual training. Real security is the result of four things working together — and a weakness in any one of them creates exposure.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col gap-4 rounded-2xl border border-neutral-900/10 p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${p.color}15`, color: p.color }}>
                {p.icon}
              </div>
              <div className="w-6 h-[2px] rounded-full" style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}60)` }}/>
              <h3 className="text-[18px] font-bold text-neutral-900 tracking-tight">{p.title}</h3>
              <p className="text-[14px] text-neutral-600 font-inter leading-relaxed flex-1">{p.body}</p>
              {/* Example tags */}
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-neutral-900/[0.07] mt-auto">
                {p.examples.map(ex => (
                  <span key={ex} className="font-mono text-[9px] tracking-wide px-2.5 py-1 rounded-full border"
                    style={{ color: p.color, background: `${p.color}0d`, borderColor: `${p.color}22` }}>
                    {ex}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 px-6 py-5 rounded-2xl border border-neutral-900/10"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          <div className="shrink-0 w-1 h-10 rounded-full" style={{ background: 'linear-gradient(180deg, #F2A95C, #E8862E)' }}/>
          <p className="text-[20px] sm:text-[24px] font-bold text-neutral-900 tracking-tight">
            Real cybersecurity requires{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #E87722, #F5A623)' }}>
              all four.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  );
};
