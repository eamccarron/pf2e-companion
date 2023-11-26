'use client';
import { useMemo, useEffect } from 'react';
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

import type { SetStateAction, Dispatch } from 'react';
import type { AbilityScore } from './types';

import type {
  BoostSelection as BoostState,
  RestrictedBoostAction,
  BoostAction,
} from './AbilityScoreSelectionContext';

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
  setFreeBoostsAvailable,
  boostDispatch,
  restrictedBoostDispatch,
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

  useEffect(() => {}, [freeBoostsAvailable]);

  const RestrictedBoosts = useMemo(() => {
    if (restricted?.length !== 0) {
      return () =>
        restricted.map((options, i) => (
          <Box
            key={options.reduce((acc, curr) => acc + curr, '')}
            mt={1}
            mb={1}
          >
            <Fade in={Boolean(restricted?.length)}>
              <ToggleButtonGroup
                data-cy="restricted-boosts"
                value={restrictedBoosts[i]}
                onChange={(event, newSelection) => {
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
                    data-cy={`restricted-boost-${ability}`}
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
        ));
    } else return () => <></>;
  }, [boosts, restricted, restrictedBoostDispatch, restrictedBoosts]);

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={{ md: 8 }}
    >
      <Box
        ml={4}
        width="10%"
        mt={1}
      >
        <Badge
          color="secondary"
          invisible={boostsAvailable === 0}
          badgeContent={boostsAvailable}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Typography
            align="left"
            sx={{ pl: 1.5 }}
          >
            {label}
          </Typography>
        </Badge>
        <RestrictedBoosts />
      </Box>

      {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as Array<AbilityScore>).map(
        (ability) => (
          <Checkbox
            data-cy={`ability-boost-${ability}`}
            key={ability}
            checked={boosts[ability] ?? false}
            disabled={isBoostDisabled(ability)}
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
