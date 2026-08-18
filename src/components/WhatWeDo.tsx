import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, BookOpen, Users, Cpu } from 'lucide-react';

const services = [
  {
    icon: <Search size={22} strokeWidth={1.6}/>,
    title: 'Assess',
    description: 'Identify vulnerabilities, weaknesses, and attack paths across your applications, infrastructure, APIs, and cloud environments.',
    items: [
      'Vulnerability Assessment & Penetration Testing',
      'Web Application Security',
      'API Security',
      'External Attack Surface Assessment',
      'Internal Network Security',
      'Cloud Security',
    ],
    cta: 'Explore Assessments',
    anchor: 'assess',
    color: '#3b82f6',
  },
  {
    icon: <BookOpen size={22} strokeWidth={1.6}/>,
    title: 'Advise',
    description: 'Turn security risks into practical decisions, stronger security programs, and measurable improvements.',
    items: [
      'Cybersecurity Strategy',
      'Risk Assessment',
      'NDPA Compliance',
      'ISO 27001',
      'PCI DSS',
      'Security Architecture',
      'vCISO',
    ],
    cta: 'Explore Advisory',
    anchor: 'advise',
    color: '#8b5cf6',
  },
  {
    icon: <Users size={22} strokeWidth={1.6}/>,
    title: 'Train',
    description: 'Build the knowledge and capabilities your people need to recognize, prevent, and respond to security threats.',
    items: [
      'Security Awareness',
      'Cybersecurity Training',
      'Secure Development Training',
      'Incident Response Exercises',
    ],
    cta: 'Explore Training',
    anchor: 'train',
    color: '#10b981',
  },
  {
    icon: <Cpu size={22} strokeWidth={1.6}/>,
    title: 'Build',
    description: 'Build security capabilities, automation, and technology that make security more effective and scalable.',
    items: [
      'Security Engineering',
      'Security Automation',
      'AI Security',
      'Security Integrations',
    ],
    cta: 'Explore Technology',
    anchor: 'build',
    color: '#E87722',
  },
];

export const WhatWeDo: React.FC = () => {
  return (
    <section className="relative bg-[#F8EFD2] py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* ── Background: fine grid + amber bloom + noise ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(26,26,26,0.1) 0px, rgba(26,26,26,0.1) 1px, transparent 1px, transparent 80px)',
        }}/>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.10]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 65%)', filter: 'blur(80px)' }}/>
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.25) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,26,26,0.08) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#E87722] uppercase">What we do</span>
          </div>
          <h2 className="font-sans font-bold tracking-[-0.03em] leading-[1.05] text-[#1A1A1A]"
            style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            What We Do
          </h2>
          <p className="text-[#1A1A1A]/60 font-inter mt-4 max-w-xl" style={{ fontSize: 'clamp(13px, 1.5vw, 16px)' }}>
            From identifying vulnerabilities to building long-term security capabilities, Drocol helps organizations understand and improve their security.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <div className="group relative flex flex-col h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  borderColor: 'rgba(26,26,26,0.1)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
                }}>
                {/* Accent stripe */}
                <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}40)` }}/>

                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${s.color}15`, color: s.color }}>
                  {s.icon}
                </div>

                <h3 className="text-[19px] font-bold text-[#1A1A1A] tracking-tight mb-2">{s.title}</h3>
                <p className="text-[13px] text-[#1A1A1A]/60 font-inter leading-relaxed mb-4">{s.description}</p>

                {/* Services */}
                <ul className="space-y-1.5 mb-5 flex-1">
                  {s.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-[12px] font-inter text-[#1A1A1A]/70 leading-snug">
                      <span className="mt-[7px] shrink-0 w-[4px] h-[4px] rounded-full" style={{ background: s.color }}/>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={`/solutions#${s.anchor}`}
                  className="inline-flex items-center gap-2 font-semibold text-[13px] transition-colors duration-200 pt-3 border-t"
                  style={{ color: s.color, borderColor: 'rgba(26,26,26,0.08)' }}
                >
                  {s.cta} <ArrowRight size={13} strokeWidth={2.5}/>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
