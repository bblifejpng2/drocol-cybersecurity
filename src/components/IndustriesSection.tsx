import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, HeartPulse, Code2, Flag, Factory, Briefcase } from 'lucide-react';
import BorderGlow from './BorderGlow';

const industries = [
  {
    icon: <Landmark size={22} strokeWidth={1.6}/>,
    title: 'Financial services',
    body: "Nigeria's most regulated sector. Fraud pressure, CBN expectations, and customer trust — all at the same time. Security here must be continuous, not annual.",
    tags: ['CBN Compliance', 'NDPA', 'PCI DSS'],
    color: '#3b82f6',
    hsl: '217 91 60',
  },
  {
    icon: <HeartPulse size={22} strokeWidth={1.6}/>,
    title: 'Healthcare',
    body: 'Patient records are among the most sensitive data any organization holds. Protecting them is both a legal duty under the NDPA and a matter of basic trust.',
    tags: ['NDPA', 'HL7 Security'],
    color: '#ef4444',
    hsl: '0 84 60',
  },
  {
    icon: <Code2 size={22} strokeWidth={1.6}/>,
    title: 'Technology',
    body: 'For SaaS and product companies, security is part of the product. Customers ask hard questions during procurement. Good answers win deals.',
    tags: ['SOC 2', 'ISO 27001'],
    color: '#8b5cf6',
    hsl: '258 90 66',
  },
  {
    icon: <Flag size={22} strokeWidth={1.6}/>,
    title: 'Government',
    body: 'Public institutions hold data citizens cannot take back. Securing critical services and legacy systems requires patience, precision, and care.',
    tags: ['NITDA Guidelines', 'Critical Infra'],
    color: '#10b981',
    hsl: '160 84 39',
  },
  {
    icon: <Factory size={22} strokeWidth={1.6}/>,
    title: 'Manufacturing',
    body: 'As operations connect, operational technology meets the internet. Downtime is expensive. Prevention costs less than recovery.',
    tags: ['OT Security', 'ICS'],
    color: '#f59e0b',
    hsl: '38 92 50',
  },
  {
    icon: <Briefcase size={22} strokeWidth={1.6}/>,
    title: 'Professional services',
    body: 'Law firms, accountants, and consultancies are trusted with client secrets and targeted through email. Confidentiality is the business.',
    tags: ['Email Security', 'NDPA'],
    color: '#06b6d4',
    hsl: '189 94 43',
  },
];

export const IndustriesSection: React.FC = () => {
  return (
    <section id="industries" className="relative bg-[#F3EDE2] py-24 md:py-32 overflow-hidden">

      {/* ── Background: cream + scattered radial dot bursts ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Offset halftone — larger dots, sparser */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.5) 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
        }}/>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.35) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '20px 20px',
        }}/>
        {/* Bottom-right amber bloom */}
        <div className="absolute bottom-0 right-0 w-[700px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(90px)' }}/>
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
            <span className="text-[11px] font-inter font-semibold tracking-widest text-[#E87722] uppercase">Industries</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] text-neutral-900 mb-4">
            Cybersecurity isn't<br/>the same everywhere.
          </h2>
          <p className="text-neutral-600 font-inter text-[16px] leading-relaxed">
            Every industry faces different threats, regulations, and operational realities. Understanding those differences is where good security begins.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <BorderGlow
                persistent
                glowColor={ind.hsl}
                backgroundColor="#ffffff"
                borderRadius={16}
                glowRadius={22}
                glowIntensity={0.9}
                coneSpread={25}
                edgeSensitivity={25}
                fillOpacity={0.3}
                colors={[ind.color, ind.color, ind.color]}
                className="h-full"
              >
                <div className="flex flex-col gap-4 p-6 h-full">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${ind.color}15`, color: ind.color }}>
                    {ind.icon}
                  </div>

                  <h3 className="text-[18px] font-bold text-neutral-900 tracking-tight">{ind.title}</h3>
                  <p className="text-[14px] text-neutral-600 font-inter leading-relaxed flex-1">{ind.body}</p>

                  {/* Compliance tags */}
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {ind.tags.map(tag => (
                      <span key={tag} className="font-mono text-[10px] tracking-wide px-2.5 py-1 rounded-full border"
                        style={{ background: `${ind.color}10`, borderColor: `${ind.color}25`, color: ind.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
