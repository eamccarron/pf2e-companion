import React from 'react';
import { Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { CharacterDetailPane } from './CharacterDetailPane';
import { CharacterList } from './CharacterList';
import { FabLink } from '../../components/FabLink';

import type { Character } from '@pf2-companion/data-access-characters/types';

export const revalidate = 3;

const getCharacters = async () => {
  const res = await fetch('http://localhost:4200/api/characters');
  return res.json();
};

export default async function Characters() {
  const characters: Array<Character> = await getCharacters();

  const listContent = characters.map(
    ({ name: characterName, class: classType, level, ...content }, index) => ({
      primary: characterName ?? '',
      secondary: [`${classType} ${level}`],
      id: index,
      content,
    })
  );

  return (
    <>
      <Typography variant="h2">Characters</Typography>
      <Stack
        direction="row"
        spacing={2}
      >
        <CharacterList content={listContent} />
        <CharacterDetailPane />
      </Stack>

      <FabLink
        icon={<AddIcon />}
        href="/characters/create/character-class"
      />
    </>
  );
}
