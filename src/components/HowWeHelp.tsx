import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, BookOpen, Users, Cpu, FileCheck, ShieldAlert, Code2 } from 'lucide-react';
import { SpecularButton } from './SpecularButton';

const steps = [
  {
    num: '01',
    anchor: 'assess',
    title: 'Assess',
    subtitle: 'Find what attackers find — first.',
    body: 'Penetration testing across web applications, APIs, cloud environments, and internal networks. We show you what an attacker would find before an attacker does. Vulnerability assessments and architecture reviews that give you a clear picture of your real exposure.',
    cta: 'Talk to us about assessments',
    ctaId: 'contact',
    icon: <Search size={22} strokeWidth={1.8}/>,
    accentIcon: <ShieldAlert size={28} strokeWidth={1.4}/>,
    color: '#3b82f6',
    tag: 'Offensive Security',
    outcomes: ['Web & API pen testing', 'Cloud security review', 'Architecture analysis', 'Vulnerability assessment'],
  },
  {
    num: '02',
    anchor: 'advise',
    title: 'Advise',
    subtitle: 'Practical guidance, not generic frameworks.',
    body: 'Compliance, risk management, and security strategy built around how your business actually operates — not generic checklists. NDPA, ISO 27001, CBN guidelines, and industry-specific regulations translated into action your team can execute.',
    cta: 'Talk to us about advisory',
    ctaId: 'contact',
    icon: <BookOpen size={22} strokeWidth={1.8}/>,
    accentIcon: <FileCheck size={28} strokeWidth={1.4}/>,
    color: '#8b5cf6',
    tag: 'Compliance & Strategy',
    outcomes: ['NDPA compliance', 'ISO 27001 readiness', 'Risk management', 'Security strategy'],
  },
  {
    num: '03',
    anchor: 'train',
    title: 'Train',
    subtitle: 'People are your first and last line of defence.',
    body: 'Practical awareness training that helps your team recognize real-world threats and respond with confidence. Security tools cannot protect an organization whose people are unprepared. We build the human side of your security.',
    cta: 'Talk to us about training',
    ctaId: 'contact',
    icon: <Users size={22} strokeWidth={1.8}/>,
    accentIcon: <Users size={28} strokeWidth={1.4}/>,
    color: '#10b981',
    tag: 'Security Awareness',
    outcomes: ['Phishing simulations', 'Security awareness', 'Incident response drills', 'Executive briefings'],
  },
  {
    num: '04',
    anchor: 'build',
    title: 'Build',
    subtitle: 'Technology that amplifies expert judgment.',
    body: 'We build AI-powered technology that improves how security assessments are performed — increasing coverage, reducing noise, and giving our consultants more time to solve complex security problems that only humans can solve.',
    cta: 'Explore our technology',
    ctaId: 'technology',
    icon: <Cpu size={22} strokeWidth={1.8}/>,
    accentIcon: <Code2 size={28} strokeWidth={1.4}/>,
    color: '#E87722',
    tag: 'AI-Powered Platform',
    outcomes: ['Automated scanning', 'Attack path mapping', 'AI-assisted triage', 'Developer-ready APIs'],
  },
];

