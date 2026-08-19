import React from 'react';
import { Hero } from '../components/Hero';
import { StatsBar } from '../components/StatsBar';
import { WhatWeDo } from '../components/WhatWeDo';
import { WhyWeExist } from '../components/WhyWeExist';
import { MoreThanTech } from '../components/MoreThanTech';
import { Approach } from '../components/Approach';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <StatsBar />
      <WhatWeDo />
      <WhyWeExist />
      <MoreThanTech />
      <Approach />
    </>
  );
};
