import { useEffect, useMemo, useReducer, useState } from 'react';

import type { Dispatch } from 'react';
import type { AbilityScore, BoostContent } from './types';

import type {
  BoostSelection as BoostState,
  BoostAction,
} from './AbilityScoreSelectionContext';
import { Badge, Box, Checkbox, Stack, Typography } from '@mui/material';

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

export const BoostSelection = ({
  selection,
  boosts,
  boostDispatch,
  label,
}: BoostSelectionProps) => {
  const fixed = useMemo(() => selection?.content.boosts?.fixed, [selection]);

  const free = useMemo(() => selection?.content.boosts?.free ?? 0, [selection]);

  const [freeBoostsAvailable, setFreeBoostsAvailable] = useState<number>(0);

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

  useEffect(() => {
    console.log(fixed);
    boostDispatch({
      type: 'SET_FIXED',
      target: fixed as Array<AbilityScore>,
    });
  }, [fixed]);

  useEffect(() => {
    console.log('free:', free);
    setFreeBoostsAvailable(free);
  }, [free]);

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={{ md: 8 }}
      // spacing={{ sm: 8, lg: 10 }}
    >
      <Box ml={4} width="10%">
        <Badge
          color="secondary"
          invisible={freeBoostsAvailable === 0}
          badgeContent={freeBoostsAvailable}
        >
          <Typography align="left">{label}</Typography>
        </Badge>
      </Box>
      {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as Array<AbilityScore>).map(
        (ability) => (
          <Checkbox
            key={ability}
            checked={boosts[ability] ?? false}
            disabled={
              fixed?.includes(ability) ||
              (!freeBoostsAvailable && !boosts[ability])
            }
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
