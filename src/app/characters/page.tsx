import React from 'react';
import { Stack, Box, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { ContentDetailPane } from '@/components/ContentDetailPane';
import ContentList from '@/components/ContentList';
import { CharacterSelectionContext } from '@/components/character/CharacterSelectionContext';
import { CharacterDetail } from '@/components/character/CharacterDetail';
import { FabLink } from '@/components/FabLink';

import type { Character } from '@/types/Character';

export const revalidate = 3;

const getCharacters = async () => {
  const res = await fetch('http://localhost:3000/api/characters');
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
        <ContentList
          content={listContent}
          selectionContext={CharacterSelectionContext}
        />
        <ContentDetailPane
          selectionContext={CharacterSelectionContext}
          slide
          slideDirection="left"
        >
          <CharacterDetail />
        </ContentDetailPane>
      </Stack>

      <FabLink
        icon={<AddIcon />}
        href="/characters/create"
      />
    </>
  );
}
