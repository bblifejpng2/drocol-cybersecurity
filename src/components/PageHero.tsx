import React from 'react';
import { motion } from 'framer-motion';
import PixelBlast from './PixelBlast';
import Scanner from './Scanner';
import DotGrid from './DotGrid';

interface PageHeroProps {
  label: string;
  title: React.ReactNode;
  intro?: string;
  theme?: 'dark' | 'light';
  heroEffect?: 'pixelblast' | 'scanner' | 'dotgrid';
}

/** Shared hero header for sub-pages (Solutions / Technology / Research / Industries). */
export const PageHero: React.FC<PageHeroProps> = ({
  label,
  title,
  intro,
  theme = 'dark',
  heroEffect,
}) => {
  const light = theme === 'light';

  // Default effect per theme if not explicitly set
  const effect = heroEffect ?? (light ? 'scanner' : 'pixelblast');

  return (
    <section className={`relative pt-32 pb-14 sm:pt-40 sm:pb-20 md:pt-44 md:pb-24 overflow-hidden ${light ? 'bg-[#F8EFD2]' : 'bg-[#080808]'}`}>

      {/* ── PixelBlast — dark pages (Solutions, Technology) ── */}
      {effect === 'pixelblast' && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <PixelBlast
            variant="circle"
            color="#E87722"
            pixelSize={4}
            patternScale={1.8}
            patternDensity={0.55}
            speed={0.3}
            edgeFade={0.25}
            enableRipples={false}
            transparent
            style={{ opacity: 0.18 }}
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, #080808 100%)' }} />
        </div>
      )}

      {/* ── Scanner — Industries (light) ── */}
      {effect === 'scanner' && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0" style={{ opacity: 0.85 }}>
            <Scanner
              color1="#C05A10"
              color2="#E87722"
              color3="#F5A623"
              speed={0.25}
              sweepSpeed={0.18}
              sweepWidth={1.8}
              sweepFalloff={5}
              scale={1.6}
              frequency={1.8}
              ripple={0.18}
              bandDensity={9}
              lineSharpness={4}
              glow={0.55}
              scanDirection="diagonal"
              colorSpread={0.6}
              brightness={1.8}
              contrast={0.9}
              softness={0.8}
              vignette={0.3}
              opacity={1.0}
              scanline={false}
              grain={false}
              mouseInteraction={false}
            />
          </div>
          <div className="absolute inset-0"
            style={{ background: 'rgba(248,239,210,0.45)' }} />
        </div>
      )}

      {/* ── DotGrid — Research (light) ── */}
      {effect === 'dotgrid' && (
        <div className="absolute inset-0" aria-hidden="true">
          <DotGrid
            dotSize={10}
            gap={28}
            baseColor="#C8A87A"
            activeColor="#E87722"
            proximity={160}
            speedTrigger={80}
            shockRadius={220}
            shockStrength={4}
            resistance={700}
            returnDuration={1.4}
            style={{ opacity: 0.55 }}
          />
          {/* cream wash to keep text legible */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(248,239,210,0.6) 0%, rgba(248,239,210,0.35) 100%)' }} />
        </div>
      )}

      {/* top accent line — all themes */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.35) 50%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]" />
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#E87722] uppercase">{label}</span>
          </div>
          <h1
            className={`font-sans font-bold tracking-[-0.03em] leading-[1.05] max-w-3xl ${light ? 'text-[#1A1A1A]' : 'text-white'}`}
            style={{ fontSize: 'clamp(30px, 5.5vw, 60px)' }}
          >
            {title}
          </h1>
          {intro && (
            <p
              className={`font-inter mt-5 max-w-2xl ${light ? 'text-[#1A1A1A]/60' : 'text-white/50'}`}
              style={{ fontSize: 'clamp(14px, 1.6vw, 17px)' }}
            >
              {intro}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};
