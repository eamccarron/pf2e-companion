'use client';
import { Badge, Box, Checkbox, Stack, Typography } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import type { Dispatch } from 'react';
import type { BoostSelection } from '@pf2-companion/types/character-builder';
import type { AbilityScore } from './types';

export type BoostOptionsProps = {
  label: string;
  boostsAvailable: number;
  boosts: BoostSelection;
  handleBoostSelection: Dispatch<AbilityScore>;
  isBoostDisabled: (ability: AbilityScore) => boolean;
};

export const FreeBoostSelection = ({
  label,
  boostsAvailable,
  boosts,
  handleBoostSelection,
  isBoostDisabled,
}: BoostOptionsProps) => (
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
