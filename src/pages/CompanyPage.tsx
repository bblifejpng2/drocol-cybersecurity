import React from 'react';
import { PageHero } from '../components/PageHero';
import { CompanyMission } from '../components/CompanyMission';
import { Vision } from '../components/Vision';

export const CompanyPage: React.FC = () => {
  return (
    <>
      <PageHero
        label="Company"
        title={
          <>
            Built in Lagos. Building for{' '}
            <span className="italic text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(90deg, #E87722 0%, #F5A623 60%, #E87722 100%)',
              display: 'inline-block',
              padding: '0.12em 0.18em',
              margin: '-0.12em -0.18em',
            }}>the continent.</span>
          </>
        }
        intro="Drocol Technologies is a Nigerian cybersecurity company combining expert consulting, original research, and AI-powered technology — so African organizations can secure what matters and move forward with confidence."
      />
      <CompanyMission />
      <Vision />
    </>
  );
};
