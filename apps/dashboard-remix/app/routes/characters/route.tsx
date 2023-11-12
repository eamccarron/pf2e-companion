// Server
import { generateCharacters } from './generateCharacter.server';

// Client
import { useLoaderData } from '@remix-run/react';
import { Stack, Typography } from '@mui/material';

import { CharacterDetailPane } from './CharacterDetailPane';
import { CharacterList } from './CharacterList';
import { Outlet } from '@remix-run/react';
import AddIcon from '@mui/icons-material/Add';

import { FabLink } from '../../src/FabLink';

import type { Character } from '@pf2-companion/data-access-characters/types';
import { SelectionContextProvider } from '@pf2-companion/ui-selection';
import { CharacterSelectionContext } from './CharacterSelectionContext';

export const loader = () => generateCharacters();

export default function Characters() {
  const characters: Array<Character> = useLoaderData<Array<Character>>();

  const listContent = characters.map(
    ({ name: characterName, class: classType, level, ...content }, index) => ({
      primary: characterName ?? '',
      secondary: [`${classType} ${level}`],
      id: index,
      content,
    })
  );

  return (
    <SelectionContextProvider Context={CharacterSelectionContext}>
      <Typography variant="h2">Characters</Typography>
      <Stack
        direction="row"
        spacing={2}
      >
        <CharacterList content={listContent} />
        <CharacterDetailPane />
      </Stack>
      <Outlet />

      <FabLink
        icon={<AddIcon />}
        href="/character-builder/class"
      />
    </SelectionContextProvider>
  );
}
