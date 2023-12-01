import { Box, IconButton, Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { type Dispatch, ReactNode } from 'react';

import { mapEnum } from '@pf2-companion/utils';
import { ProficiencyRank } from '@pf2-companion/types/character-builder';
import { SkillLabel, ProficiencyRankLabel } from '.';

import type { CharacterSkills } from '@pf2-companion/types/character-builder';
import type { SkillIdentifier } from '@pf2-companion/types/compendium';
import type { ValueOf } from '@pf2-companion/utils';

export const SkillSelection = ({
  skills,
  handleSkillDecrease,
  handleSkillIncrease,
  isSkillIncreaseAvailable,
  isSkillDecreaseAvailable,
}: {
  skills: CharacterSkills;
  handleSkillDecrease: Dispatch<string>;
  handleSkillIncrease: Dispatch<string>;
  isSkillIncreaseAvailable: (skillIdentifier: SkillIdentifier) => boolean;
  isSkillDecreaseAvailable: (skillIdentifier: SkillIdentifier) => boolean;
}) => (
  <Box>
    {Object.entries(skills).map(
      ([skillName, skill]: [string, ValueOf<CharacterSkills>]) => (
        <Stack
          key={skillName}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
        >
          <IconButton
            onClick={() => handleSkillDecrease(skillName)}
            disabled={!isSkillDecreaseAvailable(skillName)}
          >
            <RemoveCircleIcon />
          </IconButton>

          <IconButton
            onClick={() => handleSkillIncrease(skillName)}
            disabled={!isSkillIncreaseAvailable(skillName)}
          >
            <AddCircleIcon />
          </IconButton>

          <Stack direction="row">
            {mapEnum<typeof ProficiencyRank, ReactNode>(
              ProficiencyRank,
              (proficiencyRank: ProficiencyRank) => (
                <Box
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor:
                      skill?.proficiency === proficiencyRank
                        ? 'tertiaryContainer.main'
                        : 'surfaceVariant.main',
                    color:
                      skill?.proficiency === proficiencyRank
                        ? 'onTertiaryContainer.main'
                        : 'onSurface.main',
                    borderRadius: '12px',
                    p: 1,
                    display:
                      proficiencyRank === ProficiencyRank.UNTRAINED
                        ? 'none'
                        : 'flex',
                  }}
                >
                  <ProficiencyRankLabel proficiencyRank={proficiencyRank} />
                </Box>
              )
            )}
          </Stack>

          <SkillLabel skillIdentifier={skillName as SkillIdentifier} />
        </Stack>
      )
    )}
  </Box>
);
