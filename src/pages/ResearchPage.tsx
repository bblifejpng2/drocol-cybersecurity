import React from 'react';
import { PageHero } from '../components/PageHero';
import { ResearchSection } from '../components/ResearchSection';
import { Insights } from '../components/Insights';
import { CtaBand } from '../components/CtaBand';

export const ResearchPage: React.FC = () => {
  return (
    <>
      <PageHero
        label="Research"
        title={<>Built on research. Applied to the real world.</>}
        intro="A long-term research program focused on emerging threats, industry trends, technical analysis, and practical guidance for organizations operating across Africa."
      />
      <Insights />
      <ResearchSection />
      <CtaBand />
    </>
  );
};
