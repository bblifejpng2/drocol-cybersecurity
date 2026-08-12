import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, Shield, AlertCircle, Radio, Lock, EyeOff, CheckCircle, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import { SpecularButton, specularPrimary } from './SpecularButton';
import { attackStages, AttackStage } from '../lib/data';

export const AttackPathStack: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swipeRotation, setSwipeRotation] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const isDragging = useRef(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Hide swipe hint after first interaction
  useEffect(() => {
    if (activeLayer > 0) setShowSwipeHint(false);
  }, [activeLayer]);

  const totalStages = attackStages.length;

  const goNext = useCallback(() => {
    if (isAnimating || activeLayer >= totalStages - 1) return;
    setIsAnimating(true);
    setSwipeDirection('left');
    setSwipeOffset(-500);
    setSwipeRotation(-20);
    setTimeout(() => {
      setActiveLayer(prev => prev + 1);
      setSwipeDirection(null);
      setSwipeOffset(0);
      setSwipeRotation(0);
      setIsAnimating(false);
    }, 300);
  }, [activeLayer, totalStages, isAnimating]);

  const goPrev = useCallback(() => {
    if (isAnimating || activeLayer <= 0) return;
    setIsAnimating(true);
    setSwipeDirection('right');
    setSwipeOffset(500);
    setSwipeRotation(20);
    setTimeout(() => {
      setActiveLayer(prev => prev - 1);
      setSwipeDirection(null);
      setSwipeOffset(0);
      setSwipeRotation(0);
      setIsAnimating(false);
    }, 300);
  }, [activeLayer, isAnimating]);

  // Mouse drag handlers (for desktop testing)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isAnimating) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
  }, [isAnimating]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    setSwipeOffset(dx);
    setSwipeRotation(dx * 0.05);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (swipeOffset > 100) goPrev();
    else if (swipeOffset < -100) goNext();
    else {
      setSwipeOffset(0);
      setSwipeRotation(0);
    }
  }, [swipeOffset, goNext, goPrev]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isAnimating) return;
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartY.current = e.touches[0].clientY;
  }, [isAnimating]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - dragStartX.current;
    const dy = e.touches[0].clientY - dragStartY.current;
    // Only horizontal swipe
    if (Math.abs(dx) > Math.abs(dy)) {
      setSwipeOffset(dx);
      setSwipeRotation(dx * 0.05);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (swipeOffset > 100) goPrev();
    else if (swipeOffset < -100) goNext();
    else {
      setSwipeOffset(0);
      setSwipeRotation(0);
    }
  }, [swipeOffset, goNext, goPrev]);

  const getStageIcon = (index: number) => {
    const size = 28;
    switch (index) {
      case 0: return <Radio size={size} className="text-white" />;
      case 1: return <AlertCircle size={size} className="text-white" />;
      case 2: return <EyeOff size={size} className="text-white" />;
      case 3: return <Shield size={size} className="text-white" />;
      case 4: return <Lock size={size} className="text-white" />;
      case 5: return <CheckCircle size={size} className="text-white" />;
      default: return <Shield size={size} className="text-white" />;
    }
  };

  const getStageGradient = (index: number) => {
    const gradients = [
      'from-red-600 to-red-800',
      'from-orange-500 to-orange-700',
      'from-amber-500 to-amber-700',
      'from-yellow-500 to-yellow-700',
      'from-emerald-500 to-emerald-700',
      'from-green-500 to-green-700',
    ];
    return gradients[index] || gradients[0];
  };

  const getStageAccent = (index: number) => {
    const colors = [
      '#DC2626',
      '#EA580C',
      '#D97706',
      '#CA8A04',
      '#10B981',
      '#22C55E',
    ];
    return colors[index] || colors[0];
  };

  const getStageLabel = (index: number) => {
    const labels = [
      'Discovery',
      'Breach',
      'Spread',
      'Detect',
      'Contain',
      'Fix',
    ];
    return labels[index] || labels[0];
  };

  // Desktop version — unchanged
  const DesktopView = () => (
    <div className="how-it-works-grid grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-center">
      {/* Left Column: Stages 1-3 */}
      <div className="how-it-works-columns order-2 lg:order-1 flex flex-col gap-2 sm:gap-3 lg:gap-4 min-w-0">
        {attackStages.slice(0, 3).map((stage) => {
          const isActive = activeLayer === stage.layerIndex;
          return (
            <div
              key={stage.layerIndex}
              onClick={() => setActiveLayer(stage.layerIndex)}
              className={`feature-item border rounded-lg sm:rounded-xl p-3 sm:p-4.5 cursor-pointer transition-all duration-300 ${
                isActive 
                  ? 'bg-[#E87722]/10 border-[#E87722]/35 shadow-lg shadow-[#E87722]/5' 
                  : 'bg-white/2 border-transparent active:bg-white/4'
              }`}
            >
              <div className="feature-title font-mono text-[10px] sm:text-xs font-bold tracking-wider text-white mb-1 sm:mb-2 flex items-center gap-1.5 sm:gap-2.5">
                <span className={`feature-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-[#E87722] shadow-[0_0_8px_rgba(232,119,34,0.8)]' : 'bg-white/30'
                }`}></span>
                {stage.title}
              </div>
              <p className={`feature-desc font-inter text-[10px] sm:text-xs md:text-sm leading-relaxed transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-neutral-400'
              }`}>
                {stage.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Center Column: 3D Stack Visualization */}
      <div className="order-1 lg:order-2 flex items-center justify-center py-6 sm:py-8 lg:py-0 min-w-0">
        <div className="layer-stack-container relative w-full max-w-[200px] h-[200px] sm:max-w-[260px] sm:h-[260px] md:max-w-[280px] md:h-[280px]">
          <div className="layer-stack w-full h-full relative transform-style-3d rotate-x-60 rotate-z-[-45deg]">
            {attackStages.map((stage) => {
              const isActive = activeLayer === stage.layerIndex;
              const translateZ = -stage.layerIndex * 28;
              
              return (
                <div
                  key={stage.layerIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLayer(stage.layerIndex);
                  }}
                  style={{
                    transform: `translate(-50%, -50%) translateZ(${translateZ}px)`,
                    zIndex: 10 - stage.layerIndex
                  }}
                  className={`layer absolute w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 left-1/2 top-1/2 rounded-xl transition-all duration-500 cursor-pointer ${
                    isActive ? 'active-3d-layer' : ''
                  }`}
                >
                  <div className={`absolute inset-0 rounded-xl border transition-all duration-500 flex items-center justify-center font-mono text-xs font-bold ${
                    isActive 
                      ? 'bg-gradient-to-br from-[#E87722]/40 to-[#E87722]/15 border-[#E87722]/60 shadow-[0_0_30px_rgba(232,119,34,0.3)] text-white' 
                      : 'bg-gradient-to-br from-white/10 to-white/2 border-white/15 text-white/40'
                  }`}>
                    <div className="text-center transform rotate-z-[45deg] rotate-x-[-30deg]">
                      <div className="text-base sm:text-lg md:text-xl mb-0.5">0{stage.layerIndex + 1}</div>
                      <div className="text-[8px] sm:text-[9px] md:text-[10px] tracking-widest uppercase font-mono max-w-[60px] sm:max-w-[80px] truncate">
                        {stage.title.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Stages 4-6 */}
      <div className="how-it-works-columns order-3 flex flex-col gap-2 sm:gap-3 lg:gap-4 min-w-0">
        {attackStages.slice(3, 6).map((stage) => {
          const isActive = activeLayer === stage.layerIndex;
          return (
            <div
              key={stage.layerIndex}
              onClick={() => setActiveLayer(stage.layerIndex)}
              className={`feature-item border rounded-lg sm:rounded-xl p-3 sm:p-4.5 cursor-pointer transition-all duration-300 ${
                isActive 
                  ? 'bg-[#E87722]/10 border-[#E87722]/35 shadow-lg shadow-[#E87722]/5' 
                  : 'bg-white/2 border-transparent active:bg-white/4'
              }`}
            >
              <div className="feature-title font-mono text-[10px] sm:text-xs font-bold tracking-wider text-white mb-1 sm:mb-2 flex items-center gap-1.5 sm:gap-2.5">
                <span className={`feature-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-[#E87722] shadow-[0_0_8px_rgba(232,119,34,0.8)]' : 'bg-white/30'
                }`}></span>
                {stage.title}
              </div>
              <p className={`feature-desc font-inter text-[10px] sm:text-xs md:text-sm leading-relaxed transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-neutral-400'
              }`}>
                {stage.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ─── MOBILE: Tinder-Style Card Swiper ───
  const MobileView = () => {
    const stage = attackStages[activeLayer];
    const progress = ((activeLayer + 1) / totalStages) * 100;

    // Calculate card stack offset for the "deck" effect
    const getCardStyle = (index: number) => {
      const isTop = index === activeLayer;
      const isNext = index === activeLayer + 1;
      const isPast = index < activeLayer;
      const isFuture = index > activeLayer + 1;

      if (isTop) {
        return {
          transform: `translateX(${swipeOffset}px) rotate(${swipeRotation}deg)`,
          transition: isDragging.current ? 'none' : 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: 10,
          opacity: 1,
          scale: 1,
        };
      }
      if (isNext) {
        return {
          transform: 'scale(0.92) translateY(8px)',
          zIndex: 5,
          opacity: 0.6,
        };
      }
      if (isPast) {
        return {
          transform: 'scale(0.85) translateY(16px)',
          zIndex: 1,
          opacity: 0.2,
        };
      }
      // Future cards (hidden)
      return {
        transform: 'scale(0.85) translateY(16px)',
        zIndex: 0,
        opacity: 0,
      };
    };

    return (
      <div className="block lg:hidden">
        {/* Top Progress + Dots */}
        <div className="flex items-center gap-1.5 mb-6 px-1">
          {attackStages.map((s, i) => (
            <div
              key={s.layerIndex}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeLayer 
                  ? 'flex-1 bg-[#E87722]' 
                  : i < activeLayer 
                    ? 'flex-1 bg-[#E87722]/40' 
                    : 'flex-1 bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Stage Label */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: getStageAccent(activeLayer) }}
            />
            <span className="text-white/40 font-mono text-xs tracking-wider">
              STAGE {activeLayer + 1}/{totalStages}
            </span>
          </div>
          <span className="text-white/20 font-mono text-[10px]">
            {getStageLabel(activeLayer)}
          </span>
        </div>

        {/* Card Deck */}
        <div className="relative h-[420px] mb-4">
          {/* Stacked cards behind */}
          {attackStages.map((s, i) => {
            if (i <= activeLayer) return null; // Past cards hidden behind
            const style = getCardStyle(i);
            return (
              <div
                key={s.layerIndex}
                className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent"
                style={style}
              />
            );
          })}

          {/* Active Card */}
          <div
            ref={cardRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
            style={getCardStyle(activeLayer)}
          >
            {/* Swipe indicator - Like (right) */}
            <div 
              className={`absolute top-6 left-6 z-20 transition-all duration-200 ${
                swipeOffset > 50 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            >
              <div className="bg-emerald-500 text-white text-sm font-bold py-2 px-4 rounded-lg rotate-[-12deg] shadow-lg border-2 border-emerald-400">
                EXPLORE
              </div>
            </div>

            {/* Swipe indicator - Nope (left) */}
            <div 
              className={`absolute top-6 right-6 z-20 transition-all duration-200 ${
                swipeOffset < -50 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            >
              <div className="bg-red-500 text-white text-sm font-bold py-2 px-4 rounded-lg rotate-[12deg] shadow-lg border-2 border-red-400">
                SKIP
              </div>
            </div>

            {/* Card Background */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${getStageGradient(activeLayer)}`}>
              {/* Noise overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
              }} />
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-30 blur-3xl" style={{ backgroundColor: getStageAccent(activeLayer) }} />
            </div>

            {/* Card Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6">
              {/* Top section */}
              <div>
                {/* Stage number */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white font-mono text-lg font-bold">
                      {String(activeLayer + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    {getStageIcon(activeLayer)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-2xl tracking-tight mb-2">
                  {stage.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 font-inter text-sm leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Bottom section */}
              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] px-3 py-1.5 rounded-full bg-white/10 text-white/60 border border-white/10 font-inter backdrop-blur-sm">
                    Attack Stage
                  </span>
                  <span className="text-[10px] px-3 py-1.5 rounded-full bg-white/10 text-white/60 border border-white/10 font-inter backdrop-blur-sm">
                    {getStageLabel(activeLayer)}
                  </span>
                  <span className="text-[10px] px-3 py-1.5 rounded-full bg-white/10 text-white/60 border border-white/10 font-inter backdrop-blur-sm">
                    Chain Link {activeLayer + 1}
                  </span>
                </div>

                {/* Swipe hint */}
                {showSwipeHint && (
                  <div className="flex items-center justify-center gap-2 text-white/30">
                    <ChevronLeft size={14} className="animate-pulse" />
                    <span className="text-[10px] font-inter tracking-wider uppercase">Swipe to explore the attack chain</span>
                    <ChevronRight size={14} className="animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {/* Rewind */}
          <button
            onClick={goPrev}
            disabled={activeLayer === 0}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
              activeLayer === 0
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : 'bg-white/10 text-white/70 hover:bg-white/20 active:scale-90 border border-white/10'
            }`}
          >
            <RotateCcw size={20} />
          </button>

          {/* Current stage indicator */}
          <div className="flex flex-col items-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center border-2"
              style={{ 
                borderColor: getStageAccent(activeLayer),
                boxShadow: `0 0 20px ${getStageAccent(activeLayer)}40`
              }}
            >
              <Sparkles size={22} style={{ color: getStageAccent(activeLayer) }} />
            </div>
            <span className="text-[10px] text-white/30 font-mono mt-1.5">
              {activeLayer + 1}/{totalStages}
            </span>
          </div>

          {/* Forward */}
          <button
            onClick={goNext}
            disabled={activeLayer === totalStages - 1}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
              activeLayer === totalStages - 1
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : 'bg-white/10 text-white/70 hover:bg-white/20 active:scale-90 border border-white/10'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Chain Progress Visualization */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <div className="text-[10px] font-mono text-white/30 tracking-wider uppercase mb-3 flex items-center gap-2">
            <span>Attack Chain</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="flex items-start gap-0">
            {attackStages.map((s, i) => (
              <React.Fragment key={s.layerIndex}>
                <button
                  onClick={() => { setActiveLayer(i); setSwipeOffset(0); setSwipeRotation(0); }}
                  className="flex-1 flex flex-col items-center group"
                >
                  <div 
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-all duration-300 ${
                      i === activeLayer
                        ? 'text-white shadow-lg scale-110'
                        : i < activeLayer
                          ? 'text-white/70'
                          : 'bg-white/10 text-white/30'
                    }`}
                    style={{
                      backgroundColor: i <= activeLayer ? getStageAccent(i) : undefined,
                      boxShadow: i === activeLayer ? `0 0 12px ${getStageAccent(i)}60` : undefined
                    }}
                  >
                    {i + 1}
                  </div>
                  <span className={`text-[7px] font-mono mt-1.5 text-center leading-tight max-w-[50px] transition-colors duration-300 ${
                    i <= activeLayer ? 'text-white/50' : 'text-white/20'
                  }`}>
                    {getStageLabel(i)}
                  </span>
                </button>
                {i < totalStages - 1 && (
                  <div 
                    className={`flex-1 h-0.5 mt-3.5 transition-colors duration-300 rounded-full ${
                      i < activeLayer ? 'opacity-60' : 'bg-white/10'
                    }`}
                    style={{ backgroundColor: i < activeLayer ? getStageAccent(i) : undefined }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="attack-path" className="how-it-works-section py-16 md:py-28 relative overflow-hidden bg-black">
      {/* Background radial gradient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#E87722]/15 to-transparent blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="section-eyebrow text-[#E87722] font-semibold text-xs tracking-widest uppercase mb-3">
            Attack Surface Correlation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            From a single <span className="italic text-[#E87722]">entry point</span> to <span className="italic text-[#E87722]">full breach.</span>
          </h2>
          <p className="text-neutral-400 font-inter text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Most security tools show you 500 alerts. We show you the 3 attack paths that could actually lead to a breach. Here's how a single chain unfolds — and how Drocol stops it at every stage.
          </p>
        </div>

        {/* Desktop: 3-column layout with 3D stack */}
        <div className="hidden lg:block">
          <DesktopView />
        </div>

        {/* Mobile: Tinder-style card swiper */}
        <MobileView />

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <SpecularButton
            {...specularPrimary}
            size="md"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            See It In Action <ArrowRight size={14} strokeWidth={2.5} />
          </SpecularButton>
        </div>

      </div>

      <style>{`
        .rotate-x-60 {
          transform: rotateX(60deg);
        }
        .rotate-z-[-45deg] {
          transform: rotateZ(-45deg);
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-z-\\[45deg\\] {
          transform: rotateZ(45deg);
        }
        .rotate-x-\\[-30deg\\] {
          transform: rotateX(-30deg);
        }
      `}</style>
    </section>
  );
};