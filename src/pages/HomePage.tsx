import React from 'react';
import { Hero } from '../components/Hero';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { WhyWeExist } from '../components/WhyWeExist';
import { MoreThanTech } from '../components/MoreThanTech';
import { Approach } from '../components/Approach';
import { Insights } from '../components/Insights';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <WhyWeExist />
      <MoreThanTech />
      <Approach />
      <Insights />
    </>
  );
};
