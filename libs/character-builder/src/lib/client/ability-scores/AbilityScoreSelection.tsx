import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Stack, Box, Typography, Checkbox } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { AncestrySelectionContext } from '../ancestry/AncestrySelectionContext';
import { BackgroundSelectionContext } from '../background/BackgroundSelectionContext';
import { ClassSelectionContext } from '../character-class/ClassSelectionContext';

type AbilityScore = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

type AncestryBoostAction =
  | {
      type: 'ADD' | 'REMOVE';
      target: AbilityScore;
    }
  | {
      type: 'SET_FIXED';
      target: Array<AbilityScore>;
    };

type AncestryBoostState = Partial<{
  str: boolean;
  dex: boolean;
  con: boolean;
  int: boolean;
  wis: boolean;
  cha: boolean;
}>;

const ancestryBoostReducer = (
  state: AncestryBoostState,
  action: AncestryBoostAction
) => {
  if (action.type === 'SET_FIXED') {
    const fixedBoosts = Object.fromEntries(
      action.target?.map((boost) => [boost, true]) ?? []
    );
    return fixedBoosts;
  }

  switch (action.type) {
    case 'ADD':
      return { ...state, [action.target]: true };
    case 'REMOVE':
      return { ...state, [action.target]: false };
    default:
      return state;
  }
};

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

  const [freeAncestryBoostAvailable, setFreeAncestryBoostAvailable] =
    useState<boolean>(true);

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

  const abilityScores = useMemo(() => 
    (['str', 'dex', 'con', 'int', 'wis', 'cha'] as Array<AbilityScore>).map(
      (ability) => ({
         ability,
         abilityScore: 10 + (ancestryBoosts[ability] ? 2 : 0),
      }),
    )
  , [ancestryBoosts]);

  useEffect(() => {
    console.log(fixedAncestryBoosts);
    ancestryBoostDispatch({
      type: 'SET_FIXED',
      target: fixedAncestryBoosts as Array<AbilityScore>,
    });
  }, [fixedAncestryBoosts]);

  useEffect(() => {
    console.log(freeAncestryBoostOptions);
    if (freeAncestryBoostOptions.length === 0) {
      setFreeAncestryBoostAvailable(false);
    } else {
      setFreeAncestryBoostAvailable(true);
    }
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
          <Typography>Ancestry Boosts</Typography>
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
              (!freeAncestryBoostAvailable &&
                !ancestryBoosts[ability as AbilityScore])
            }
            onChange={() => {
              if (fixedAncestryBoosts?.includes(ability as AbilityScore)) {
                return;
              } else {
                ancestryBoostDispatch({
                  type: ancestryBoosts[ability as AbilityScore]
                    ? 'REMOVE'
                    : 'ADD',
                  target: ability as AbilityScore,
                });
              }

              if (ancestryBoosts[ability as AbilityScore]) {
                setFreeAncestryBoostAvailable(true);
              } else {
                setFreeAncestryBoostAvailable(false);
              }
            }}
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
