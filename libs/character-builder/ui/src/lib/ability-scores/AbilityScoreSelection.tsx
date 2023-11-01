import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Stack, Box, Typography, Checkbox, Badge } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { AncestrySelectionContext } from '../ancestry/AncestrySelectionContext';
import { BackgroundSelectionContext } from '../background/BackgroundSelectionContext';
import { BackgroundAbilityScoreContext } from './AbilityScoreSelectionContext';
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

  const fixedAncestryBoosts = useMemo(
    () => ancestrySelection?.content.boosts?.fixed,
    [ancestrySelection]
  );

  const freeAncestryBoostOptions = useMemo(
    () => ancestrySelection?.content.boosts?.free ?? 0,
    [ancestrySelection]
  );

  const [freeAncestryBoostsAvailable, setFreeAncestryBoostsAvailable] =
    useState<number>(0);

  const [ancestryBoosts, ancestryBoostDispatch] = useReducer(
    ancestryBoostReducer,
    {
      str: false,
      dex: false,
      con: false,
      int: false,
      wis: false,
      cha: false,
    }
  );

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
          abilityScore: 10 + (ancestryBoosts[ability] ? 2 : 0),
        })
      ),
    [ancestryBoosts]
  );

  const handleAncestryBoostSelection = (ability: AbilityScore) => {
    if (fixedAncestryBoosts?.includes(ability)) {
      return;
    } else {
      ancestryBoostDispatch({
        type: ancestryBoosts[ability] ? 'REMOVE' : 'ADD',
        target: ability,
      });
    }

    if (ancestryBoosts[ability]) {
      setFreeAncestryBoostsAvailable(freeAncestryBoostsAvailable + 1);
    } else {
      setFreeAncestryBoostsAvailable(freeAncestryBoostsAvailable - 1);
    }
  };

  useEffect(() => {
    console.log(fixedAncestryBoosts);
    ancestryBoostDispatch({
      type: 'SET_FIXED',
      target: fixedAncestryBoosts as Array<AbilityScore>,
    });
  }, [fixedAncestryBoosts]);

  useEffect(() => {
    console.log('free:', freeAncestryBoostOptions);
    setFreeAncestryBoostsAvailable(freeAncestryBoostOptions);
  }, [freeAncestryBoostOptions]);

  useEffect(() => {
    console.log(hp);
  }, [hp]);

  return (
    <Stack
      direction="column"
      spacing={1}
      alignItems={'stretch'}
      // mb={2}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
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

            {/* <Checkbox
              checked={ancestryBoosts[ability as AbilityScore] ?? false}
              disabled={
                fixedAncestryBoosts?.includes(ability as AbilityScore) ||
                (!freeAncestryBoostsAvailable &&
                  !ancestryBoosts[ability as AbilityScore])
              }
              onChange={() =>
                handleAncestryBoostSelection(ability as AbilityScore)
              }
              icon={<AddCircleOutlineIcon />}
              checkedIcon={<AddCircleIcon />}
            /> */}
          </Box>
        ))}
      </Stack>

      <BoostSelection
        selection={ancestrySelection}
        boosts={ancestryBoosts}
        boostDispatch={backgroundBoostDispatch}
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
    </Stack>
  );
};
