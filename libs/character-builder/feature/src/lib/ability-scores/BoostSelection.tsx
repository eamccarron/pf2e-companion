'use client';
import { useMemo, useEffect } from 'react';

import {
  FreeBoostSelection,
  RestrictedBoostSelection,
} from '@pf2-companion/character-builder/ui';

import type { SetStateAction, Dispatch } from 'react';
import type {
  BoostAction,
  RestrictedBoostAction,
} from './AbilityScoreSelectionContext';

import type {
  AbilityScore,
  BoostSelection as BoostState,
} from '@pf2-companion/types/character-builder';
import { Box } from '@mui/material';

export type BoostSelectionProps = {
  boostDispatch: Dispatch<BoostAction>;
  boosts: BoostState;
  fixedBoosts: Array<AbilityScore>;
  restrictedBoosts: Array<AbilityScore | ''>;
  restrictedOptions: Array<AbilityScore[]>;
  freeBoostsAvailable: number;
  setFreeBoostsAvailable: Dispatch<SetStateAction<number>>;
  restrictedBoostDispatch: Dispatch<RestrictedBoostAction>;
  label: string;
};

export const BoostSelection = ({
  boosts,
  fixedBoosts: fixed,
  restrictedBoosts,
  restrictedOptions: restricted,
  freeBoostsAvailable,
  restrictedBoostDispatch,
  boostDispatch,
  setFreeBoostsAvailable,
  label,
}: BoostSelectionProps) => {
  const handleBoostSelection = (ability: AbilityScore) => {
    if (fixed?.includes(ability)) {
      return;
    } else {
      boostDispatch({
        type: boosts[ability] ? 'REMOVE' : 'ADD',
        target: ability,
      });
    }

    if (boosts[ability]) {
      setFreeBoostsAvailable(freeBoostsAvailable + 1);
    } else {
      setFreeBoostsAvailable(freeBoostsAvailable - 1);
    }
  };

  const isBoostDisabled = (ability: AbilityScore) => {
    if (fixed?.includes(ability)) return true;

    if (restrictedBoosts.includes(ability)) return true;

    if (freeBoostsAvailable > 0) {
      return false;
    }

    if (freeBoostsAvailable === 0 && !boosts[ability]) return true;

    return false;
  };

  const boostsAvailable = useMemo(
    () =>
      freeBoostsAvailable +
      restrictedBoosts.filter((boost) => boost === '').length,
    [freeBoostsAvailable, restrictedBoosts]
  );

  const handleRestrictedBoostSelection = (
    selection: AbilityScore,
    target: number
  ) => {
    restrictedBoostDispatch({
      type: selection,
      target,
    });
  };

  return (
    <Box>
      <FreeBoostSelection
        {...{
          label,
          boostsAvailable,
          boosts,
          handleBoostSelection,
          isBoostDisabled,
        }}
      />

      <RestrictedBoostSelection
        {...{
          boostSelection: boosts,
          handleRestrictedBoostSelection,
          restrictedBoostOptions: restricted,
          restrictedBoostsSelected: restrictedBoosts,
        }}
      />
    </Box>
  );
};
