import React from 'react';
import { Typography, List, ListItem } from '@mui/material';
import CharacterCard from './CharacterCard';

import type { Character } from '@/types/Character';

export const revalidate = 3;

const getCharacters = async () => {
  const res = await fetch('http://localhost:3000/api/characters');
  return res.json();
}

export default async function Characters() {
  const characters: Array<Character> = await getCharacters();

  return (
    <>
      <Typography variant='h2'>Characters</Typography>
      <List>
        {characters.map((character) => (
          <ListItem key={character.name}>
            <CharacterCard {...character} />
          </ListItem>
        ))}
      </List>
    </>
  );
}