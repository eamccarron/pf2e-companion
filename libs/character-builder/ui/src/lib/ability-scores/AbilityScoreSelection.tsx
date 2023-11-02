import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Stack, Box, Typography, Checkbox, Badge } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { AncestrySelectionContext } from '../ancestry/AncestrySelectionContext';
import { BackgroundSelectionContext } from '../background/BackgroundSelectionContext';
import {
  BackgroundAbilityScoreContext,
  AncestryAbilityScoreContext,
} from './AbilityScoreSelectionContext';
import { ClassSelectionContext } from '../character-class/ClassSelectionContext';
import { BoostSelection } from './BoostSelection';

import type { AbilityScore } from './types';
import { ancestryBoostReducer } from './ancestryBoost';

export const AbilityScoreSelection = () => {
  const { selection: ancestrySelection } = useContext(AncestrySelectionContext);
  const { selection: classSelection } = useContext(ClassSelectionContext);
  const { selection: backgroundSelection } = useContext(
    BackgroundSelectionContext
  );

  const {
    boostState: backgroundBoosts,
    boostDispatch: backgroundBoostDispatch,
  } = useContext(BackgroundAbilityScoreContext);

  const { boostState: ancestryBoosts, boostDispatch: ancestryBoostDispatch } =
    useContext(AncestryAbilityScoreContext);

  const hp = useMemo(
    () =>
      Number(classSelection?.content.hp ?? 0) +
      Number(ancestrySelection?.content.hp ?? 0),
    [classSelection, ancestrySelection]
  );

  const abilityScores = useMemo(
    () =>
      (['str', 'dex', 'con', 'int', 'wis', 'cha'] as Array<AbilityScore>).map(
        (ability) => ({
          ability,
          abilityScore:
            10 +
            (ancestryBoosts[ability] ? 2 : 0) +
            (backgroundBoosts[ability] ? 2 : 0),
        })
      ),
    [ancestryBoosts, backgroundBoosts]
  );

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={{ md: 5 }}
      >
        {/* HP */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'surfaceVariant.main',
            color: 'onSurfaceVariant.main',
            borderRadius: '8px',
            width: '10%',
            p: 4,
          }}
        >
          <Typography variant="h4">{hp}</Typography>
          <Typography variant="subtitle1">HP</Typography>
        </Box>

        {abilityScores.map(({ abilityScore, ability }) => (
          <Box key={ability}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'surfaceVariant.main',
                color: 'onSurfaceVariant.main',
                borderRadius: '8px',
                p: 2,
              }}
            >
              <Typography variant="h4">{abilityScore}</Typography>
              <Typography variant="subtitle1">{ability}</Typography>
            </Box>
          </Box>
        ))}
      </Stack>

      <BoostSelection
        selection={ancestrySelection}
        boosts={ancestryBoosts}
        boostDispatch={ancestryBoostDispatch}
        label="Ancestry boosts"
      />

      <BoostSelection
        selection={backgroundSelection}
        boosts={backgroundBoosts}
        boostDispatch={backgroundBoostDispatch}
        label="Background boosts"
      />

      {/* <BoostSelection
        selection={backgroundSelection}
        boosts={backgroundBoosts}
        boostDispatch={backgroundBoostDispatch}
        label="Class boosts"
      />

      <BoostSelection
        selection={backgroundSelection}
        boosts={backgroundBoosts}
        boostDispatch={backgroundBoostDispatch}
        label="Free boosts"
      /> */}
    </Box>
  );
};
