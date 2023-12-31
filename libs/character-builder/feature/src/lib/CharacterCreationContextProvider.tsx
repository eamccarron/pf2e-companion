import { PropsWithChildren, createContext } from 'react';

import { ClassSelectionContextProvider } from './character-class';
import { AncestrySelectionContextProvider } from './ancestry';
import { BackgroundSelectionContextProvider } from './background';
import { FreeAbilityScoreSelectionContextProvider } from './ability-scores';
import { HeritageSelectionContext } from './heritage';
import { FeatSelectionContextProvider } from './feats';

import { SelectionContextProvider } from '@pf2-companion/ui-selection';

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
  activeStep,
  setActiveStep,
  steps,
}: PropsWithChildren<{
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  steps: Array<{ title: string; route: string }>;
}>) => {
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
        setCompleted: () => null,
        completed: new Set<number>(),
      }}
    >
      <ClassSelectionContextProvider>
        <BackgroundSelectionContextProvider>
          <AncestrySelectionContextProvider>
            <SelectionContextProvider Context={HeritageSelectionContext}>
              <FreeAbilityScoreSelectionContextProvider>
                <FeatSelectionContextProvider>
                  {children}
                </FeatSelectionContextProvider>
              </FreeAbilityScoreSelectionContextProvider>
            </SelectionContextProvider>
          </AncestrySelectionContextProvider>
        </BackgroundSelectionContextProvider>
      </ClassSelectionContextProvider>
    </CharacterCreationContext.Provider>
  );
};
