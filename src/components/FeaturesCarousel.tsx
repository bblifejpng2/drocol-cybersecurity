import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Check } from 'lucide-react';
import { moduleData, ModuleData } from '../lib/data';

// Per-module accent colors and gradients — 7 unique colors
const moduleAccents = [
  { color: '#E87722', glow: 'rgba(232,119,34,0.25)',  bg: 'linear-gradient(135deg, rgba(232,119,34,0.12) 0%, rgba(232,119,34,0.04) 100%)',  border: 'rgba(232,119,34,0.2)' },
  { color: '#ef4444', glow: 'rgba(239,68,68,0.25)',   bg: 'linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.04) 100%)',   border: 'rgba(239,68,68,0.2)' },
  { color: '#8b5cf6', glow: 'rgba(139,92,246,0.25)',  bg: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.04) 100%)',  border: 'rgba(139,92,246,0.2)' },
  { color: '#3b82f6', glow: 'rgba(59,130,246,0.25)',  bg: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 100%)',  border: 'rgba(59,130,246,0.2)' },
  { color: '#10b981', glow: 'rgba(16,185,129,0.25)',  bg: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 100%)',  border: 'rgba(16,185,129,0.2)' },
  { color: '#f59e0b', glow: 'rgba(245,158,11,0.25)',  bg: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.04) 100%)',  border: 'rgba(245,158,11,0.2)' },
  { color: '#ec4899', glow: 'rgba(236,72,153,0.25)',  bg: 'linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0.04) 100%)',  border: 'rgba(236,72,153,0.2)' },
];

const GAP = 20; // 4 * 4px = 16px on mobile, 5 * 4px = 20px on desktop — use 20 as safe value

