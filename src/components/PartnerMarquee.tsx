import React from 'react';

export const PartnerMarquee: React.FC = () => {
  const partners = Array(8).fill({
    name: 'Redream Solutions',
    handle: '@redreamsolutions',
  });

  return (
    <section className="bg-cream py-16 md:py-24 border-y border-neutral-200/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="section-eyebrow text-[#E87722] font-semibold text-xs tracking-widest uppercase mb-2">
              Strategic Partners
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">
              Our Trusted Ecosystem
            </h2>
            <p className="text-neutral-600 mt-3 max-w-md font-inter text-sm md:text-base">
              Proudly partnering with Redream Solutions to deliver world-class cybersecurity solutions across Africa.
            </p>
          </div>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="btn-outline self-start md:self-auto"
          >
            Partner With Us
          </a>
        </div>
      </div>

      {/* Marquee Track container */}
      <div className="relative w-full overflow-hidden py-4 bg-neutral-50/30 border-y border-neutral-100">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-[200%] gap-6 marquee-container">
          <div className="marquee-track flex gap-6 shrink-0">
            {partners.map((partner, index) => (
              <div 
                key={`partner-1-${index}`} 
                className="redream-partner-card min-w-[260px] sm:min-w-[300px] md:min-w-[340px] bg-white border border-neutral-200/60 rounded-xl md:rounded-2xl p-4 md:p-5 flex items-center gap-3 md:gap-4.5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="redream-logo w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-[#E87722] to-[#F08B3A] flex items-center justify-center shrink-0 shadow-lg shadow-[#E87722]/15">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 md:w-8 md:h-8">
                    <path d="M8 6h9c4.4 0 7 2.4 7 6 0 2.5-1.4 4.4-3.6 5.3L24 26h-4.5l-3.2-8H12v8H8V6z" fill="#fff"/>
                    <path d="M12 10v5h4.5c2 0 3.2-1 3.2-2.5S18.5 10 16.5 10H12z" fill="#E87722"/>
                  </svg>
                </div>
                <div>
                  <div className="redream-name text-base md:text-lg font-bold text-neutral-900 leading-tight">
                    {partner.name}
                  </div>
                  <div className="redream-handle font-mono text-[10px] md:text-xs text-[#E87722] font-semibold tracking-wide mt-0.5 md:mt-1">
                    {partner.handle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="marquee-track flex gap-6 shrink-0" aria-hidden="true">
            {partners.map((partner, index) => (
              <div 
                key={`partner-2-${index}`} 
                className="redream-partner-card min-w-[300px] md:min-w-[340px] bg-white border border-neutral-200/60 rounded-2xl p-5 flex items-center gap-4.5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="redream-logo w-14 h-14 rounded-xl bg-gradient-to-br from-[#E87722] to-[#F08B3A] flex items-center justify-center shrink-0 shadow-lg shadow-[#E87722]/15">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                    <path d="M8 6h9c4.4 0 7 2.4 7 6 0 2.5-1.4 4.4-3.6 5.3L24 26h-4.5l-3.2-8H12v8H8V6z" fill="#fff"/>
                    <path d="M12 10v5h4.5c2 0 3.2-1 3.2-2.5S18.5 10 16.5 10H12z" fill="#E87722"/>
                  </svg>
                </div>
                <div>
                  <div className="redream-name text-lg font-bold text-neutral-900 leading-tight">
                    {partner.name}
                  </div>
                  <div className="redream-handle font-mono text-xs text-[#E87722] font-semibold tracking-wide mt-1">
                    {partner.handle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
          user-select: none;
        }
        .marquee-track {
          display: flex;
          gap: 16px;
          animation: scrollMarquee 35s linear infinite;
        }
        @media (min-width: 768px) {
          .marquee-track { gap: 24px; }
        }
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
