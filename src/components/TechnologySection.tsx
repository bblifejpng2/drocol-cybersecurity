import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stages = [
  {
    num: '01',
    title: 'Automated coverage',
    body: 'The platform performs broad, repeatable assessment work at speed — across applications, APIs, and cloud environments. It continuously maps your attack surface, re-scans on every change, and works around the clock, so gaps are caught the moment they appear instead of months later at the next scheduled audit.',
    points: [
      'Continuous scanning of web apps, APIs, and cloud configurations',
      'Attack-surface mapping that updates as your estate changes',
      'Re-assessment triggers on every deploy and dependency change',
      'Findings flow straight into the expert queue — nothing waits on a manual start',
    ],
  },
  {
    num: '02',
    title: 'Expert validation',
    body: 'Certified security professionals review, test, and confirm what matters. Machines find; humans judge. Every automated alert is triaged, reproduced, and proven — false positives are filtered out before they ever reach your team, so you only act on what is real.',
    points: [
      'Every finding manually verified by certified testers',
      'False positives filtered out before anything reaches you',
      'Exploitability and business impact scored with real-world context',
      'Reproduction steps and proof-of-concept included for developers',
    ],
  },
  {
    num: '03',
    title: 'Clear findings',
    body: 'Every finding you receive is validated, prioritized, and explained — no noise, no ambiguity. You get the full picture in one place: what is at risk, how to fix it, and what to fix first, written in language your whole team can act on.',
    points: [
      'Risk-ranked by exploitability and business impact',
      'Remediation guidance written for developers, not security jargon',
      'Executive summaries for leadership, technical detail for your team',
      'Tracked to closure — re-tested to verify fixes actually landed',
    ],
  },
];

const leftStages  = stages.slice(0, 2);
const rightStages = stages.slice(2, 3);
const LAYER_COUNT = stages.length;

