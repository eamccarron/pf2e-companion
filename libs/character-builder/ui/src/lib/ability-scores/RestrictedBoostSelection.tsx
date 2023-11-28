import { Box, Fade, ToggleButton, ToggleButtonGroup } from '@mui/material';

import type {
  AbilityScore,
  BoostSelection,
} from '@pf2-companion/types/character-builder';

type RestrictedBoostProps = {
  boostSelection: BoostSelection;
  restrictedBoostsSelected: Array<AbilityScore | ''>;
  restrictedBoostOptions: Array<AbilityScore[]>;
  handleRestrictedBoostSelection: (
    selection: AbilityScore,
    target: number
  ) => void;
};

export const RestrictedBoostSelection = ({
  boostSelection,
  handleRestrictedBoostSelection,
  restrictedBoostOptions,
  restrictedBoostsSelected,
}: RestrictedBoostProps) =>
  restrictedBoostOptions.map((options, i) => (
    <Box
      key={options.reduce((acc, curr) => acc + curr, '')}
      mt={1}
      mb={1}
    >
      <Fade in={Boolean(restrictedBoostOptions?.length)}>
        <ToggleButtonGroup
          data-cy="restricted-boosts"
          value={restrictedBoostsSelected[i]}
          onChange={(event, newSelection) =>
            handleRestrictedBoostSelection(newSelection, i)
          }
          size="small"
          exclusive
        >
          {options.map((ability) => (
            <ToggleButton
              data-cy={`restricted-boost-${ability}`}
              key={ability}
              value={ability}
              disabled={boostSelection[ability]}
              sx={{ pr: 2 }}
            >
              {ability}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Fade>
    </Box>
  ));
