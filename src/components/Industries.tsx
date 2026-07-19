import React from 'react';
import { Landmark, Activity, Wifi, Cpu, ShieldCheck, ShoppingBag } from 'lucide-react';
import { industries, Industry } from '../lib/data';

export const Industries: React.FC = () => {
  const getIndustryIcon = (type: string) => {
    switch (type) {
      case 'bank': return <Landmark size={32} />;
      case 'health': return <Activity size={32} />;
      case 'telco': return <Wifi size={32} />;
      case 'software': return <Cpu size={32} />;
      case 'mssp': return <ShieldCheck size={32} />;
      case 'ecommerce': return <ShoppingBag size={32} />;
      default: return <ShieldCheck size={32} />;
    }
  };

  return (
    <section className="industries-section py-16 md:py-28 bg-[#F3EDE2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="section-eyebrow text-[#E87722] font-semibold text-xs tracking-widest uppercase mb-3">
            Industries We Serve
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.05]">
            Built for regulated<br/><span className="italic text-[#E87722]">Nigerian enterprise.</span>
          </h2>
          <p className="text-neutral-600 font-inter mt-5 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            From fintech to healthcare, we understand the unique security challenges facing Nigerian businesses. Our platform is designed to meet the specific compliance and operational requirements of your industry.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {industries.map((ind: Industry) => (
            <div 
              key={ind.number}
              className="industry-card-new group relative bg-white border border-neutral-200/80 rounded-xl md:rounded-2xl p-5 md:p-8 transition-all duration-400 overflow-hidden cursor-pointer"
            >
              {/* Subtle top border line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E87722] to-[#F08B3A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"></div>
              
              {/* Large backdrop number */}
              <div className="industry-number absolute top-5 right-6 font-mono text-5xl font-bold text-neutral-900/5 group-hover:text-[#E87722]/15 transition-all duration-400 group-hover:scale-110 select-none">
                {ind.number}
              </div>

              {/* Icon */}
              <div className="industry-icon-new w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#FFF5EB] to-[#FFE8D6] group-hover:from-[#E87722] group-hover:to-[#F08B3A] flex items-center justify-center mb-4 md:mb-6 transition-all duration-400 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-lg group-hover:shadow-[#E87722]/20">
                <div className="text-[#E87722] group-hover:text-white transition-colors duration-400 [&>svg]:w-6 [&>svg]:h-6 md:[&>svg]:w-8 md:[&>svg]:h-8">
                  {getIndustryIcon(ind.iconType)}
                </div>
              </div>

              {/* Title */}
              <h3 className="industry-title-new text-lg md:text-xl font-bold text-neutral-900 mb-2 md:mb-3 group-hover:text-[#E87722] transition-colors duration-400">
                {ind.title}
              </h3>

              {/* Description */}
              <p className="industry-desc-new font-inter text-neutral-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 group-hover:text-neutral-700 transition-colors duration-400">
                {ind.description}
              </p>

              {/* Bullet Features */}
              <div className="industry-features pt-3 md:pt-5 border-t border-neutral-100 flex flex-wrap gap-1.5 md:gap-2">
                {ind.features.map((feature, idx) => (
              <span 
                key={idx}
                className="industry-feature-tag font-mono text-[9px] md:text-[10px] font-bold tracking-wider px-2 md:px-2.5 py-0.5 md:py-1 rounded bg-[#E87722]/5 text-[#E87722] group-hover:bg-[#E87722]/12 transition-all duration-300"
              >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
