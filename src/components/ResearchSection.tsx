import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SpecularButton, specularPrimary } from './SpecularButton';

const index = [
  { title: 'Annual threat reports', tag: 'Reports', year: '2026' },
  { title: 'Technical publications', tag: 'Papers', year: 'Ongoing' },
  { title: 'Security advisories', tag: 'Advisories', year: 'Live' },
  { title: 'Open-source projects', tag: 'Open source', year: 'Ongoing' },
  { title: 'Vulnerability research', tag: 'Research', year: '2026' },
  { title: 'Industry analysis', tag: 'Analysis', year: 'Quarterly' },
  { title: 'Case studies', tag: 'Studies', year: 'Ongoing' },
];

export const ResearchSection: React.FC = () => {
  return (
    <section id="research" className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #150D08 0%, #0E0805 100%)' }}>

      {/* ── Background: amber ambience + warm grid + noise ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-44 -left-40 w-[700px] h-[480px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.16) 0%, transparent 65%)', filter: 'blur(100px)' }}/>
        <div className="absolute -bottom-40 right-0 w-[600px] h-[420px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(245,166,35,0.09) 0%, transparent 65%)', filter: 'blur(110px)' }}/>
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
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-start">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/25 bg-[#E87722]/[0.1]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
              <span className="font-mono text-[11px] font-semibold tracking-widest text-[#E87722] uppercase">Research</span>
            </div>
            <h2 className="font-bold tracking-[-0.03em] leading-[1.05] text-white mb-8"
              style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
              Built on{' '}
              <span className="italic text-transparent bg-clip-text" style={{
                backgroundImage: 'linear-gradient(90deg, #E87722 0%, #F5A623 60%, #E87722 100%)',
                display: 'inline-block',
                padding: '0.12em 0.18em',
                margin: '-0.12em -0.18em',
              }}>research.</span>
            </h2>
            <div className="space-y-4 text-[15px] text-white/50 font-inter leading-relaxed mb-8 max-w-xl">
              <p>The cybersecurity industry moves quickly. The organizations that stay ahead are the ones that never stop learning.</p>
              <p>Research is part of how we work — a long-term program focused on emerging threats, industry trends, technical analysis, and practical guidance for organizations operating across Africa.</p>
              <p>Instead of simply consuming knowledge, we're committed to contributing it.</p>
            </div>
            <SpecularButton
              {...specularPrimary}
              size="md"
              to="/contact"
            >
              Get in touch
              <ArrowRight size={14} strokeWidth={2.5}/>
            </SpecularButton>
          </motion.div>

          {/* Right: publication index card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[36px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(232,119,34,0.14) 0%, transparent 65%)', filter: 'blur(40px)' }}/>

            <div className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(232,119,34,0.22)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,160,0.08)',
              }}>
              {/* Card header */}
              <div className="flex items-center justify-between px-5 md:px-7 py-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">Publication index</div>
                <div className="font-mono text-[10px] tracking-[0.22em] text-[#F5A623]">01 — 07</div>
              </div>

              {/* Index rows */}
              <ul className="divide-y divide-white/[0.06]">
                {index.map((item, i) => (
                  <li key={item.title}>
                    <motion.a
                      href="/contact"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex items-center gap-4 md:gap-6 px-5 md:px-7 py-4 transition-colors duration-200 hover:bg-[#E87722]/[0.06]"
                    >
                      <span className="font-mono text-[11px] text-[#F5A623]/60 w-7 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[14px] md:text-[15px] font-semibold text-white group-hover:text-[#F5A623] transition-colors duration-200 truncate">
                          {item.title}
                        </span>
                        <span className="block font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase mt-0.5">{item.year}</span>
                      </span>
                      <span className="hidden sm:inline-flex font-mono text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border border-white/10 text-white/50 group-hover:border-[#E87722]/40 group-hover:text-[#F5A623] transition-colors duration-200">
                        {item.tag}
                      </span>
                      <ArrowUpRight size={15} strokeWidth={2}
                        className="text-[#E87722] opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shrink-0"/>
                    </motion.a>
                  </li>
                ))}
              </ul>

              {/* Card footer */}
              <div className="flex items-center gap-3 px-5 md:px-7 py-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(232,119,34,0.04)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E87722] animate-pulse shrink-0"/>
                <p className="font-inter text-[12px] text-white/45">
                  All output is published openly — free to read, share, and build on.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
