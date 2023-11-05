import { useState } from 'react';
import { createSelectionContext } from '@pf2-companion/ui-selection';
import {
  AbilityScoreSelectionContextProvider,
  createAbilityScoreSelectionContext,
} from '../ability-scores/AbilityScoreSelectionContext';

import type { PropsWithChildren } from 'react';
import type { Selection } from '@pf2-companion/ui-selection';
import type { ClassContent } from '@pf2-companion/types/character-builder';

export const ClassSelectionContext = createSelectionContext<ClassContent>();

export const ClassAbilityScoreSelectionContext =
  createAbilityScoreSelectionContext();

export const ClassSelectionContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [selection, setSelection] = useState<Selection<ClassContent> | null>(
    null
  );

  return (
    <ClassSelectionContext.Provider
      value={{ selection: selection, setSelection: setSelection }}
    >
      <AbilityScoreSelectionContextProvider
        AbilityScoreContext={ClassAbilityScoreSelectionContext}
        selection={selection}
      >
        {children}
      </AbilityScoreSelectionContextProvider>
    </ClassSelectionContext.Provider>
  );
};