// ── Right-side visual per step ────────────────────────────────
const StepVisual: React.FC<{ step: typeof steps[0]; active: boolean }> = ({ step }) => {
  // Assess — terminal scan output
  if (step.num === '01') {
    const lines = [
      { t: 'cmd',  text: '$ drocol scan --target api.client.ng --deep' },
      { t: 'info', text: 'Initializing assessment engine...' },
      { t: 'info', text: 'Enumerating endpoints — 47 found' },
      { t: 'warn', text: '⚠  SQL injection — /api/v1/users [HIGH]' },
      { t: 'warn', text: '⚠  Broken auth — /api/auth/token [CRITICAL]' },
      { t: 'info', text: 'Scanning cloud posture...' },
      { t: 'ok',   text: '✓  S3 bucket policy — compliant' },
      { t: 'warn', text: '⚠  IAM over-privilege — 3 roles [MEDIUM]' },
      { t: 'done', text: 'Report ready — 12 findings, 3 critical' },
    ];
    return (
      <div className="rounded-xl overflow-hidden border border-white/10 font-mono text-[11px] sm:text-[12px]"
        style={{ background: '#0a0a0a' }}>
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.07]" style={{ background: '#111' }}>
          {['#ef4444','#f59e0b','#22c55e'].map((c,i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }}/>)}
          <span className="ml-2 text-white/30 text-[10px]">drocol-scanner</span>
        </div>
        <div className="p-4 space-y-1.5">
          {lines.map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.3 }}
              className={{ cmd: 'text-white/70', info: 'text-white/40', warn: 'text-[#f59e0b]', ok: 'text-[#22c55e]', done: 'text-[#3b82f6] font-semibold' }[l.t]}>
              {l.text}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Advise — compliance checklist
  if (step.num === '02') {
    const items = [
      { label: 'NDPA Article 2.4 — Data mapping', done: true  },
      { label: 'ISO 27001 A.9 — Access control',  done: true  },
      { label: 'CBN Risk framework — Gap analysis', done: true  },
      { label: 'ISO 27001 A.12 — Operations',      done: false },
      { label: 'NDPA — Breach notification policy', done: false },
    ];
    return (
      <div className="rounded-xl overflow-hidden border border-white/10"
        style={{ background: '#0a0a0a' }}>
        <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between" style={{ background: '#111' }}>
          <span className="font-sans font-semibold text-white text-sm">Compliance Tracker</span>
          <span className="font-mono text-[10px] text-[#8b5cf6] bg-[#8b5cf6]/10 px-2.5 py-1 rounded-full border border-[#8b5cf6]/20">3/5 complete</span>
        </div>
        <div className="p-4 space-y-2.5">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex items-center gap-3 p-3 rounded-lg border"
              style={{ background: item.done ? 'rgba(139,92,246,0.07)' : 'rgba(255,255,255,0.02)', borderColor: item.done ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.06)' }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: item.done ? '#8b5cf6' : 'rgba(255,255,255,0.06)', border: item.done ? 'none' : '1px solid rgba(255,255,255,0.12)' }}>
                {item.done && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span className="font-inter text-[12px]" style={{ color: item.done ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)' }}>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Train — team scorecard
  if (step.num === '03') {
    const members = [
      { name: 'Operations Team',  score: 91, delta: '+12' },
      { name: 'Finance Team',     score: 74, delta: '+28' },
      { name: 'Engineering',      score: 88, delta: '+9'  },
      { name: 'Leadership',       score: 65, delta: '+41' },
    ];
    return (
      <div className="rounded-xl overflow-hidden border border-white/10"
        style={{ background: '#0a0a0a' }}>
        <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between" style={{ background: '#111' }}>
          <span className="font-sans font-semibold text-white text-sm">Security Awareness Score</span>
          <span className="font-mono text-[10px] text-[#10b981] bg-[#10b981]/10 px-2.5 py-1 rounded-full border border-[#10b981]/20">Post-training</span>
        </div>
        <div className="p-4 space-y-3">
          {members.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-inter text-[12px] text-white/70">{m.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#10b981]">{m.delta}</span>
                  <span className="font-mono text-[12px] font-bold text-white">{m.score}%</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: '#10b981' }}
                  initial={{ width: 0 }} animate={{ width: `${m.score}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}/>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Build — API/platform visual
  const endpoints = [
    { method: 'POST', path: '/v1/scan/start',        ms: '42ms',  status: 200 },
    { method: 'GET',  path: '/v1/findings',           ms: '18ms',  status: 200 },
    { method: 'GET',  path: '/v1/attack-paths',       ms: '31ms',  status: 200 },
    { method: 'POST', path: '/v1/remediation/verify', ms: '55ms',  status: 200 },
  ];
  return (
    <div className="rounded-xl overflow-hidden border border-white/10"
      style={{ background: '#0a0a0a' }}>
      <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between" style={{ background: '#111' }}>
        <span className="font-sans font-semibold text-white text-sm">Platform API</span>
        <span className="font-mono text-[10px] text-[#E87722] bg-[#E87722]/10 px-2.5 py-1 rounded-full border border-[#E87722]/20">v1.4 · live</span>
      </div>
      <div className="p-4 space-y-2">
        {endpoints.map((ep, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/[0.06]"
            style={{ background: 'rgba(255,255,255,0.02)' }}>
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded"
              style={{ background: ep.method === 'POST' ? 'rgba(232,119,34,0.15)' : 'rgba(59,130,246,0.15)', color: ep.method === 'POST' ? '#E87722' : '#3b82f6' }}>
              {ep.method}
            </span>
            <span className="font-mono text-[11px] text-white/60 flex-1 truncate">{ep.path}</span>
            <span className="font-mono text-[10px] text-white/30">{ep.ms}</span>
            <span className="font-mono text-[10px] text-[#22c55e]">{ep.status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────
export const HowWeHelp: React.FC = () => {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const navigate = useNavigate();
  const { hash } = useLocation();

  /* Auto-cycle the solutions: each step shows for 3s, the last step lingers
     for a 5s cooldown, then the cycle repeats. Manual clicks still work and
     reset the timer. */
  useEffect(() => {
    const delay = active === steps.length - 1 ? 5000 : 3000;
    const t = window.setTimeout(() => {
      setActive(prev => (prev + 1) % steps.length);
    }, delay);
    return () => window.clearTimeout(t);
  }, [active]);

  /* Deep links from the homepage (What We Do / footer) activate the matching
     step and scroll it into view. */
  useEffect(() => {
    const anchor = hash.replace('#', '');
    const idx = steps.findIndex(s => s.anchor === anchor);
    if (idx === -1) return;
    const t = window.setTimeout(() => {
      setActive(idx);
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => window.clearTimeout(t);
  }, [hash]);

  // CTAs point at other pages (contact / technology) or scroll on the home page
  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (id === 'contact') navigate('/contact');
    else if (id === 'technology') navigate('/technology');
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="help" className="relative bg-[#F8EFD2] py-16 sm:py-24 md:py-32 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(26,26,26,0.1) 0px, rgba(26,26,26,0.1) 1px, transparent 1px, transparent 80px)',
        }}/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-[0.14]"
          style={{ background: 'conic-gradient(from 270deg at 50% 0%, transparent 30%, rgba(232,119,34,0.5) 50%, transparent 70%)', filter: 'blur(60px)' }}/>
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.25) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,26,26,0.08) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#E87722] uppercase">How we help</span>
          </div>
          <h2 className="font-sans font-bold tracking-[-0.03em] leading-[1.05] text-[#1A1A1A]"
            style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            Every organization's<br/>journey is different.
          </h2>
          <p className="text-[#1A1A1A]/60 font-inter mt-4 max-w-xl" style={{ fontSize: 'clamp(13px, 1.5vw, 16px)' }}>
            Our role is to help you understand where you are today and build toward where you need to be tomorrow.
          </p>
        </motion.div>

        {/* Split layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* ── Left: step selector ── */}
          <div className="flex flex-col gap-2">
            {steps.map((s, i) => {
              const isActive = active === i;
              return (
                <motion.button key={s.num} onClick={() => setActive(i)}
                  id={s.anchor}
                  className="group w-full text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E87722] scroll-mt-24"
                  style={{
                    background: isActive ? `${s.color}10` : 'rgba(255,255,255,0.6)',
                    borderColor: isActive ? `${s.color}45` : 'rgba(26,26,26,0.1)',
                    boxShadow: isActive ? `0 0 0 1px ${s.color}25` : 'none',
                  }}>
                  <div className="flex items-center gap-4">
                    {/* Number */}
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-mono font-bold transition-all duration-300"
                      style={{ background: isActive ? s.color : 'rgba(26,26,26,0.06)', color: isActive ? '#fff' : 'rgba(26,26,26,0.4)', fontSize: 'clamp(11px, 1.4vw, 13px)' }}>
                      {s.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Tag + title row */}
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-sans font-bold text-[#1A1A1A] transition-all duration-300"
                          style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', opacity: isActive ? 1 : 0.6 }}>
                          {s.title}
                        </span>
                        <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border hidden sm:inline"
                          style={{ color: s.color, background: `${s.color}12`, borderColor: `${s.color}25` }}>
                          {s.tag}
                        </span>
                      </div>
                      <p className="font-inter text-[#1A1A1A]/55 transition-all duration-300"
                        style={{ fontSize: 'clamp(11px, 1.3vw, 13px)', opacity: isActive ? 1 : 0.6 }}>
                        {s.subtitle}
                      </p>
                    </div>
                    {/* Icon */}
                    <div className="shrink-0 transition-all duration-300"
                      style={{ color: isActive ? s.color : 'rgba(26,26,26,0.3)' }}>
                      {s.icon}
                    </div>
                  </div>

                  {/* Expanded content on mobile */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden lg:hidden">
                        <div className="pt-4 mt-4 border-t border-[#1A1A1A]/10">
                          <p className="font-inter text-[#1A1A1A]/70 mb-3 leading-relaxed text-[13px]">{s.body}</p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {s.outcomes.map(o => (
                              <span key={o} className="font-mono text-[9px] px-2.5 py-1 rounded-full border"
                                style={{ color: s.color, background: `${s.color}0e`, borderColor: `${s.color}22` }}>
                                {o}
                              </span>
                            ))}
                          </div>
                          <a href={`#${s.ctaId}`} onClick={goTo(s.ctaId)}
                            className="inline-flex items-center gap-2 font-semibold text-[13px] transition-all duration-200"
                            style={{ color: s.color }}>
                            {s.cta} <ArrowRight size={13} strokeWidth={2.5}/>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}

            {/* Progress bar */}
            <div className="flex items-center gap-1.5 mt-2 px-1">
              {steps.map((s, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className="h-[3px] rounded-full transition-all duration-500 focus:outline-none"
                  style={{ flex: active === i ? 3 : 1, background: active === i ? s.color : 'rgba(26,26,26,0.15)' }}/>
              ))}
            </div>
          </div>

          {/* ── Right: compact spotlight panel (desktop only) ── */}
          <div className="hidden lg:block lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div key={step.num}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.65)', borderColor: `${step.color}30`, boxShadow: `0 0 0 1px ${step.color}15, 0 20px 48px rgba(26,26,26,0.12)` }}>

                {/* Top accent stripe */}
                <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}/>

                <div className="p-5">
                  {/* Header row — compact */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-mono text-[10px] font-semibold tracking-widest uppercase block mb-1"
                        style={{ color: step.color }}>Step {step.num} · {step.tag}</span>
                      <h3 className="font-sans font-bold text-[#1A1A1A] text-[20px] leading-tight">{step.title}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ml-3"
                      style={{ background: `${step.color}18`, color: step.color }}>
                      {step.accentIcon}
                    </div>
                  </div>

                  {/* Visual only — no body text */}
                  <div className="mb-4">
                    <StepVisual step={step} active={true}/>
                  </div>

                  {/* Outcome chips — compact */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {step.outcomes.map(o => (
                      <span key={o} className="font-mono text-[9px] tracking-wide px-2.5 py-1 rounded-full border"
                        style={{ color: step.color, background: `${step.color}0e`, borderColor: `${step.color}22` }}>
                        {o}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <SpecularButton
                    size="sm"
                    radius={12}
                    baseColor={step.color}
                    tint={step.color}
                    tintOpacity={0.3}
                    lineColor="#ffffff"
                    textColor="#ffffff"
                    thickness={1}
                    speed={0.35}
                    followMouse
                    proximity={200}
                    href={`#${step.ctaId}`}
                    onClick={goTo(step.ctaId)}
                  >
                    {step.cta}
                    <ArrowRight size={13} strokeWidth={2.5}/>
                  </SpecularButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
