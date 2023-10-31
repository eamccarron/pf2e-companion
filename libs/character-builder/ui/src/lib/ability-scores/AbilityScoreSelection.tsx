import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Stack, Box, Typography, Checkbox, Badge } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { AncestrySelectionContext } from '../ancestry/AncestrySelectionContext';
import { BackgroundSelectionContext } from '../background/BackgroundSelectionContext';
import { ClassSelectionContext } from '../character-class/ClassSelectionContext';

import type { AbilityScore } from './types';
import { ancestryBoostReducer } from './ancestryBoost';

export const AbilityScoreSelection = () => {
  const { selection: ancestrySelection } = useContext(AncestrySelectionContext);
  const { selection: classSelection } = useContext(ClassSelectionContext);

  const fixedAncestryBoosts = useMemo(
    () => ancestrySelection?.content.boosts?.fixed,
    [ancestrySelection]
  );

  const freeAncestryBoostOptions = useMemo(
    () => ancestrySelection?.content.boosts?.free ?? [],
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
    setFreeAncestryBoostsAvailable(freeAncestryBoostOptions.length);
  }, [freeAncestryBoostOptions]);

  useEffect(() => {
    console.log(hp);
  }, [hp]);

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent={'space-evenly'}
      alignContent={'center'}
    >
      <Stack
        direction="column"
        spacing={1}
        alignItems={'center'}
        // mb={2}
      >
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
          <Typography variant="h4">{hp}</Typography>
          <Typography variant="subtitle1">HP</Typography>
        </Box>

        <Stack
          direction="column"
          spacing={3.5}
          alignItems={'flex-start'}
          justifyContent={'space-evenly'}
        >
          <Typography sx={{ mt: 2 }}>Class Boost</Typography>

          <Badge
            color="secondary"
            invisible={freeAncestryBoostsAvailable === 0}
            badgeContent={freeAncestryBoostsAvailable}
          >
            <Typography sx={{ pr: 1 }}>Ancestry Boosts</Typography>
          </Badge>

          <Typography>Background Boosts</Typography>
          <Typography>Free Boosts</Typography>
        </Stack>
      </Stack>
      {abilityScores.map(({ abilityScore, ability }) => (
        <Stack
          direction="column"
          spacing={1}
          alignItems={'center'}
          key={ability}
        >
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

          {/* Class Boost */}
          <Checkbox
            icon={<AddCircleOutlineIcon />}
            checkedIcon={<AddCircleIcon />}
          />

          {/* Ancestry Boost */}
          <Checkbox
            checked={ancestryBoosts[ability as AbilityScore] ?? false}
            disabled={
              fixedAncestryBoosts?.includes(ability as AbilityScore) ||
              (!freeAncestryBoostsAvailable &&
                !ancestryBoosts[ability as AbilityScore])
            }
            onChange={() => handleAncestryBoostSelection(ability as AbilityScore)}
            icon={<AddCircleOutlineIcon />}
            checkedIcon={<AddCircleIcon />}
          />

          {/* Background Boost */}
          <Checkbox
            icon={<AddCircleOutlineIcon />}
            checkedIcon={<AddCircleIcon />}
          />

          {/* Free Boost */}
          <Checkbox
            icon={<AddCircleOutlineIcon />}
            checkedIcon={<AddCircleIcon />}
          />
        </Stack>
      ))}
    </Stack>
  );
};
