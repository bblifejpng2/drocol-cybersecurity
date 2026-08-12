import React, { Fragment, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Stack from './Stack';

const STAGES = [
  {
    num: '01',
    name: 'Automated coverage',
    line: 'The platform performs broad, repeatable assessment work at speed.',
    body: 'The platform performs broad, repeatable assessment work at speed — across applications, APIs, and cloud environments. It continuously maps your attack surface, re-scans on every change, and works around the clock, so gaps are caught the moment they appear.',
    points: [
      'Continuous scanning of web apps, APIs, and cloud configurations',
      'Attack-surface mapping that updates as your estate changes',
      'Re-assessment triggers on every deploy and dependency change',
      'Findings flow straight into the expert queue — nothing waits',
    ],
  },
  {
    num: '02',
    name: 'Expert validation',
    line: 'Certified security professionals review, test, and confirm what matters.',
    body: 'Certified security professionals review, test, and confirm what matters. Machines find; humans judge. Every automated alert is triaged, reproduced, and proven — false positives are filtered out before they ever reach your team.',
    points: [
      'Every finding manually verified by certified testers',
      'False positives filtered out before anything reaches you',
      'Exploitability and business impact scored with real-world context',
      'Reproduction steps and proof-of-concept included for developers',
    ],
  },
  {
    num: '03',
    name: 'Clear findings',
    line: 'Every finding you receive is validated, prioritized, and explained.',
    body: 'Every finding you receive is validated, prioritized, and explained — no noise, no ambiguity. You get the full picture in one place: what is at risk, how to fix it, and what to fix first.',
    points: [
      'Risk-ranked by exploitability and business impact',
      'Remediation guidance written for developers, not security jargon',
      'Executive summaries for leadership, technical detail for your team',
      'Tracked to closure — re-tested to verify fixes actually landed',
    ],
  },
  {
    num: '04',
    name: 'Attack path mapping',
    line: 'The routes attackers would take to your crown jewels, mapped continuously.',
    body: 'Attackers rarely arrive through the front door. The platform maps every path between what is exposed and what matters — identities, credentials, and trust chains — so you see the routes an attacker would actually take.',
    points: [
      'Identity, credential, and trust-chain analysis',
      'Lateral-movement and pivot path mapping',
      'Exposure-to-crown-jewel reachability scoring',
      'Paths updated automatically as your estate changes',
    ],
  },
  {
    num: '05',
    name: 'Continuous monitoring',
    line: 'Around-the-clock re-scanning that catches new gaps the moment they appear.',
    body: 'Your estate changes daily — new code, new dependencies, new services. The platform re-scans on every change, around the clock, so a gap that appears today is caught today, not at the next scheduled audit.',
    points: [
      '24/7 re-assessment across your full estate',
      'Re-scan triggers on every deploy and dependency change',
      'New services and endpoints picked up automatically',
      'Alerting the moment a gap appears',
    ],
  },
  {
    num: '06',
    name: 'Closure verification',
    line: 'Every fix re-tested and tracked to closure, so findings stay fixed.',
    body: 'A fix is only real once it is verified. Every remediation is re-tested to confirm it actually landed, and every finding is tracked to closure — so issues cannot quietly slip back.',
    points: [
      'Every fix re-tested after remediation',
      'Findings tracked to closure in one queue',
      'Regression checks when environments change',
      'Full audit trail from finding to verified fix',
    ],
  },
];

const LEFT_STAGES = STAGES.slice(0, 3);
const RIGHT_STAGES = STAGES.slice(3);

/* Unique orange shade per slate (base / dark / highlight) */
const ORANGE_SHADES = [
  { base: '#9A4D0D', dark: '#5C2C06', hi: '#C2651A' },
  { base: '#B35A10', dark: '#6F3508', hi: '#D97706' },
  { base: '#C96615', dark: '#82400A', hi: '#E38B1E' },
  { base: '#DB731C', dark: '#964A0C', hi: '#EFA63C' },
  { base: '#E87722', dark: '#A8540F', hi: '#F2B25C' },
  { base: '#F08A2E', dark: '#C4651A', hi: '#FAC27E' },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

const ArrowDivider = () => (
  <div className="flex items-center gap-3 py-0.5" aria-hidden="true">
    <div className="h-px flex-1 bg-white/[0.06]" />
    <span className="font-mono text-[11px] leading-none text-[#E87722]/60">→</span>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

export const TechnologySection: React.FC = () => {
  const [active, setActive] = useState<number>(0);
  const stage = STAGES[active];

  /* The six orange slates — stable identity so the deck keeps its order. */
  const slateCards = useMemo(
    () =>
      STAGES.map((l, i) => (
        <div
          key={l.num}
          className="stack-slate"
          style={
            {
              '--slate-base': ORANGE_SHADES[i].base,
              '--slate-dark': ORANGE_SHADES[i].dark,
              '--slate-hi': ORANGE_SHADES[i].hi,
            } as React.CSSProperties
          }
        >
          <span className="stack-slate__num">{l.num}</span>
          <span className="stack-slate__name">{l.name}</span>
        </div>
      )),
    []
  );

  return (
    <section id="technology" className="relative bg-[#050302] py-16 sm:py-28 overflow-hidden">
      {/* ── Background: fine grid + center amber ambient + noise + hairlines ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hex-tech" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
              <polygon points="28,2 54,14 54,34 28,46 2,34 2,14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-tech)" />
        </svg>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full opacity-[0.16]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 60%)', filter: 'blur(90px)' }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.22) 50%, transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.12) 50%, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ── Symmetrical columns: left stages | 16:9 slate | right stages ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 lg:gap-8 items-center">

          {/* Left — the three given stages (flow) */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} className="flex flex-col justify-center gap-5 order-1">
            {LEFT_STAGES.map((l, i) => {
              const isActive = active === i;
              return (
                <Fragment key={l.num}>
                  {i > 0 && <ArrowDivider />}
                  <button onClick={() => setActive(i)} className="block w-full text-left cursor-pointer group" aria-label={`Layer ${l.num}: ${l.name}`}>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="font-mono text-[10px] font-bold tracking-widest text-[#E87722]/70">{l.num}</span>
                      <span
                        className={`font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.24em] transition-colors duration-300 ${isActive ? 'text-[#E87722]' : 'text-white/85 group-hover:text-white'}`}
                      >
                        {l.name}
                      </span>
                    </div>
                    <p className="font-inter text-[12px] leading-relaxed text-white/40 max-w-[36ch]">{l.line}</p>
                  </button>
                </Fragment>
              );
            })}
          </motion.div>

          {/* Center — Stack deck of 6 orange slates, numbered 1–6 */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="flex items-center justify-center relative order-2" style={{ padding: 'clamp(14px, 2.5vw, 44px) 0' }}>
            {/* volumetric under-glow */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '68%',
                transform: 'translateX(-50%)',
                width: '85%',
                height: 'clamp(26px, 3.5vw, 46px)',
                background: 'radial-gradient(ellipse, rgba(232,119,34,0.3) 0%, rgba(232,119,34,0.09) 45%, transparent 70%)',
                filter: 'blur(22px)',
                zIndex: 0,
              }}
            />
            <div className="slate-float relative z-10" style={{ width: 'clamp(150px, 16vw, 230px)', aspectRatio: '16 / 9' }}>
              <Stack
                cards={slateCards}
                activeIndex={active}
                onTopChange={setActive}
                autoplay
                autoplayDelay={3000}
                pauseOnHover
                sendToBackOnClick
                mobileClickOnly
                mobileBreakpoint={768}
                sensitivity={140}
                animationConfig={{ stiffness: 260, damping: 20 }}
              />
            </div>
          </motion.div>

          {/* Right — the three added stages (mirrored) */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.25 }} className="flex flex-col justify-center gap-5 order-3">
            {RIGHT_STAGES.map((l, i) => {
              const globalIdx = i + 3;
              const isActive = active === globalIdx;
              return (
                <Fragment key={l.num}>
                  {i > 0 && <ArrowDivider />}
                  <button onClick={() => setActive(globalIdx)} className="block w-full text-right cursor-pointer group" aria-label={`Layer ${l.num}: ${l.name}`}>
                    <div className="flex items-center justify-end gap-2.5 mb-2">
                      <span
                        className={`font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.24em] transition-colors duration-300 ${isActive ? 'text-[#E87722]' : 'text-white/85 group-hover:text-white'}`}
                      >
                        {l.name}
                      </span>
                      <span className="font-mono text-[10px] font-bold tracking-widest text-[#E87722]/70">{l.num}</span>
                    </div>
                    <p className="font-inter text-[12px] leading-relaxed text-white/40 ml-auto max-w-[36ch]">{l.line}</p>
                  </button>
                </Fragment>
              );
            })}
          </motion.div>

        </div>

        {/* ── Active layer readout (sticky bar on mobile) ── */}
        <div className="mt-12 sm:mt-16 tech-readout-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[10px] font-bold tracking-widest text-[#E87722]/80">{stage.num}</span>
                <div className="w-px h-3 bg-white/10" />
                <span className="font-mono text-[12px] font-bold uppercase tracking-[0.24em] text-white/90">{stage.name}</span>
                <span className="font-mono text-[10px] tracking-widest text-white/25 ml-auto hidden sm:block">
                  LAYER {stage.num} / 06
                </span>
              </div>
              <p className="font-inter text-[13px] leading-relaxed text-white/65 max-w-3xl">{stage.body}</p>
              <ul className="hidden sm:grid sm:grid-cols-2 gap-x-10 gap-y-2 mt-4">
                {stage.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="mt-[3px] shrink-0 w-[4px] h-[4px] rounded-sm" style={{ background: '#E87722' }} />
                    <span className="font-inter text-[12px] leading-relaxed text-white/45">{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/[0.06]">
                {STAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Stage ${i + 1}`}
                    className="rounded-full transition-all duration-300 focus:outline-none"
                    style={{
                      width: active === i ? '18px' : '5px',
                      height: '5px',
                      background: active === i ? '#E87722' : 'rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Closing note ── */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-12 sm:mt-16 pt-5 sm:pt-6 border-t border-white/[0.06]">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-[3px] h-9 rounded-full mt-0.5" style={{ background: 'linear-gradient(180deg, #F2A95C, #E8862E)' }} />
            <p className="font-inter text-[13px] leading-relaxed text-white/55 max-w-3xl">
              <span className="text-white font-semibold">Automation improves speed. Expertise ensures accuracy.</span>{' '}
              Every finding that reaches a client is reviewed, validated, and explained by certified security professionals.
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .slate-float {
          will-change: transform;
          animation: slate-float 7s ease-in-out infinite;
        }
        @keyframes slate-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .slate-float { animation: none; }
        }
        /* On phones the current slide's info sticks to the bottom of the viewport
           while scrolling through the section, so it is always in view. */
        @media (max-width: 767px) {
          .tech-readout-wrap {
            position: sticky;
            bottom: 0;
            z-index: 30;
            margin-top: 14px !important;
            padding: 12px 14px 10px;
            background: linear-gradient(180deg, rgba(5, 3, 2, 0.55), rgba(5, 3, 2, 0.94));
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border-top: 1px solid rgba(232, 119, 34, 0.28);
            border-radius: 16px 16px 0 0;
          }
          .tech-readout-wrap .mt-5 {
            margin-top: 10px !important;
            padding-top: 10px !important;
          }
        }
      `}</style>
    </section>
  );
};
