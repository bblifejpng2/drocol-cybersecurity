import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SpecularButton, specularPrimary, specularOutlineDark } from './SpecularButton';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative flex items-center overflow-hidden bg-[#F3EDE2]">

      <div className="w-full relative z-10 px-5 sm:px-8 md:px-10 max-w-7xl mx-auto pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-10 sm:pb-14 md:pb-20 lg:pb-24">

        {/* ── Mobile: stacked, generous sizes. sm+: side by side ── */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start w-full"
          >
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-5 sm:mb-6 lg:mb-8 px-3.5 py-1.5 rounded-full border border-neutral-900/10 bg-neutral-900/[0.04]"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E87722] opacity-75"/>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E87722]"/>
              </span>
              <span className="text-[10px] sm:text-[11px] font-inter font-semibold tracking-[0.12em] text-neutral-600 uppercase">
                Building the future of cybersecurity
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-[34px] xs:text-[38px] sm:text-5xl md:text-[56px] lg:text-[68px] xl:text-[72px] font-medium leading-[1.08] tracking-[-0.025em] mb-4 sm:mb-5 lg:mb-6 text-neutral-900 font-sans">
              Helping organizations build{' '}
              <span className="text-transparent bg-clip-text" style={{
                backgroundImage: 'linear-gradient(90deg, #E87722 0%, #F5A623 60%, #E87722 100%)',
              }}>confidence</span>{' '}
              in their security.
            </h1>

            {/* Body */}
            <p className="text-[15px] sm:text-base lg:text-lg text-neutral-600 max-w-lg mb-6 sm:mb-8 lg:mb-10 font-inter leading-relaxed">
              Cybersecurity is more than preventing attacks. Drocol combines expert consulting, original research, and AI-powered technology to help you understand your risks, strengthen your defenses, and prepare for what's next.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-5 sm:mb-8">
              <SpecularButton
                {...specularPrimary}
                size="lg"
                href="/contact"
                onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
              >
                Let's talk
                <ArrowRight size={14} strokeWidth={2.5}/>
              </SpecularButton>
              <SpecularButton
                {...specularOutlineDark}
                size="lg"
                href="/solutions"
                onClick={(e) => { e.preventDefault(); navigate('/solutions'); }}
              >
                Explore our approach
              </SpecularButton>
            </div>

            <p className="text-[12px] sm:text-[13px] text-neutral-500 font-inter">
              No pressure. No jargon. Just a practical conversation about your security.
            </p>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center w-full"
          >
            {/* Constrain width on mobile so it doesn't dominate */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.03 }}
              className="relative w-full max-w-[340px] sm:max-w-full mx-auto group"
            >

              {/* Soft ambient glow behind the render */}
              <div className="absolute -inset-6 sm:-inset-10 opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.3) 0%, transparent 65%)', filter: 'blur(30px)' }}/>

              {/* Render — integrated into the background */}
              <div className="relative">
                <img
                  src="/dtlpng-butter.png"
                  alt="Drocol security intelligence platform"
                  className="w-full h-auto block"
                />
              </div>

              {/* Badge — threats */}
              <motion.div
                initial={{ opacity: 0, x: -16, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-6 flex items-center gap-2.5 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-white/10 backdrop-blur-xl"
                style={{ background: 'rgba(8,8,8,0.88)', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #E87722, #F5A623)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-tight">45M+ Threats Blocked</div>
                  <div className="text-[9px] text-white/40 font-inter mt-0.5">This month · Nigeria</div>
                </div>
              </motion.div>

              {/* Badge — uptime */}
              <motion.div
                initial={{ opacity: 0, x: 16, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.75, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-5 px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-white/10 backdrop-blur-xl"
                style={{ background: 'rgba(8,8,8,0.88)', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
              >
                <div className="text-[9px] font-inter text-white/40 mb-0.5">System Uptime</div>
                <div className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.8)] shrink-0"/>
                  99.98%
                </div>
              </motion.div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
