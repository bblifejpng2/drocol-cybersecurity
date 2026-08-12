import React from 'react';

interface SectionNavProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

// Navigation arrows and dot indicators removed
export const SectionNav: React.FC<SectionNavProps> = () => null;
