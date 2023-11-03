import { createSelectionContext } from '@pf2-companion/ui-selection';
import {
  createAbilityScoreSelectionContext,
  AbilityScoreSelectionContextProvider,
} from '../ability-scores/AbilityScoreSelectionContext';

import type { AncestryContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection';
import { useState } from 'react';

export const AncestrySelectionContext =
  createSelectionContext<AncestryContent>();

export const AncestryAbilityScoreSelectionContext =
  createAbilityScoreSelectionContext();

export const AncestrySelectionContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [selection, setSelection] =
    useState<Selection<AncestryContent> | null>(null);

  return (
    <AncestrySelectionContext.Provider value={{ selection, setSelection }}>
      <AbilityScoreSelectionContextProvider
        AbilityScoreContext={AncestryAbilityScoreSelectionContext}
        selection={selection}
      >
        {children}
      </AbilityScoreSelectionContextProvider>
    </AncestrySelectionContext.Provider>
  );
};