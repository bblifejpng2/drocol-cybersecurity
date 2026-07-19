import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, AlertCircle, Radio, Lock, EyeOff, CheckCircle } from 'lucide-react';
import { attackStages, AttackStage } from '../lib/data';

export const AttackPathStack: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const getStageIcon = (index: number) => {
    switch (index) {
      case 0: return <Radio size={14} className="text-neutral-400" />;
      case 1: return <AlertCircle size={14} className="text-neutral-400" />;
      case 2: return <EyeOff size={14} className="text-neutral-400" />;
      case 3: return <Shield size={14} className="text-neutral-400" />;
      case 4: return <Lock size={14} className="text-neutral-400" />;
      case 5: return <CheckCircle size={14} className="text-neutral-400" />;
      default: return <Shield size={14} className="text-neutral-400" />;
    }
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

        {/* Interactive Grid */}
        <div className="how-it-works-grid grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Stages 1-3 */}
          <div className="how-it-works-columns flex flex-col gap-2 sm:gap-3 lg:gap-4">
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
                    {getStageIcon(stage.layerIndex)}
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
          <div className="flex items-center justify-center py-6 sm:py-8 lg:py-0">
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
                      {/* Layer Content Backdrop */}
                      <div className={`absolute inset-0 rounded-xl border transition-all duration-500 flex items-center justify-center font-mono text-xs font-bold ${
                        isActive 
                          ? 'bg-gradient-to-br from-[#E87722]/40 to-[#E87722]/15 border-[#E87722]/60 shadow-[0_0_30px_rgba(232,119,34,0.3)] text-white' 
                          : 'bg-gradient-to-br from-white/10 to-white/2 border-white/15 text-white/40'
                      }`}>
                        {/* Stage Number on Layer */}
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
          <div className="how-it-works-columns flex flex-col gap-2 sm:gap-3 lg:gap-4">
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
                    {getStageIcon(stage.layerIndex)}
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

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="btn-accent inline-flex items-center gap-2"
          >
            See It In Action <ArrowRight size={14} strokeWidth={2.5} />
          </a>
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