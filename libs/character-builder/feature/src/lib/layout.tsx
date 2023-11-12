'use client';
import { Box } from '@mui/material';

import { CharacterCreationStepper } from './CharacterCreationStepper';
import { CharacterCreationContextProvider } from './CharacterCreationContextProvider';
import React, { PropsWithChildren, useState } from 'react';

export const steps = [
  { title: 'Select class', route: 'class' },
  {
    title: 'Select ancestry and ability scores',
    route: 'abilityScores',
  },
  { title: 'Select feats', route: 'feats' },
  { title: 'Select starting equipment', route: 'equipment' },
];

export const Layout = (props: {
  children: React.ReactNode;
  class: React.ReactNode;
  abilityScores: React.ReactNode;
  feats: React.ReactNode;
  equipment: React.ReactNode;
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <CharacterCreationContextProvider
      steps={steps}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
    >
      <Box sx={{ mb: 2 }}>
        <CharacterCreationStepper steps={steps} />
      </Box>
      {props[steps[activeStep].route]}
      {props.children}
    </CharacterCreationContextProvider>
  );
};
