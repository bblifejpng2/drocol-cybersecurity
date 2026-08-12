import React from 'react';
import { PageHero } from '../components/PageHero';
import { TechnologySection } from '../components/TechnologySection';
import { CtaBand } from '../components/CtaBand';

export const TechnologyPage: React.FC = () => {
  return (
    <>
      <PageHero
        label="Technology"
        title={<>Built to amplify expertise. <span className="text-white/40 font-light italic">Not replace it.</span></>}
        intro="An automated assessment platform where machines do the heavy lifting and certified security professionals make the final call."
      />
      <TechnologySection />
      <CtaBand />
    </>
  );
};
