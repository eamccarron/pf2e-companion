import { useEffect, useMemo, useReducer, useState } from 'react';

import type { Dispatch } from 'react';
import type { AbilityScore, BoostContent } from './types';

import type {
  BoostSelection as BoostState,
  BoostAction,
} from './AbilityScoreSelectionContext';
import {
  Badge,
  Box,
  Checkbox,
  Fade,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface AttributeSelection {
  content: {
    boosts: BoostContent;
  };
}

export type BoostSelectionProps = {
  selection: AttributeSelection | null;
  boosts: BoostState;
  boostDispatch: Dispatch<BoostAction>;
  label: string;
};

type RestrictedBoostAction = {
  type: AbilityScore | 'initialize';
  target: number;
};

type RestrictedBoostReducer = (
  state: Array<AbilityScore | null>,
  action: RestrictedBoostAction
) => Array<AbilityScore | null>;

export const BoostSelection = ({
  selection,
  boosts,
  boostDispatch,
  label,
}: BoostSelectionProps) => {
  // const fixed = useMemo(() => selection?.content.boosts?.fixed, [selection]);
  // const free = useMemo(() => selection?.content.boosts?.free ?? 0, [selection]);
  // const restricted = useMemo(
  //   () => selection?.content.boosts?.restricted,
  //   [selection]
  // );

  const restrictedBoostReducer: RestrictedBoostReducer = (state, action) => {
    if (action.type === 'initialize') {
      return new Array(action.target).fill('');
    }

    if (state[action.target] !== null) {
      boostDispatch({
        type: 'REMOVE',
        target: state[action.target] as AbilityScore,
      });
    }

    boostDispatch({
      type: 'ADD',
      target: action.type as AbilityScore,
    });

    return state.map((value, index) =>
      index === action.target ? action.type : value
    );

    // return ['test'];
  };

  const [fixed, setFixed] = useState<Array<AbilityScore>>([]);
  const [restricted, setRestricted] = useState<Array<AbilityScore[]>>([]);

  const [freeBoostsAvailable, setFreeBoostsAvailable] = useState<number>(0);
  const [restrictedBoosts, restrictedBoostDispatch] =
    useReducer<RestrictedBoostReducer>(restrictedBoostReducer, [null, null]);

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

  useEffect(() => {
    console.log('Selection changed: ', selection);
    setFixed(selection?.content.boosts?.fixed ?? []);
    setRestricted(selection?.content.boosts?.restricted ?? []);
    setFreeBoostsAvailable(selection?.content.boosts?.free ?? 0);
    boostDispatch({ type: 'RESET', target: [] });
    restrictedBoostDispatch({
      type: 'initialize',
      target: selection?.content.boosts?.restricted?.length ?? 0,
    });
  }, [selection, boostDispatch, restrictedBoostDispatch]);

  useEffect(() => {
    console.log(restrictedBoosts);
  }, [restrictedBoosts]);

  useEffect(() => {
    console.log(fixed);
    boostDispatch({
      type: 'SET_FIXED',
      target: fixed as Array<AbilityScore>,
    });
  }, [fixed, boostDispatch]);

  // useEffect(() => {
  //   console.log('free:', free);
  //   setFreeBoostsAvailable(free);
  // }, [free, boostDispatch]);

  useEffect(() => {
    console.log('freeBoostsAvailable', freeBoostsAvailable);
  }, [freeBoostsAvailable]);

  // useEffect(() => {
  //   console.log('restricted:', restricted);
  //   setRestrictedBoostsAvailable(restricted?.length ?? 0);
  // }, [restricted, boostDispatch]);

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={{ md: 8 }}
      // spacing={{ sm: 8, lg: 10 }}
    >
      <Box
        ml={4}
        width="10%"
      >
        <Badge
          color="secondary"
          invisible={freeBoostsAvailable === 0}
          badgeContent={freeBoostsAvailable}
        >
          <Typography align="left">{label}</Typography>
        </Badge>

        {restricted.map((options, i) => (
          <Box key={options.reduce((acc, curr) => acc + curr, '')}>
            <Fade in={Boolean(restricted?.length)}>
              <ToggleButtonGroup
                value={restrictedBoosts[i]}
                onChange={(event, newSelection) => {
                  console.log(newSelection, i);
                  restrictedBoostDispatch({
                    type: newSelection,
                    target: i,
                  });
                }}
                size="small"
                exclusive
              >
                {options.map((ability) => (
                  <ToggleButton
                    key={ability}
                    value={ability}
                    disabled={boosts[ability]}
                    sx={{ pr: 2 }}
                  >
                    {ability}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Fade>
          </Box>
        ))}
      </Box>
      {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as Array<AbilityScore>).map(
        (ability) => (
          <Checkbox
            key={ability}
            checked={boosts[ability] ?? false}
            disabled={isBoostDisabled(ability)}
            // disabled={
            //   fixed?.includes(ability) ||
            //   (!freeBoostsAvailable && !restricted?.includes(ability)) ||
            //   (!freeBoostsAvailable && !boosts[ability])
            // }
            onChange={() => handleBoostSelection(ability)}
            icon={<AddCircleOutlineIcon />}
            checkedIcon={<AddCircleIcon />}
            sx={{ pr: 2 }}
          />
        )
      )}
    </Stack>
  );
};
