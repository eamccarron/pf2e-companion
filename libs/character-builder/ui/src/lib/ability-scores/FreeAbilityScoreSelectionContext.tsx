import type { PropsWithChildren } from 'react';
import {
  AbilityScoreSelectionContextProvider,
  createAbilityScoreSelectionContext,
} from './AbilityScoreSelectionContext';

export const FreeAbilityScoreSelectionContext =
  createAbilityScoreSelectionContext();

export const FreeAbilityScoreSelectionContextProvider = ({
  children,
}: PropsWithChildren) => (
  <AbilityScoreSelectionContextProvider
    AbilityScoreContext={FreeAbilityScoreSelectionContext}
    selection={{ content: { boosts: { free: 4, fixed: [] } } }}
  >
    {children}
  </AbilityScoreSelectionContextProvider>
);
