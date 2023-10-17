'use client'

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CharacterCard({ name, level, class: classType }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {classType}
        </Typography>
        <Typography color="textSecondary">
          Level {level}
        </Typography>
      </CardContent>
    </Card>
  );
}
