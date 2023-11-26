import { useState, type PropsWithChildren } from 'react';
import {
  AbilityScoreSelectionContextProvider,
  createAbilityScoreSelectionContext,
} from './AbilityScoreSelectionContext';

export const FreeAbilityScoreSelectionContext =
  createAbilityScoreSelectionContext();

export const FreeAbilityScoreSelectionContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [selection] = useState<{
    content: { boosts: { free: number; fixed: [] } };
  }>({
    content: { boosts: { free: 4, fixed: [] } },
  });

  return (
    <AbilityScoreSelectionContextProvider
      AbilityScoreContext={FreeAbilityScoreSelectionContext}
      selection={selection}
    >
      {children}
    </AbilityScoreSelectionContextProvider>
  );
};
