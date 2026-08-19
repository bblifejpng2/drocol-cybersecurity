import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SpecularButton, specularPrimary, specularOutlineDark } from './SpecularButton';
import { InteractiveGlobe } from '../pages/GlobePage';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative flex min-h-[40vh] items-center overflow-hidden bg-[#FFFFFF]">
      {/* Interactive globe — absolute, centered BEHIND the content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <InteractiveGlobe className="w-[min(240px,50vw,30vh)] sm:w-[min(320px,55vw,35vh)]" />
      </div>

      {/* Content — layered above the globe */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-4 sm:px-8 sm:py-8 md:px-10 md:py-10">
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
            className="inline-flex items-center gap-2 mb-2 sm:mb-4 px-4 py-2 rounded-full border border-neutral-900/10 bg-neutral-900/[0.04]"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E87722] opacity-75"/>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E87722]"/>
            </span>
            <span className="text-[12px] sm:text-[13px] font-inter font-semibold tracking-[0.12em] text-neutral-600 uppercase">
              Building the future of cybersecurity
            </span>
          </motion.div>

          {/* Headline — bigger, bolder */}
          <h1 className="text-[32px] xs:text-[38px] sm:text-6xl md:text-[64px] lg:text-[76px] xl:text-[82px] font-bold leading-[1.05] tracking-[-0.03em] mb-2 sm:mb-4 text-neutral-900 font-sans max-w-4xl">
            Helping organizations build{' '}
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(90deg, #E87722 0%, #F5A623 60%, #E87722 100%)',
              display: 'inline-block',
              padding: '0.12em 0.18em',
              margin: '-0.12em -0.18em',
            }}>confidence</span>{' '}
            in their security.
          </h1>

          {/* Body — slightly larger */}
          <p className="text-[14px] sm:text-[17px] lg:text-[19px] text-neutral-600 max-w-xl font-inter leading-relaxed mx-auto mb-3 sm:mb-6">
            Drocol helps organizations identify vulnerabilities, manage cyber risk, strengthen their security, and build better security capabilities through expert consulting and technology.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3 mb-2 sm:mb-5">
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

          <p className="text-[13px] sm:text-[14px] text-neutral-500 font-inter">
            No pressure. No jargon. Just a practical conversation about your security.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
