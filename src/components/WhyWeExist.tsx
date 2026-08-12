import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Chart data — security posture score over time
const chartPoints = [
  { x: 0,   y: 82, label: 'Q1' },
  { x: 1,   y: 61, label: 'Q2' },
  { x: 2,   y: 47, label: 'Q3' },
  { x: 3,   y: 38, label: 'Q4' },
  { x: 4,   y: 29, label: 'Q1' },
  { x: 5,   y: 55, label: 'Q2' },
  { x: 6,   y: 68, label: 'Q3' },
  { x: 7,   y: 79, label: 'Q4' },
  { x: 8,   y: 88, label: 'Q1' },
  { x: 9,   y: 94, label: 'Q2' },
];

// SVG chart dimensions
const W = 320;
const H = 180;
const PAD = { top: 16, right: 16, bottom: 32, left: 36 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const toSvg = (x: number, y: number) => ({
  sx: PAD.left + (x / (chartPoints.length - 1)) * CW,
  sy: PAD.top + (1 - y / 100) * CH,
});

// Build smooth cubic bezier path through all points
const buildPath = () => {
  const pts = chartPoints.map(p => toSvg(p.x, p.y));
  let d = `M ${pts[0].sx} ${pts[0].sy}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cp1x = prev.sx + (curr.sx - prev.sx) * 0.4;
    const cp2x = curr.sx - (curr.sx - prev.sx) * 0.4;
    d += ` C ${cp1x} ${prev.sy} ${cp2x} ${curr.sy} ${curr.sx} ${curr.sy}`;
  }
  return d;
};

// Build filled area path (close down to baseline)
const buildArea = () => {
  const pts = chartPoints.map(p => toSvg(p.x, p.y));
  let d = `M ${pts[0].sx} ${pts[0].sy}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cp1x = prev.sx + (curr.sx - prev.sx) * 0.4;
    const cp2x = curr.sx - (curr.sx - prev.sx) * 0.4;
    d += ` C ${cp1x} ${prev.sy} ${cp2x} ${curr.sy} ${curr.sx} ${curr.sy}`;
  }
  const last = pts[pts.length - 1];
  const first = pts[0];
  d += ` L ${last.sx} ${PAD.top + CH} L ${first.sx} ${PAD.top + CH} Z`;
  return d;
};

// The "Drocol engaged" marker — midpoint index
const ENGAGE_IDX = 4;

const linePath = buildPath();
const areaPath = buildArea();
const engagePt = toSvg(chartPoints[ENGAGE_IDX].x, chartPoints[ENGAGE_IDX].y);

