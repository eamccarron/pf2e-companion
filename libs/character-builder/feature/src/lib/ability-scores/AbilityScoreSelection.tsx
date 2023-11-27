'use client';
import { useContext } from 'react';
import { Stack, Box } from '@mui/material';

import {
  AncestrySelectionContext,
  AncestryAbilityScoreSelectionContext,
} from '../ancestry/AncestrySelectionContext';

import {
  BackgroundSelectionContext,
  BackgroundAbilityScoreSelectionContext,
} from '../background/BackgroundSelectionContext';

import {
  ClassSelectionContext,
  ClassAbilityScoreSelectionContext,
} from '../class-selection/ClassSelectionContext';

import { FreeAbilityScoreSelectionContext } from './FreeAbilityScoreSelectionContext';

import {
  BoostSelection,
  AbilityScores,
  HPBox,
} from '@pf2-companion/character-builder/ui';

import { useAbilityScoreContext, useHPContext } from '../hooks';

export const AbilityScoreSelection = () => {
  const hp = useHPContext();
  const abilityScores = useAbilityScoreContext();

  const { selection: ancestrySelection } = useContext(AncestrySelectionContext);
  const { selection: classSelection } = useContext(ClassSelectionContext);
  const { selection: backgroundSelection } = useContext(
    BackgroundSelectionContext
  );

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

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={{ md: 5 }}
        mb={1}
      >
        <HPBox hp={hp} />
        <AbilityScores abilityScores={abilityScores} />
      </Stack>

      <BoostSelection
        {...{
          selection: ancestrySelection,
          boosts: ancestryBoosts,
          ...ancestryAbilitySelection,
          label: 'Ancestry boosts',
        }}
      />

      <BoostSelection
        {...{
          selection: backgroundSelection,
          boosts: backgroundBoosts,
          ...backgroundAbilitySelection,
          label: 'Background boosts',
        }}
      />

      <BoostSelection
        {...{
          selection: classSelection,
          boosts: classBoosts,
          ...classAbilitySelection,
          label: 'Class boosts',
        }}
      />

      <BoostSelection
        {...{
          selection: { content: { boosts: { free: 4 } } },
          boosts: freeBoosts,
          ...freeAbilitySelection,
          label: 'Free ability boosts',
        }}
      />
    </Box>
  );
};
