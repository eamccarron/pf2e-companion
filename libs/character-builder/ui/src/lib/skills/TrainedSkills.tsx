import { Box, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { skillLabels } from '.';

import type { TrainedSkills as TrainedSkillsContent } from '@pf2-companion/types/character-builder';

// Displays a set of trained skills (for use in selections such as background)
export const TrainedSkills = ({
  trainedSkills,
}: {
  trainedSkills: TrainedSkillsContent;
}) => {
  const SkillBox = ({ children }: PropsWithChildren<unknown>) => (
    <Box
      alignItems="center"
      justifyContent="flex-start"
      p={1}
      bgcolor="surfaceContainerLow.main"
      color="onSurface.main"
      borderRadius="12px"
    >
      {children}
    </Box>
  );

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      flexWrap="wrap"
      mr={1}
      mb={1}
      spacing={1}
    >
      <Typography
        variant="h6"
        sx={{ mr: 1 }}
      >
        Trained Skills
      </Typography>
      {trainedSkills.skills?.map((skill) => (
        <SkillBox>
          <Typography variant="body1">{skillLabels[skill]}</Typography>
        </SkillBox>
      ))}
      {trainedSkills.additional > 0 && (
        <SkillBox>
          <Typography variant="body1">
            {`+ any ${trainedSkills.additional}`}
          </Typography>
        </SkillBox>
      )}
    </Stack>
  );
};
