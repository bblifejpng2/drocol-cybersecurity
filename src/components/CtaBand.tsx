import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SpecularButton, specularPrimary } from './SpecularButton';

/** Compact call-to-action band used at the bottom of sub-pages. */
export const CtaBand: React.FC = () => {
  return (
    <section className="relative bg-[#0D0600] py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.3) 0%, transparent 65%)', filter: 'blur(80px)' }}/>
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'linear-gradient(rgba(232,119,34,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,119,34,0.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}/>
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.5) 50%, transparent)' }}/>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.1] text-white mb-2">
              Ready to build{' '}
              <span className="text-transparent bg-clip-text italic font-light"
                style={{ backgroundImage: 'linear-gradient(90deg, #E87722, #F5A623)' }}>
                confidence
              </span>{' '}
              together?
            </h2>
            <p className="text-white/40 font-inter text-sm leading-relaxed">
              Talk to our security team. No pressure, no jargon — just a practical conversation about your security.
            </p>
          </div>
          <SpecularButton
            {...specularPrimary}
            size="lg"
            to="/contact"
            className="shrink-0"
          >
            Let's talk
            <ArrowRight size={14} strokeWidth={2.5}/>
          </SpecularButton>
        </div>
      </div>
    </section>
  );
};
