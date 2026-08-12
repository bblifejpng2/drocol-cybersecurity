import React from 'react';
import { PageHero } from '../components/PageHero';
import { TechnologySection } from '../components/TechnologySection';
import { CtaBand } from '../components/CtaBand';

export const TechnologyPage: React.FC = () => {
  return (
    <>
      <PageHero
        theme="light"
        label="Technology"
        title={<>Built to amplify expertise. <span className="text-[#1A1A1A]/45 font-light italic">Not replace it.</span></>}
        intro="An automated assessment platform where machines do the heavy lifting and certified security professionals make the final call."
      />
      <TechnologySection />
      <CtaBand />
    </>
  );
};
