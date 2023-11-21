'use client';
import { Box } from '@mui/material';

import { CharacterCreationStepper } from './CharacterCreationStepper';
import { CharacterCreationContextProvider } from './CharacterCreationContextProvider';
import React, { PropsWithChildren, useMemo, useState } from 'react';

export const steps = [
  { title: 'Select class', route: 'class' },
  {
    title: 'Select ancestry and ability scores',
    route: 'abilityScores',
  },
  { title: 'Select feats', route: 'feats' },
  { title: 'Select starting equipment', route: 'equipment' },
];

export type CharacterBuilderLayoutProps = {
  class: React.ReactNode;
  abilityScores: React.ReactNode;
  feats: React.ReactNode;
  equipment: React.ReactNode;
};

export const Layout = (
  props: PropsWithChildren<CharacterBuilderLayoutProps>
) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const activeRoute = useMemo(
    () => steps[activeStep].route as keyof CharacterBuilderLayoutProps,
    [activeStep]
  );

  return (
    <CharacterCreationContextProvider
      steps={steps}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
    >
      <Box sx={{ mb: 2 }}> 
        <CharacterCreationStepper steps={steps} />
      </Box>
      {props[activeRoute]}
      {props.children}
    </CharacterCreationContextProvider>
  );
};
