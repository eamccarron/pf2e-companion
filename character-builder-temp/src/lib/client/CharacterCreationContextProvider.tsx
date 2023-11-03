import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useNavigate } from '@remix-run/react';

import { ClassSelectionContext } from './character-class/ClassSelectionContext';
import { AncestrySelectionContext } from './ancestry/AncestrySelectionContext';
import { BackgroundSelectionContext } from './background';
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

  const totalSteps = steps.length - 1;

  useEffect(() => {
    navigate(steps[activeStep].route);
  }, [activeStep, navigate]);

  const handleNext = () => {
    setActiveStep(activeStep === totalSteps ? totalSteps : activeStep + 1);
    // navigate(steps[activeStep + 1].route);
  };

  const handleBack = () => {
    setActiveStep(activeStep === 0 ? 0 : activeStep - 1);
    // navigate(steps[activeStep - 1].route);
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
          <SelectionContextProvider Context={BackgroundSelectionContext}>
            {children}
          </SelectionContextProvider>
        </SelectionContextProvider>
      </SelectionContextProvider>
    </CharacterCreationContext.Provider>
  );
};