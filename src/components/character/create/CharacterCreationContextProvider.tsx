'use client';

import { PropsWithChildren, createContext, useState } from 'react';

export const steps = [
  'Select Class',
  'Select Ancestry and Ability Scores',
  'Select Feats',
  'Select Starting Equipment',
];

export type CharacterCreationContextProps = {
  activeStep: number;
  completed: Set<number>;
  setCompleted: React.Dispatch<React.SetStateAction<Set<number>>>;
  handleNext: () => void;
  handleBack: () => void;
};

export const CharacterCreationContext =
  createContext<CharacterCreationContextProps>({
    activeStep: 0,
    completed: new Set<number>(),
    setCompleted: () => {},
    handleNext: () => {},
    handleBack: () => {},
  });

export const CharacterCreationContextProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completed, setCompleted] = useState(new Set<number>());

  const totalSteps = steps.length - 1;

  const handleNext = () => {
    setActiveStep(activeStep === totalSteps ? totalSteps : activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep === 0 ? 0 : activeStep - 1);
  };

  return (
    <CharacterCreationContext.Provider
      value={{
        activeStep,
        handleNext,
        handleBack,
        setCompleted,
        completed,
      }}
    >
      {children}
    </CharacterCreationContext.Provider>
  );
};
