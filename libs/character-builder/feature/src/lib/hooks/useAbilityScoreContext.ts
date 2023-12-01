import { useContext, useMemo } from 'react';

import { AncestryAbilityScoreSelectionContext } from '../ancestry/AncestrySelectionContext';
import { BackgroundAbilityScoreSelectionContext } from '../background/BackgroundSelectionContext';
import { ClassAbilityScoreSelectionContext } from '../character-class/ClassSelectionContext';
import { FreeAbilityScoreSelectionContext } from '../ability-scores/FreeAbilityScoreSelectionContext';

import type { AbilityIdentifier } from '@pf2-companion/types/compendium';
import type { AbilityScores } from '@pf2-companion/types/character-builder';

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

  const abilityScores: AbilityScores = useMemo(
    () =>
      Object.fromEntries(
        (
          ['str', 'dex', 'con', 'int', 'wis', 'cha'] as Array<AbilityIdentifier>
        ).map((ability) => [
          ability,
          10 +
            (ancestryBoosts[ability] ? 2 : 0) +
            (backgroundBoosts[ability] ? 2 : 0) +
            (classBoosts[ability] ? 2 : 0) +
            (freeBoosts[ability] ? 2 : 0),
        ])
      ) as AbilityScores,
    [ancestryBoosts, backgroundBoosts, classBoosts, freeBoosts]
  );

  return abilityScores;
};
