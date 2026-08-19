import React from 'react';
import { ScrollVelocity } from './ScrollVelocity';

/* Each stat rendered as a JSX node so the ticker shows value + label together */
const statItems = [
  { value: '0',      label: 'Successful Ransomware Attacks' },
  { value: '₦500M+', label: 'Assets Secured' },
  { value: '99.9%',  label: 'Customer Satisfaction Rating' },
  { value: '24/7',   label: 'Support' },
];

/** A single stat pill rendered inside the ticker row */
const StatPill: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <span className="inline-flex items-center gap-3 mx-8">
    <span className="text-[#E87722] font-extrabold tracking-tight">{value}</span>
    <span className="text-white/40 font-medium text-[0.45em] uppercase tracking-[0.18em] leading-none">
      {label}
    </span>
    {/* dot separator */}
    <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]/30 inline-block" />
  </span>
);

/* Build two rows with slightly different item orders so they feel independent */
const row1 = statItems.map((s) => <StatPill key={s.label} value={s.value} label={s.label} />);
const row2 = [...statItems].reverse().map((s) => <StatPill key={s.label} value={s.value} label={s.label} />);

export const StatsBar: React.FC = () => {
  return (
    <div className="relative border-y border-white/[0.07] bg-[#0a0a0a] overflow-hidden py-1 select-none">
      {/* left / right edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }} />

      <ScrollVelocity
        texts={[row1, row2]}
        velocity={60}
        numCopies={4}
        parallaxStyle={{ paddingBlock: '12px' }}
        scrollerStyle={{ alignItems: 'center' }}
      />
    </div>
  );
};
