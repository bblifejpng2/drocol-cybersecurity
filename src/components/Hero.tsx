import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SpecularButton, specularPrimary, specularOutlineDark } from './SpecularButton';
import { InteractiveGlobe } from '../pages/GlobePage';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative flex min-h-[100vh] items-center overflow-hidden bg-[#FFFFFF]">
      {/* Interactive globe — absolute, centered BEHIND the content; sized to
          always fit fully on screen (never wider than the viewport, never
          taller than 78% of it) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <InteractiveGlobe className="w-[min(1000px,92vw,78vh)]" />
      </div>

      {/* Content — layered above the globe */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3.5 py-1.5 rounded-full border border-neutral-900/10 bg-neutral-900/[0.04]"
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
          <h1 className="text-[34px] xs:text-[38px] sm:text-5xl md:text-[56px] lg:text-[68px] xl:text-[72px] font-medium leading-[1.08] tracking-[-0.025em] mb-4 sm:mb-5 lg:mb-6 text-neutral-900 font-sans max-w-4xl">
            Helping organizations build{' '}
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(90deg, #E87722 0%, #F5A623 60%, #E87722 100%)',
              display: 'inline-block',
              padding: '0.12em 0.18em',
              margin: '-0.12em -0.18em',
            }}>confidence</span>{' '}
            in their security.
          </h1>

          {/* Body */}
          <p className="text-[15px] sm:text-base lg:text-lg text-neutral-600 max-w-xl font-inter leading-relaxed mx-auto mb-6 sm:mb-8 lg:mb-10">
            Drocol helps organizations identify vulnerabilities, manage cyber risk, strengthen their security, and build better security capabilities through expert consulting and technology.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3 mb-5 sm:mb-8">
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
              Solutions
            </SpecularButton>
          </div>

          <p className="text-[12px] sm:text-[13px] text-neutral-500 font-inter">
            No pressure. No jargon. Just a practical conversation about your security.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
