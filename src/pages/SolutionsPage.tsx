import React from 'react';
import { PageHero } from '../components/PageHero';
import { HowWeHelp } from '../components/HowWeHelp';
import { CtaBand } from '../components/CtaBand';

export const SolutionsPage: React.FC = () => {
  return (
    <>
      <PageHero
        label="Solutions"
        title={<>Security services that meet you where you are.</>}
        intro="Assessments, advisory, training, and the technology that amplifies them — built around how your organization actually operates."
      />
      <HowWeHelp />
      <CtaBand />
    </>
  );
};
