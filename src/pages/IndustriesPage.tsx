import React from 'react';
import { PageHero } from '../components/PageHero';
import { IndustriesSection } from '../components/IndustriesSection';
import { CtaBand } from '../components/CtaBand';

export const IndustriesPage: React.FC = () => {
  return (
    <>
      <PageHero
        theme="light"
        label="Industries"
        title={
          <>
            Security that fits{' '}
            <span className="italic text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(90deg, #E87722 0%, #F5A623 60%, #E87722 100%)',
              display: 'inline-block',
              padding: '0.12em 0.18em',
              margin: '-0.12em -0.18em',
            }}>your industry.</span>
          </>
        }
        intro="Every industry faces different threats, regulations, and operational realities. Understanding those differences is where good security begins — and where we start every engagement."
      />
      <IndustriesSection />
      <CtaBand />
    </>
  );
};
