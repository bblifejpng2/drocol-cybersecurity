import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const stanzaLines = [
  'Every assessment we perform.',
  'Every report we publish.',
  'Every product we build.',
  'Every conversation we have.',
];

export const Vision: React.FC = () => {
  const navigate = useNavigate();
  const goToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/contact');
  };

  return (
    <section className="relative bg-[#F3EDE2] py-24 md:py-32 overflow-hidden">

      {/* ── Background: cream + starburst radial lines ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Starburst from top-left */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" fill="none" stroke="rgba(23,23,23,0.4)" strokeWidth="1">
          {Array.from({length: 18}, (_,i) => {
            const angle = (i / 18) * Math.PI * 2;
            const x2 = Math.round(-200 + Math.cos(angle) * 2000);
            const y2 = Math.round(-200 + Math.sin(angle) * 2000);
            return <line key={i} x1="-200" y1="-200" x2={x2} y2={y2}/>;
          })}
        </svg>
        {/* Top-left amber origin */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[400px] rounded-full opacity-[0.09]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 65%)', filter: 'blur(70px)' }}/>
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(23,23,23,0.1) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: heading + stanza */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
              <span className="text-[11px] font-inter font-semibold tracking-widest text-[#E87722] uppercase">Our vision</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] text-neutral-900 mb-6">
              We're building more<br/>than a consultancy.
            </h2>
            <p className="text-[16px] text-neutral-600 font-inter leading-relaxed mb-10 max-w-[52ch]">
              We're building a company that contributes to the future of cybersecurity through expertise, research, education, and technology.
            </p>
            <a
              href="/contact"
              onClick={goToContact}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #E87722 0%, #F5A623 100%)',
                boxShadow: '0 0 0 1px rgba(232,119,34,0.3), 0 8px 32px rgba(232,119,34,0.25)',
              }}
            >
              Let's talk
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.5}/>
            </a>
          </motion.div>

          {/* Right: stanza glass card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-2xl border border-neutral-900/10 p-8"
              style={{
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              {/* Orange accent stripe */}
              <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl"
                style={{ background: 'linear-gradient(90deg, transparent, #E87722, transparent)' }}/>

              <div className="flex flex-col gap-4">
                {stanzaLines.map((line, i) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E87722] shrink-0"/>
                    <span className="text-[18px] sm:text-[20px] font-bold text-neutral-900 tracking-tight">{line}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-900/08">
                <p className="text-[14px] text-neutral-600 font-inter italic">
                  Each one moves us a step closer to that future.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
