import { Box, Typography } from '@mui/material';

import type { AbilityScores as CharacterAbilityScores } from '@pf2-companion/types/character-builder';

export const AbilityScores = ({
  abilityScores,
}: {
  abilityScores: CharacterAbilityScores;
}) => {
  return Object.entries(abilityScores).map(([ability, abilityScore]) => (
    <Box key={ability}>
      <Box
        data-cy={`ability-score-${ability}`}
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
  ));
};
