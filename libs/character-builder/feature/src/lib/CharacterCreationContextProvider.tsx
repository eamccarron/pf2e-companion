import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from '@remix-run/react';

import {
  ClassSelectionContextProvider,
  AncestrySelectionContextProvider,
  BackgroundSelectionContextProvider,
  FreeAbilityScoreSelectionContextProvider,
} from '@pf2-companion/character-builder/ui';

import { SelectionContextProvider } from '@pf2-companion/ui-selection';

export const steps = [
  { title: 'Select class', route: '/character-builder/class' },
  {
    title: 'Select ancestry and ability scores',
    route: '/character-builder/ability-scores',
  },
  { title: 'Select feats', route: '/character-builder/feats' },
  { title: 'Select starting equipment', route: '/character-builder/equipment' },
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

  const navigate = useNavigate();
  const location = useLocation();

  const totalSteps = steps.length - 1;

  const handleNext = () => {
    setActiveStep(activeStep === totalSteps ? totalSteps : activeStep + 1);
    console.log('next');
    navigate(steps[activeStep + 1].route);
  };

  const handleBack = () => {
    setActiveStep(activeStep === 0 ? 0 : activeStep - 1);
    console.log('back');
    navigate(steps[activeStep - 1].route);
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
      <ClassSelectionContextProvider>
        <BackgroundSelectionContextProvider>
          <AncestrySelectionContextProvider>
            <FreeAbilityScoreSelectionContextProvider>
              {children}
            </FreeAbilityScoreSelectionContextProvider>
          </AncestrySelectionContextProvider>
        </BackgroundSelectionContextProvider>
      </ClassSelectionContextProvider>
    </CharacterCreationContext.Provider>
  );
};
