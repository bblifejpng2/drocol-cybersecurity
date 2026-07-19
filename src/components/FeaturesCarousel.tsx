import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Check } from 'lucide-react';
import { moduleData, ModuleData } from '../lib/data';

export const FeaturesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);

  // Responsive visible cards count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, moduleData.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(maxIndex, index));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const openModal = (e: React.MouseEvent, module: ModuleData) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedModule(module);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedModule(null);
    document.body.style.overflow = '';
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="features" className="bg-[#0B0B0B] py-16 md:py-28 relative">
      {/* Background radial glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#E87722] blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-14 gap-6">
          <div>
            <div className="section-eyebrow text-[#E87722] font-semibold text-xs tracking-widest uppercase mb-2">
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              Everything your<br/>security team needs.
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md font-inter text-xs sm:text-sm md:text-base leading-relaxed">
            Five integrated modules that replace a dozen point solutions — built for the realities of Nigerian enterprise infrastructure.
          </p>
        </div>

        {/* Carousel Viewport */}
        <div 
          className="carousel-viewport w-full overflow-hidden" 
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div 
            className="carousel-track flex gap-4"
            animate={{
              x: `-${currentIndex * (100 / visibleCount + (visibleCount === 3 ? 0.5 : visibleCount === 2 ? 0.8 : 0))}%`
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {moduleData.map((module, index) => (
              <div
                key={index}
                className="carousel-card dark-card flex-shrink-0"
                style={{
                  width: `calc(${100 / visibleCount}% - ${(16 * (visibleCount - 1)) / visibleCount}px)`
                }}
              >
                <div className="num-tag text-xs font-mono text-[#E87722] font-semibold mb-2">
                  {module.number}
                </div>
                
                {/* Card Image */}
                <div className="card-img w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-neutral-900 border border-white/5">
                  <img 
                    src={module.imageUrl} 
                    alt={module.title} 
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                  {module.title}
                </h3>
                
                <p className="text-xs md:text-sm text-neutral-400 font-inter leading-relaxed flex-grow">
                  {module.description}
                </p>
                
                <button 
                  onClick={(e) => openModal(e, module)}
                  className="learn-more mt-4 inline-flex items-center gap-2 font-mono text-xs font-bold text-white bg-white/5 hover:bg-[#E87722]/20 border border-white/10 hover:border-[#E87722]/50 px-3.5 py-1.5 rounded-lg transition-all duration-300"
                >
                  Explore module <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-between mt-6 md:mt-10">
          {/* Dots */}
          <div className="flex gap-2" id="carouselDots">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`carousel-dot h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'bg-[#E87722] w-5 md:w-7' 
                    : 'bg-white/20 w-1.5 md:w-2 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="carousel-nav w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 hover:bg-[#E87722] border border-white/10 hover:border-[#E87722] text-white flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5"
              aria-label="Previous capability"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="carousel-nav w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 hover:bg-[#E87722] border border-white/10 hover:border-[#E87722] text-white flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5"
              aria-label="Next capability"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* Module Features Modal */}
      <AnimatePresence>
        {selectedModule && (
          <div 
            className="module-modal fixed inset-0 w-full h-full bg-black/80 backdrop-blur-md z-[1000] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="module-modal-content bg-[#1A1A1A] border border-white/10 rounded-3xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto p-8 md:p-10 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="module-modal-close absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-[#E87722] border border-transparent hover:border-white/10 text-white flex items-center justify-center transition-all duration-300 hover:rotate-90"
                aria-label="Close modal"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              <div className="module-modal-number text-xs font-mono text-[#E87722] font-bold mb-3">
                {selectedModule.number}
              </div>
              
              <h3 className="module-modal-title text-2xl md:text-3xl font-bold text-white mb-4 leading-tight font-sans">
                {selectedModule.title}
              </h3>
              
              <p className="module-modal-description font-inter text-neutral-300 text-sm md:text-base leading-relaxed mb-8">
                {selectedModule.description}
              </p>
              
              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-4">
                  Key Capabilities
                </h4>
                <ul className="module-modal-features divide-y divide-white/5 border-y border-white/5">
                  {selectedModule.features.map((feature, i) => (
                    <li key={i} className="module-modal-feature py-3.5 flex items-start gap-3.5 font-inter text-sm text-neutral-200">
                      <div className="w-5 h-5 rounded-full bg-[#E87722]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-[#E87722]" strokeWidth={3} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  closeModal();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="module-modal-cta w-full sm:w-auto justify-center flex items-center gap-2"
              >
                Book Demo Setup <ArrowRight size={14} strokeWidth={2.5} />
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
