import React from 'react';
import { Hero } from '../components/Hero';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { WhyWeExist } from '../components/WhyWeExist';
import { MoreThanTech } from '../components/MoreThanTech';
import { Approach } from '../components/Approach';
import { IndustriesSection } from '../components/IndustriesSection';
import MagicBento from '../components/MagicBento';
import { Insights } from '../components/Insights';
import { Vision } from '../components/Vision';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <WhyWeExist />
      <MoreThanTech />
      <Approach />

      {/* Magic Bento — platform grid */}
      <section className="relative bg-[#080808] py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.25) 50%, transparent)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.12) 50%, transparent)' }}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="font-mono font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 'clamp(10px, 1.5vw, 12px)', color: '#F5A623' }}>
              The Drocol Platform
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-white">
              Six disciplines, one platform.
            </h2>
          </div>
          <div className="flex justify-center">
            <MagicBento
              textAutoHide
              enableStars
              enableSpotlight
              enableBorderGlow
              enableTilt={false}
              enableMagnetism={false}
              clickEffect
              spotlightRadius={400}
              particleCount={12}
              glowColor="232, 119, 34"
              disableAnimations={false}
            />
          </div>
        </div>
      </section>

      <IndustriesSection />
      <Insights />
      <Vision />
    </>
  );
};
