import { useContext, useMemo } from 'react';

import { AncestryAbilityScoreSelectionContext } from '../ancestry/AncestrySelectionContext';
import { BackgroundAbilityScoreSelectionContext } from '../background/BackgroundSelectionContext';
import { ClassAbilityScoreSelectionContext } from '../character-class/ClassSelectionContext';
import { FreeAbilityScoreSelectionContext } from '../ability-scores/FreeAbilityScoreSelectionContext';

import type { AbilityIdentifier } from '@pf2-companion/types/compendium';

export const useAbilityScoreContext = () => {
  const { boostState: backgroundBoosts, ...backgroundAbilitySelection } =
    useContext(BackgroundAbilityScoreSelectionContext);

  const { boostState: ancestryBoosts, ...ancestryAbilitySelection } =
    useContext(AncestryAbilityScoreSelectionContext);

  const { boostState: classBoosts, ...classAbilitySelection } = useContext(
    ClassAbilityScoreSelectionContext
  );

  const { boostState: freeBoosts, ...freeAbilitySelection } = useContext(
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
