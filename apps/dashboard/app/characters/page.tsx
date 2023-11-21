import { generateCharacters } from './generateCharacter.server';

import { Stack, Typography } from '@mui/material';

import { CharacterDetailPane } from './CharacterDetailPane';
import { CharacterList } from './CharacterList';

export default async function Characters() {
  const characters = generateCharacters();

  const listContent = characters.map(
    ({ name: characterName, class: classType, level, ...content }, index) => ({
      primary: characterName ?? '',
      secondary: `${classType} ${level}`,
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

      {/* <FabLink
        icon={<AddIcon />}
        href="/character-builder/class"
      /> */}
    </>
  );
}
