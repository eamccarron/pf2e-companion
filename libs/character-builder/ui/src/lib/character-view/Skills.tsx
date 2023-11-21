import { Box, Stack, Typography } from '@mui/material';
import { ProficiencyRank } from '@pf2-companion/types/character-builder';

import type { CharacterSkills } from './types/CharacterSkills';
import type { SkillIdentifier } from '@pf2-companion/types/compendium';

const skillLabels = {
  acr: 'Acrobatics',
  arc: 'Arcana',
  ath: 'Athletics',
  cra: 'Crafting',
  dec: 'Deception',
  dip: 'Diplomacy',
  itm: 'Intimidation',
  lor: 'Lore',
  med: 'Medicine',
  nat: 'Nature',
  occ: 'Occultism',
  prf: 'Performance',
  rel: 'Religion',
  soc: 'Society',
  ste: 'Stealth',
  sur: 'Survival',
  thi: 'Thievery',
};

const proficiencyRankLabels = {
  [ProficiencyRank.Untrained]: 'U',
  [ProficiencyRank.Trained]: 'T',
  [ProficiencyRank.Expert]: 'E',
  [ProficiencyRank.Master]: 'M',
  [ProficiencyRank.Legendary]: 'L',
};

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

          <Typography>{skillLabels[key as SkillIdentifier]}</Typography>
        </Stack>
      ))}
    </Box>
  );
};