export const FeaturesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 768) setVisibleCount(2);
      else setVisibleCount(1);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate exact pixel offset for the carousel
  const xOffset = useMemo(() => {
    if (containerWidth === 0) return 0;
    const cardWidth = (containerWidth - GAP * (visibleCount - 1)) / visibleCount;
    return currentIndex * (cardWidth + GAP);
  }, [currentIndex, containerWidth, visibleCount]);

  const maxIndex = Math.max(0, moduleData.length - visibleCount);
  const handlePrev = () => setCurrentIndex(prev => Math.max(0, prev - 1));
  const handleNext = () => setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  const handleDotClick = (index: number) => setCurrentIndex(Math.min(maxIndex, index));

  const handleTouchStart = (e: React.TouchEvent) => { touchStartRef.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) handleNext(); else handlePrev(); }
  };

  const openModal = (e: React.MouseEvent, module: ModuleData, index: number) => {
    e.preventDefault(); e.stopPropagation();
    setSelectedModule(module); setSelectedModuleIndex(index);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => { setSelectedModule(null); document.body.style.overflow = ''; };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="features" className="relative bg-[#080808] py-24 md:py-32 overflow-hidden">

      {/* ── Background ─────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px',
        }}/>
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.1]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}/>
        {/* Left glow */}
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 70%)', filter: 'blur(80px)' }}/>
        {/* Right glow */}
        <div className="absolute -right-40 top-1/3 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)', filter: 'blur(80px)' }}/>
        {/* Top/bottom separators */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 40%, rgba(232,119,34,0.15) 60%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Section Header ─────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-18 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-[#E87722]/20 bg-[#E87722]/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]"/>
              <span className="text-[11px] font-inter font-semibold tracking-widest text-[#E87722] uppercase">Security Modules</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.0]">
              Essential tools your<br/>
              <span className="text-white/40">security team relies on.</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm font-inter text-sm leading-relaxed md:text-right">
            Seven integrated modules that replace a dozen point solutions — built for the realities of Nigerian enterprise infrastructure.
          </p>
        </div>

        {/* ── Carousel ───────────────────────────────────────── */}
        <div
          className="w-full overflow-hidden"
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex gap-4 md:gap-5"
            animate={{ x: -xOffset }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            {moduleData.map((module, index) => {
              const accent = moduleAccents[index % moduleAccents.length];
              const cardWidth = visibleCount === 1 ? '100%' : visibleCount === 2 ? 'calc(50% - 10px)' : 'calc(33.333% - 12px)';
              return (
                <div
                  key={index}
                  className="group flex-shrink-0 flex flex-col rounded-2xl overflow-hidden border transition-all duration-500 cursor-default"
                  style={{
                    width: cardWidth,
                    background: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.07)',
                    boxShadow: '0 0 0 0 transparent',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = accent.border;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${accent.glow}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent';
                  }}
                >
                  {/* ── Image Container ── */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden flex items-center justify-center"
                    style={{ background: accent.bg }}>
                    {/* Noise on image bg */}
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'repeat', backgroundSize: '128px',
                    }}/>
                    {/* Dot grid on image bg */}
                    <div className="absolute inset-0 opacity-[0.12]" style={{
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}/>
                    {/* Accent glow center */}
                    <div className="absolute inset-0 opacity-30"
                      style={{ background: `radial-gradient(ellipse at center, ${accent.glow} 0%, transparent 70%)` }}/>
                    {/* Corner accent line */}
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent.color}60, transparent)` }}/>
                    {/* Image */}
                    <img
                      src={module.imageUrl}
                      alt={module.title}
                      className="relative z-10 w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    {/* Bottom fade into card */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                      style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.6), transparent)' }}/>
                    {/* Module number badge */}
                    <div className="absolute top-3 left-3 font-mono text-[10px] font-bold px-2 py-1 rounded-md border"
                      style={{ color: accent.color, borderColor: accent.border, background: 'rgba(8,8,8,0.7)', backdropFilter: 'blur(8px)' }}>
                      {module.number}
                    </div>
                  </div>

                  {/* ── Card Body ── */}
                  <div className="flex flex-col flex-grow p-5">
                    <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-tight tracking-[-0.01em]">
                      {module.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/40 font-inter leading-relaxed flex-grow mb-4">
                      {module.description}
                    </p>
                    <button
                      onClick={(e) => openModal(e, module, index)}
                      className="self-start inline-flex items-center gap-2 text-xs font-semibold font-inter transition-all duration-300 group/btn"
                      style={{ color: accent.color }}
                    >
                      Explore module
                      <ArrowRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5}/>
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Navigation ─────────────────────────────────────── */}
        <div className="flex items-center justify-between mt-8 md:mt-10">
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: currentIndex === idx ? '28px' : '6px',
                  background: currentIndex === idx ? '#E87722' : 'rgba(255,255,255,0.15)',
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {[{ fn: handlePrev, disabled: currentIndex === 0, icon: <ArrowLeft size={16}/>, label: 'Previous' },
              { fn: handleNext, disabled: currentIndex >= maxIndex, icon: <ArrowRight size={16}/>, label: 'Next' }].map((btn, i) => (
              <button
                key={i}
                onClick={btn.fn}
                disabled={btn.disabled}
                aria-label={btn.label}
                className="w-10 h-10 rounded-xl border flex items-center justify-center text-white transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
                onMouseEnter={e => !btn.disabled && ((e.currentTarget as HTMLElement).style.background = 'rgba(232,119,34,0.15)', (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,119,34,0.4)')}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedModule && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[580px] max-h-[90vh] overflow-y-auto rounded-3xl border p-8 md:p-10"
              style={{
                background: 'rgba(14,14,14,0.98)',
                borderColor: moduleAccents[selectedModuleIndex % moduleAccents.length].border,
                boxShadow: `0 0 80px ${moduleAccents[selectedModuleIndex % moduleAccents.length].glow}, 0 32px 80px rgba(0,0,0,0.8)`,
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Close"
              >
                <X size={16} strokeWidth={2}/>
              </button>

              {/* Accent top line */}
              <div className="absolute top-0 left-8 right-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${moduleAccents[selectedModuleIndex % moduleAccents.length].color}80, transparent)` }}/>

              <div className="font-mono text-[11px] font-bold tracking-widest mb-3" style={{ color: moduleAccents[selectedModuleIndex % moduleAccents.length].color }}>
                {selectedModule.number}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-[-0.02em]">
                {selectedModule.title}
              </h3>
              <p className="text-white/50 font-inter text-sm leading-relaxed mb-8">
                {selectedModule.description}
              </p>

              <div className="mb-8">
                <div className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest mb-4">Key Capabilities</div>
                <ul className="space-y-0 divide-y divide-white/[0.05]">
                  {selectedModule.features.map((feature, i) => (
                    <li key={i} className="py-3 flex items-start gap-3 font-inter text-sm text-white/70">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${moduleAccents[selectedModuleIndex % moduleAccents.length].color}20` }}>
                        <Check size={11} strokeWidth={3} style={{ color: moduleAccents[selectedModuleIndex % moduleAccents.length].color }}/>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); closeModal(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${moduleAccents[selectedModuleIndex % moduleAccents.length].color}, ${moduleAccents[selectedModuleIndex % moduleAccents.length].color}cc)`, boxShadow: `0 4px 20px ${moduleAccents[selectedModuleIndex % moduleAccents.length].glow}` }}
              >
                Book Demo Setup <ArrowRight size={14} strokeWidth={2.5}/>
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
