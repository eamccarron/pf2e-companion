import { createSelectionContext } from '@pf2-companion/ui-selection';
import {
  createAbilityScoreSelectionContext,
  AbilityScoreSelectionContextProvider,
} from '../ability-scores/AbilityScoreSelectionContext';

import type { BackgroundContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection';
import { useState } from 'react';

export const BackgroundSelectionContext =
  createSelectionContext<BackgroundContent>();

export const BackgroundAbilityScoreSelectionContext =
  createAbilityScoreSelectionContext();

export const BackgroundSelectionContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [selection, setSelection] =
    useState<Selection<BackgroundContent> | null>(null);

  return (
    <BackgroundSelectionContext.Provider value={{ selection, setSelection }}>
      <AbilityScoreSelectionContextProvider
        AbilityScoreContext={BackgroundAbilityScoreSelectionContext}
        selection={selection}
      >
        {children}
      </AbilityScoreSelectionContextProvider>
    </BackgroundSelectionContext.Provider>
  );
};
