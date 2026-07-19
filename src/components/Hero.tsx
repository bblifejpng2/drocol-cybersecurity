import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="bg-cream py-16 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 bg-white border border-light rounded-full px-4 py-2 mb-8 shadow-sm">
              <span className="text-lg">🚀</span>
              <span className="text-sm font-inter font-medium text-neutral-800">Protecting 250+ Nigerian Organizations</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] sm:leading-[0.95] tracking-tight mb-6 md:mb-8 text-neutral-950 font-sans">
              Enterprise<br/>Cybersecurity<br/>
              <span className="italic font-normal text-[#E87722]">Made Intelligent.</span>
            </h1>
            
            <p className="text-base md:text-lg text-neutral-600 max-w-xl mb-8 md:mb-10 font-inter leading-relaxed">
              Real-time threat detection, attack path analysis, and developer-ready APIs. Built by Nigerians, for Nigerian enterprises.
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-4 mb-10 md:mb-12 w-full sm:w-auto">
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="btn-accent"
              >
                Start Free Trial <span className="ml-1">→</span>
              </a>
              <a 
                href="#features" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="btn-outline"
              >
                Learn About Us
              </a>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-neutral-500 font-inter">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-medium text-neutral-700">24/7 Nigerian Support</span>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative"
          >
            {/* Hero Image Container */}
            <div className="hero-img-wrap aspect-square floaty shadow-xl border border-neutral-200/50">
              <img 
                src="https://image.qwenlm.ai/public_source/9253bf66-aa18-4aa0-b6fe-f19fb1fbbfb0/1d6fd7bc1-2c01-4ad7-b88b-f0b425398aa9.png" 
                alt="Drocol Cybersecurity intelligence architecture visualization" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Bottom-left Badge */}
            <div className="hero-badges absolute -bottom-4 md:-bottom-6 -left-2 md:-left-6 bg-white border border-light rounded-2xl p-3 md:p-5 shadow-2xl max-w-[180px] sm:max-w-[210px] md:max-w-xs transition-transform hover:scale-105 duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#E87722] flex items-center justify-center text-lg md:text-xl text-white shadow-lg shadow-[#E87722]/20">
                  🛡️
                </div>
                <div>
                <div className="text-[11px] sm:text-xs md:text-sm font-bold text-neutral-900">45M+ Threats Blocked</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-neutral-500 font-inter">This month across Nigeria</div>
                </div>
              </div>
            </div>
            
            {/* Top-right Badge */}
            <div className="hero-badges absolute -top-2 md:-top-4 -right-2 md:-right-4 bg-[#0B0B0B] text-white rounded-2xl px-3 md:px-5 py-1.5 md:py-3 shadow-2xl border border-white/10 transition-transform hover:scale-105 duration-300">
              <div className="text-[9px] sm:text-[10px] md:text-xs font-inter text-neutral-400">System Uptime</div>
              <div className="text-sm sm:text-base md:text-lg font-bold text-white flex items-center gap-1.5">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500"></span>
                99.98%
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
