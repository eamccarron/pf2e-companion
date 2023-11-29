import { useContext, useMemo } from 'react';

import { AncestryAbilityScoreSelectionContext } from '../ancestry/AncestrySelectionContext';
import { BackgroundAbilityScoreSelectionContext } from '../background/BackgroundSelectionContext';
import { ClassAbilityScoreSelectionContext } from '../character-class/ClassSelectionContext';
import { FreeAbilityScoreSelectionContext } from '../ability-scores/FreeAbilityScoreSelectionContext';

import type { AbilityIdentifier } from '@pf2-companion/types/compendium';

export const useAbilityScoreContext = () => {
  const { boostState: backgroundBoosts } = useContext(
    BackgroundAbilityScoreSelectionContext
  );

  const { boostState: ancestryBoosts } = useContext(
    AncestryAbilityScoreSelectionContext
  );

  const { boostState: classBoosts } = useContext(
    ClassAbilityScoreSelectionContext
  );

  const { boostState: freeBoosts } = useContext(
    FreeAbilityScoreSelectionContext
  );

  const abilityScores = useMemo(
    () =>
      (
        ['str', 'dex', 'con', 'int', 'wis', 'cha'] as Array<AbilityIdentifier>
      ).map((ability) => ({
        ability,
        abilityScore:
          10 +
          (ancestryBoosts[ability] ? 2 : 0) +
          (backgroundBoosts[ability] ? 2 : 0) +
          (classBoosts[ability] ? 2 : 0) +
          (freeBoosts[ability] ? 2 : 0),
      })),
    [ancestryBoosts, backgroundBoosts, classBoosts, freeBoosts]
  );

  return abilityScores;
};
