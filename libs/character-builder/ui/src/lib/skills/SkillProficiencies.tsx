import { SkillLabel } from '.';

import { Box, Stack, Typography } from '@mui/material';

import type { CharacterSkills } from '@pf2-companion/types/character-builder';
import type { SkillIdentifier } from '@pf2-companion/types/compendium';

import { proficiencyRankLabels, skillLabels } from '.';

// Displays the character's skills, their proficiency rank, and their modifier
export const Skills = ({
  characterSkills,
}: {
  characterSkills: CharacterSkills;
}) => {
  return (
    <Box>
      {Object.entries(characterSkills).map(([key, value]) => (
        <Stack
          key={key}
          direction="row-reverse"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
        >
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
            <Typography variant="h6">+{value.modifier}</Typography>
          </Box>
          <SkillLabel skillIdentifier={key as SkillIdentifier} />
        </Stack>
      ))}
    </Box>
  );
};
