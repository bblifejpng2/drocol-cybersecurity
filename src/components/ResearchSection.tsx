import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const chips = [
  'Annual threat reports',
  'Technical publications',
  'Security advisories',
  'Open-source projects',
  'Vulnerability research',
  'Industry analysis',
  'Case studies',
];

export const ResearchSection: React.FC = () => {
  return (
    <section id="research" className="relative bg-[#F3EDE2] py-24 md:py-32 overflow-hidden">

      {/* ── Background: cream + fine cross-hatch + amber bloom ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Fine cross-hatch */}
        <div className="absolute inset-0 opacity-[0.045]" style={{
          backgroundImage: 'linear-gradient(rgba(23,23,23,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}/>
        {/* Top-left amber bloom */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(80px)' }}/>
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(23,23,23,0.1) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.12) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
              <span className="text-[11px] font-inter font-semibold tracking-widest text-[#E87722] uppercase">Research</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] text-neutral-900 mb-8">
              Built on research.
            </h2>
            <div className="space-y-4 text-[16px] text-neutral-600 font-inter leading-relaxed mb-8">
              <p>The cybersecurity industry moves quickly. The organizations that stay ahead are the ones that never stop learning.</p>
              <p>Research is part of how we work. We're building a long-term research program focused on emerging threats, industry trends, technical analysis, and practical guidance for organizations operating across Africa.</p>
              <p>Instead of simply consuming knowledge, we're committed to contributing it.</p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #E87722 0%, #F5A623 100%)',
                boxShadow: '0 0 0 1px rgba(232,119,34,0.3), 0 4px 20px rgba(232,119,34,0.2)',
              }}
            >
              Get in touch
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.5}/>
            </Link>
          </motion.div>

          {/* Right: chips grid */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pt-20"
          >
            <div className="flex flex-wrap gap-3" aria-label="Planned research output">
              {chips.map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-[12px] tracking-[0.04em] rounded-xl border border-neutral-900/10 px-4 py-2.5 text-neutral-700 cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E87722]/30 hover:text-[#E87722]"
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
                  }}
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
