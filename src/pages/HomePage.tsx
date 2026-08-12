import React from 'react';
import { Hero } from '../components/Hero';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { WhyWeExist } from '../components/WhyWeExist';
import { MoreThanTech } from '../components/MoreThanTech';
import { Approach } from '../components/Approach';
import { IndustriesSection } from '../components/IndustriesSection';
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

      <IndustriesSection />
      <Insights />
      <Vision />
    </>
  );
};