export const WhyWeExist: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (pathRef.current) {
      setPathLen(pathRef.current.getTotalLength());
    }
  }, []);

  return (
    <section id="why" className="relative bg-[#F3EDE2] py-12 sm:py-20 md:py-28 lg:py-32 overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'linear-gradient(rgba(23,23,23,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}/>
        {/* Top-right amber bloom */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 65%)', filter: 'blur(80px)' }}/>
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(23,23,23,0.1) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.15) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">

          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 py-1.5 rounded-full border border-[#E87722]/25 bg-[#E87722]/[0.07]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87722] shrink-0 animate-pulse"/>
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] text-[#E87722] uppercase">
                Why we exist
              </span>
            </div>

            {/* Heading — Space Grotesk, the site's primary display font */}
            <h2 className="font-sans font-bold tracking-[-0.03em] leading-[1.05] text-neutral-900 mb-5 sm:mb-8"
              style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
              Confidence<br/>before crisis.
            </h2>

            {/* Body — Inter, matching site body copy style */}
            <div className="space-y-3 sm:space-y-4 font-inter leading-relaxed text-neutral-600"
              style={{ fontSize: 'clamp(13px, 1.8vw, 16px)' }}>
              <p>Technology has changed how the world works. It has also changed how organizations are attacked.</p>
              <p>Every year, businesses become more connected. Threats evolve just as quickly.</p>
              <p>Many organizations respond only <em className="not-italic text-neutral-800">after</em> an incident. After a failed audit. After trust has already been damaged.</p>
              <p className="text-neutral-900 font-semibold" style={{ fontSize: 'clamp(13px, 1.8vw, 17px)' }}>
                We believe there's a better way. Cybersecurity should create confidence before crisis.
              </p>
              <p className="text-neutral-500">That's why Drocol exists.</p>
            </div>

            {/* Mono stat strip — JetBrains Mono label style */}
            <div className="flex items-center gap-5 sm:gap-8 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-neutral-900/10">
              {[
                { value: '250+', label: 'Organizations' },
                { value: '12+',  label: 'Countries' },
                { value: '24/7', label: 'Support' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-sans font-bold text-neutral-900 leading-none mb-1"
                    style={{ fontSize: 'clamp(18px, 3vw, 28px)' }}>
                    {s.value}
                  </div>
                  <div className="font-mono uppercase tracking-[0.12em] text-neutral-500"
                    style={{ fontSize: 'clamp(9px, 1.1vw, 11px)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: isolated dark chart card ── */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onViewportEnter={() => setDrawn(true)}
            className="w-full flex justify-center"
          >
            <div className="relative w-full max-w-[420px]">

              {/* Outer ambient glow */}
              <div className="absolute -inset-6 rounded-3xl pointer-events-none opacity-30"
                style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.35) 0%, transparent 70%)', filter: 'blur(32px)' }}/>

              {/* Dark glass card */}
              <div className="relative rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(8,8,8,0.92)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}>

                {/* Card header */}
                <div className="flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-white/[0.06]">
                  <div>
                    <div className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-[#E87722] mb-0.5">
                      Security Posture
                    </div>
                    <div className="font-sans font-bold text-white text-sm sm:text-base leading-tight">
                      Risk over Time
                    </div>
                  </div>
                  {/* Live indicator */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E87722] animate-pulse"/>
                    <span className="font-mono text-[9px] text-white/50 uppercase tracking-widest">Live</span>
                  </div>
                </div>

                {/* Chart area */}
                <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-2">
                  <svg
                    viewBox={`0 0 ${W} ${H}`}
                    className="w-full"
                    style={{ height: 'auto', display: 'block' }}
                    aria-hidden="true"
                  >
                    <defs>
                      {/* Gradient fill under the line */}
                      <linearGradient id="why-area-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#E87722" stopOpacity="0.18"/>
                        <stop offset="100%" stopColor="#E87722" stopOpacity="0.01"/>
                      </linearGradient>
                      {/* Line draw animation mask */}
                      <clipPath id="why-line-clip">
                        <motion.rect
                          x="0" y="0"
                          height={H}
                          initial={{ width: 0 }}
                          animate={{ width: drawn ? W : 0 }}
                          transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </clipPath>
                    </defs>

                    {/* Horizontal grid lines */}
                    {[0, 25, 50, 75, 100].map(v => {
                      const sy = PAD.top + (1 - v / 100) * CH;
                      return (
                        <g key={v}>
                          <line
                            x1={PAD.left} y1={sy}
                            x2={PAD.left + CW} y2={sy}
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                          <text
                            x={PAD.left - 6} y={sy + 4}
                            textAnchor="end"
                            fill="rgba(255,255,255,0.25)"
                            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px' }}
                          >
                            {v}
                          </text>
                        </g>
                      );
                    })}

                    {/* X-axis labels */}
                    {chartPoints.map((p, i) => {
                      const { sx } = toSvg(p.x, p.y);
                      return (
                        <text
                          key={i} x={sx}
                          y={PAD.top + CH + 14}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.2)"
                          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px' }}
                        >
                          {p.label}
                        </text>
                      );
                    })}

                    {/* "Drocol Engaged" vertical divider */}
                    <line
                      x1={engagePt.sx} y1={PAD.top}
                      x2={engagePt.sx} y2={PAD.top + CH}
                      stroke="rgba(232,119,34,0.35)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={engagePt.sx + 4} y={PAD.top + 10}
                      fill="rgba(232,119,34,0.7)"
                      style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px', fontWeight: '600' }}
                    >
                      Drocol engaged
                    </text>

                    {/* Area fill (clipped so it draws with the line) */}
                    <path
                      d={areaPath}
                      fill="url(#why-area-grad)"
                      clipPath="url(#why-line-clip)"
                    />

                    {/* Main line */}
                    <path
                      ref={pathRef}
                      d={linePath}
                      fill="none"
                      stroke="#E87722"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      clipPath="url(#why-line-clip)"
                    />

                    {/* Data point dots */}
                    {chartPoints.map((p, i) => {
                      const { sx, sy } = toSvg(p.x, p.y);
                      const isEngage = i === ENGAGE_IDX;
                      const isLast   = i === chartPoints.length - 1;
                      return (
                        <motion.circle
                          key={i}
                          cx={sx} cy={sy}
                          r={isLast ? 5 : isEngage ? 4 : 3}
                          fill={isEngage || isLast ? '#E87722' : 'rgba(232,119,34,0.5)'}
                          stroke={isLast ? 'rgba(232,119,34,0.3)' : 'none'}
                          strokeWidth={isLast ? 6 : 0}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={drawn ? { scale: 1, opacity: 1 } : {}}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.14 }}
                        />
                      );
                    })}

                    {/* Latest value label */}
                    {(() => {
                      const last = chartPoints[chartPoints.length - 1];
                      const { sx, sy } = toSvg(last.x, last.y);
                      return (
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={drawn ? { opacity: 1 } : {}}
                          transition={{ delay: 2.0, duration: 0.5 }}
                        >
                          <rect
                            x={sx - 14} y={sy - 18}
                            width="30" height="14"
                            rx="4"
                            fill="#E87722"
                          />
                          <text
                            x={sx + 1} y={sy - 7}
                            textAnchor="middle"
                            fill="#fff"
                            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', fontWeight: '700' }}
                          >
                            94%
                          </text>
                        </motion.g>
                      );
                    })()}
                  </svg>
                </div>

                {/* Card footer — stat pills */}
                <div className="grid grid-cols-3 gap-px mx-3 sm:mx-4 mb-3 sm:mb-4 mt-1 rounded-xl overflow-hidden border border-white/[0.06]">
                  {[
                    { label: 'Before',    value: 'Reactive',  muted: true  },
                    { label: 'Change',    value: '+56pts',    muted: false },
                    { label: 'With Drocol', value: 'Confident', muted: false },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center py-2.5 sm:py-3"
                      style={{ background: i === 1 ? 'rgba(232,119,34,0.1)' : 'rgba(255,255,255,0.03)' }}>
                      <div className={`font-sans font-bold leading-tight ${s.muted ? 'text-white/30' : i === 1 ? 'text-[#E87722]' : 'text-white'}`}
                        style={{ fontSize: 'clamp(11px, 1.6vw, 14px)' }}>
                        {s.value}
                      </div>
                      <div className="font-mono uppercase tracking-widest text-white/30 mt-0.5"
                        style={{ fontSize: 'clamp(7px, 0.9vw, 9px)' }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
