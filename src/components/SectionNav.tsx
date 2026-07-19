import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface SectionNavProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const SectionNav: React.FC<SectionNavProps> = ({ activeSection, onSectionChange }) => {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'threats', label: 'Live Threats' },
    { id: 'features', label: 'Features' },
    { id: 'attack-path', label: 'How It Works' },
    { id: 'contact', label: 'Contact' },
  ];

  const currentIndex = sections.findIndex((s) => s.id === activeSection);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevSection = sections[currentIndex - 1].id;
      document.getElementById(prevSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onSectionChange(prevSection);
    }
  };

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1].id;
      document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onSectionChange(nextSection);
    }
  };

  return (
    <>
      {/* Right-side Dot Indicators */}
      <div className="section-scroll-nav fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 bg-[#0B0B0B]/60 backdrop-blur-md border border-white/10 rounded-full py-4 px-2.5">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              onSectionChange(section.id);
            }}
            className={`section-dot w-2.5 h-2.5 rounded-full bg-white/30 hover:bg-white/60 transition-all relative group ${
              activeSection === section.id ? 'active' : ''
            }`}
            aria-label={section.label}
          >
            {/* Tooltip Label */}
            <span className="section-label absolute right-6 top-1/2 -translate-y-1/2 bg-[#0B0B0B]/90 text-white font-inter text-[11px] font-medium py-1 px-2.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-1.5 group-hover:translate-x-0 whitespace-nowrap">
              {section.label}
            </span>
          </button>
        ))}
      </div>

      {/* Left-side Navigation Arrows */}
      <div className="scroll-arrow fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2.5">
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="w-10 h-10 rounded-full bg-[#0B0B0B]/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#E87722] hover:border-[#E87722] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#0B0B0B]/60 disabled:hover:border-white/10"
          aria-label="Previous section"
        >
          <ArrowUp size={16} strokeWidth={2.5} />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= sections.length - 1}
          className="w-10 h-10 rounded-full bg-[#0B0B0B]/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#E87722] hover:border-[#E87722] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#0B0B0B]/60 disabled:hover:border-white/10"
          aria-label="Next section"
        >
          <ArrowDown size={16} strokeWidth={2.5} />
        </button>
      </div>
    </>
  );
};