export const TechnologySection: React.FC = () => {
  const [active, setActive] = useState<number>(0);
  const stage = stages[active];

  return (
    <section id="technology" className="relative bg-[#080808] py-10 sm:py-24 md:py-32 overflow-hidden">

      {/* ── Background: hex-grid + center amber corona ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.055]" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hex-tech" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
              <polygon points="28,2 54,14 54,34 28,46 2,34 2,14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-tech)"/>
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.2]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 60%)', filter: 'blur(80px)' }}/>
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
          className="mb-6 sm:mb-16 sm:text-center sm:max-w-2xl sm:mx-auto"
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#E87722] uppercase">Technology</span>
          </div>
          <h2 className="font-bold tracking-[-0.03em] leading-[1.05] text-white"
            style={{ fontSize: 'clamp(22px, 4.5vw, 56px)' }}>
            Built to amplify expertise.{' '}
            <span className="text-white/40 font-light italic">Not replace it.</span>
          </h2>
        </motion.div>

        {/* ── 3-column interactive stack ── */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 items-center mb-4 sm:mb-10">

          {/* Left: stages 01–02 */}
          <div className="flex flex-col gap-1.5 sm:gap-4 lg:gap-5">
            {leftStages.map((s, i) => {
              const isActive = active === i;
              return (
                <motion.div key={s.num}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActive(i)}
                  className="cursor-pointer rounded-lg sm:rounded-xl border transition-all duration-300"
                  style={{
                    padding: 'clamp(6px, 1.5vw, 20px)',
                    background: isActive ? 'rgba(232,119,34,0.08)' : 'transparent',
                    borderColor: isActive ? 'rgba(232,119,34,0.35)' : 'rgba(255,255,255,0.06)',
                  }}>
                  <div className="flex items-center gap-1 sm:gap-2.5 mb-0.5 sm:mb-2">
                    <span className="rounded-full shrink-0 transition-all duration-300"
                      style={{
                        width: 'clamp(4px, 0.9vw, 8px)', height: 'clamp(4px, 0.9vw, 8px)',
                        background: isActive ? '#E87722' : 'rgba(255,255,255,0.25)',
                        boxShadow: isActive ? '0 0 6px rgba(232,119,34,0.8)' : 'none',
                      }}/>
                    <span className="font-mono font-bold tracking-widest uppercase leading-none"
                      style={{ fontSize: 'clamp(7px, 1.1vw, 12px)', color: isActive ? '#E87722' : 'rgba(255,255,255,0.5)' }}>
                      {s.title}
                    </span>
                  </div>
                  <p className="font-inter leading-relaxed hidden"
                    style={{ fontSize: 'clamp(10px, 1.1vw, 13px)', color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)' }}>
                    {s.body}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Center: 3D isometric stack */}
          <div className="flex items-center justify-center" style={{ padding: 'clamp(8px, 2vw, 32px) 0' }}>
            <div style={{
              width: 'clamp(80px, 13vw, 220px)',
              height: 'clamp(80px, 13vw, 220px)',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(55deg) rotateZ(-45deg)',
            }}>
              {stages.map((_, layerIdx) => {
                const isActive = active === layerIdx;
                const translateZ = layerIdx * -22;
                return (
                  <div key={layerIdx} onClick={() => setActive(layerIdx)}
                    style={{
                      position: 'absolute',
                      width: 'clamp(52px, 8.5vw, 140px)',
                      height: 'clamp(52px, 8.5vw, 140px)',
                      left: '50%', top: '50%',
                      transform: `translate(-50%, -50%) translateZ(${translateZ}px)`,
                      zIndex: LAYER_COUNT - layerIdx,
                      cursor: 'pointer',
                      transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      borderRadius: 'clamp(5px, 1vw, 12px)',
                      border: isActive ? '1px solid rgba(232,119,34,0.7)' : '1px solid rgba(255,255,255,0.12)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(242,169,92,0.55) 0%, rgba(232,119,34,0.35) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)',
                      boxShadow: isActive
                        ? '0 0 28px rgba(232,119,34,0.45), inset 0 1px 0 rgba(255,255,255,0.25)'
                        : '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                      <div style={{ transform: 'rotateZ(45deg) rotateX(-55deg)', textAlign: 'center' }}>
                        <div className="font-mono font-bold leading-none mb-0.5 transition-colors duration-300"
                          style={{ fontSize: 'clamp(8px, 1.3vw, 20px)', color: isActive ? '#fff' : 'rgba(255,255,255,0.35)' }}>
                          {stages[layerIdx].num}
                        </div>
                        <div className="font-mono tracking-widest uppercase transition-colors duration-300"
                          style={{ fontSize: 'clamp(4px, 0.6vw, 9px)', color: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)' }}>
                          {stages[layerIdx].title.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: stage 03 */}
          <div className="flex flex-col gap-1.5 sm:gap-4 lg:gap-5">
            {rightStages.map((s, i) => {
              const globalIdx = i + 2;
              const isActive = active === globalIdx;
              return (
                <motion.div key={s.num}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActive(globalIdx)}
                  className="cursor-pointer rounded-lg sm:rounded-xl border transition-all duration-300"
                  style={{
                    padding: 'clamp(6px, 1.5vw, 20px)',
                    background: isActive ? 'rgba(232,119,34,0.08)' : 'transparent',
                    borderColor: isActive ? 'rgba(232,119,34,0.35)' : 'rgba(255,255,255,0.06)',
                  }}>
                  <div className="flex items-center gap-1 sm:gap-2.5 mb-0.5 sm:mb-2">
                    <span className="rounded-full shrink-0 transition-all duration-300"
                      style={{
                        width: 'clamp(4px, 0.9vw, 8px)', height: 'clamp(4px, 0.9vw, 8px)',
                        background: isActive ? '#E87722' : 'rgba(255,255,255,0.25)',
                        boxShadow: isActive ? '0 0 6px rgba(232,119,34,0.8)' : 'none',
                      }}/>
                    <span className="font-mono font-bold tracking-widest uppercase leading-none"
                      style={{ fontSize: 'clamp(7px, 1.1vw, 12px)', color: isActive ? '#E87722' : 'rgba(255,255,255,0.5)' }}>
                      {s.title}
                    </span>
                  </div>
                  <p className="font-inter leading-relaxed hidden"
                    style={{ fontSize: 'clamp(10px, 1.1vw, 13px)', color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)' }}>
                    {s.body}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ── Active stage info box ── */}
        <div className="mt-3 sm:mt-6">
          <AnimatePresence mode="wait">
            <motion.div key={stage.num}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(232,119,34,0.25)', boxShadow: '0 0 0 1px rgba(232,119,34,0.1), 0 12px 32px rgba(0,0,0,0.4)' }}>
              <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #E87722, transparent)' }}/>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-[#E87722]/60">{stage.num}</span>
                  <div className="w-px h-3 bg-white/10"/>
                  <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-[#E87722]">{stage.title}</span>
                </div>
                <p className="font-inter text-[13.5px] leading-relaxed text-white/75">{stage.body}</p>
                <ul className="space-y-2.5 mt-4 mb-5">
                  {stage.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-[3px] shrink-0 w-[5px] h-[5px] rounded-sm" style={{ background: '#E87722' }}/>
                      <span className="font-inter text-[12.5px] leading-relaxed text-white/55">{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2">
                  {stages.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)}
                      className="rounded-full transition-all duration-300 focus:outline-none"
                      style={{ width: active === i ? '20px' : '6px', height: '6px', background: active === i ? '#E87722' : 'rgba(255,255,255,0.2)' }}
                      aria-label={`Stage ${i + 1}`}/>
                  ))}
                  <span className="font-mono text-[10px] text-white/30 ml-auto">{stage.num} of 03</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Platform stats ── */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-5">
            {[
              { value: '24/7', label: 'Continuous automated coverage' },
              { value: '100%', label: 'Findings validated by humans' },
              { value: '0', label: 'Unverified alerts shipped' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border px-3 sm:px-5 py-3 sm:py-4"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}>
                <div className="font-mono font-bold leading-none" style={{ fontSize: 'clamp(16px, 2.2vw, 28px)', color: '#E87722' }}>{s.value}</div>
                <div className="font-inter text-white/45 mt-1.5 leading-snug" style={{ fontSize: 'clamp(9px, 1vw, 12px)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop footer note ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden sm:flex items-center gap-4 rounded-2xl border px-6 py-5"
          style={{ background: 'rgba(232,119,34,0.06)', borderColor: 'rgba(232,119,34,0.2)' }}
        >
          <div className="shrink-0 w-1 h-8 rounded-full" style={{ background: 'linear-gradient(180deg, #F2A95C, #E8862E)' }}/>
          <p className="text-[14px] text-white/70 font-inter leading-relaxed">
            <span className="text-white font-semibold">Automation improves speed. Expertise ensures accuracy.</span>{' '}
            Every finding that reaches a client is reviewed, validated, and explained by certified security professionals.
          </p>
        </motion.div>

      </div>

      <style>{`
        #technology { transform-style: preserve-3d; }
      `}</style>
    </section>
  );
};
