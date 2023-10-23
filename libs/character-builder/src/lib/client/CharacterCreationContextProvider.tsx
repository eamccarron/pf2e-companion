'use client';

import { PropsWithChildren, createContext, useState } from 'react';

import { ClassSelectionContext } from './character-class/ClassSelectionContext';
import { AncestrySelectionContext } from './ancestry/AncestrySelectionContext';
import { SelectionContextProvider } from '@pf2-companion/ui-selection';

import { useRouter } from 'next/navigation';

export const steps = [
  { title: 'Select class', route: '/characters/create/class' },
  {
    title: 'Select ancestry and ability scores',
    route: '/characters/create/ancestry-ability-scores',
  },
  { title: 'Select feats', route: '/characters/create/feats' },
  { title: 'Select starting equipment', route: '/characters/create/equipment' },
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
    setCompleted: () => null,
    handleNext: () => null,
    handleBack: () => null,
  });

export const CharacterCreationContextProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completed, setCompleted] = useState(new Set<number>());

  const router = useRouter();

  const totalSteps = steps.length - 1;

  const handleNext = () => {
    setActiveStep(activeStep === totalSteps ? totalSteps : activeStep + 1);
    router.push(steps[activeStep + 1].route);
  };

  const handleBack = () => {
    setActiveStep(activeStep === 0 ? 0 : activeStep - 1);
    router.push(steps[activeStep - 1].route);
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
      <SelectionContextProvider Context={ClassSelectionContext}>
        <SelectionContextProvider Context={AncestrySelectionContext}>
          {children}
        </SelectionContextProvider>
      </SelectionContextProvider>
    </CharacterCreationContext.Provider>
  );
};
