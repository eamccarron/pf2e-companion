import { Stack, Box, Typography, Checkbox } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const AbilityScoreSelection = ({
  abilityScores,
  hp,
}: {
  abilityScores: Array<{ abilityScore: number; ability: string }>;
  hp: number;
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent={'space-evenly'}
      alignContent={'center'}
    >
      <Stack
        direction="column"
        spacing={1}
        alignItems={'center'}
        // mb={2}
      >
        <Box
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
          <Typography variant="h4">{hp}</Typography>
          <Typography variant="subtitle1">Hitpoints (HP)</Typography>
        </Box>

        <Stack
          direction="column"
          spacing={3.5}
          alignItems={'flex-start'}
          justifyContent={'space-evenly'}
        >
          <Typography sx={{ mt: 2 }}>Class Boost</Typography>
          <Typography>Ancestry Boosts</Typography>
          <Typography>Background Boosts</Typography>
          <Typography>Free Boosts</Typography>
        </Stack>
      </Stack>
      {abilityScores.map(({ abilityScore, ability }) => (
        <Stack
          direction="column"
          spacing={1}
          alignItems={'center'}
          key={ability}
        >
          <Box
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

          <Checkbox
            icon={<AddCircleOutlineIcon />}
            checkedIcon={<AddCircleIcon />}
          />
          <Checkbox
            icon={<AddCircleOutlineIcon />}
            checkedIcon={<AddCircleIcon />}
          />
          <Checkbox
            icon={<AddCircleOutlineIcon />}
            checkedIcon={<AddCircleIcon />}
          />
          <Checkbox
            icon={<AddCircleOutlineIcon />}
            checkedIcon={<AddCircleIcon />}
          />
        </Stack>
      ))}
    </Stack>
  );
};
