'use client';

import { useContext } from 'react';
import { CharacterSelectionContext } from './CharacterSelectionContext';
import { Box, Typography, Grid } from '@mui/material';

type AbilityScoreBoxProps = {
  abilityScore: number;
  ability: string;
};

const AbilityScoreBox = ({ abilityScore, ability }: AbilityScoreBoxProps) => {
  return (
    <Grid
      item
      xs={4}
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
    </Grid>
  );
};

export const CharacterDetail = () => {
  const { selection } = useContext(CharacterSelectionContext);
  const character = selection?.content;

  const abilityScores = Object.entries(character?.abilityScores ?? {}).map(
    ([ability, abilityScore]) => ({
      ability,
      abilityScore,
    })
  );

  return (
    <Grid
      container
      spacing={2}
    >
      {abilityScores.map(({ ability, abilityScore }) => (
        <AbilityScoreBox
          ability={ability}
          abilityScore={abilityScore}
          key={ability}
        />
      ))}
    </Grid>
  );
};
