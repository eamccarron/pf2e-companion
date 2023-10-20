import React from 'react';
import { Stack, Typography } from '@mui/material';

import { ListDetailPane } from '@/components/ListDetailPane';
import CardList from '@/components/CardList';
import type { Character } from '@/types/Character';

export const revalidate = 3;

const getCharacters = async () => {
  const res = await fetch('http://localhost:3000/api/characters');
  return res.json();
};

export default async function Characters() {
  const characters: Array<Character> = await getCharacters();

  const listContent = characters.map(
    ({ name: characterName, class: classType, level }, index) => ({
      primary: characterName ?? '',
      secondary: `${classType} ${level}`,
      id: index,
    })
  );

  return (
    <>
      <Typography variant="h2">Characters</Typography>
      <Stack
        direction="row"
        spacing={2}
      >
        <CardList content={listContent} />
        <ListDetailPane
          content={listContent}
          slide
          slideDirection="left"
        />
      </Stack>
    </>
  );
}
