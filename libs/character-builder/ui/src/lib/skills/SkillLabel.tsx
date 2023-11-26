import { Box, Typography } from '@mui/material';
import { skillLabels } from '.';

import type { SkillIdentifier } from '@pf2-companion/types/compendium';

export const SkillLabel = ({ skill }: { skill: keyof SkillIdentifier }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'surfaceVariant.main',
      color: 'onSurfaceVariant.main',
      borderRadius: '12px',
      p: 1,
    }}
  >
    <Typography variant="h6">
      {proficiencyRankLabels[value.proficiency]}
    </Typography>
  </Box>
);
