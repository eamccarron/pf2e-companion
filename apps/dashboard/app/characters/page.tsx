import { generateCharacters } from './generateCharacter.server';

import { Stack, Typography } from '@mui/material';

import { CharacterDetailPane } from './CharacterDetailPane';
import { CharacterList } from './CharacterList';
import AddIcon from '@mui/icons-material/Add';

import { FabLink } from '@pf2-companion/ui-general';

export const loader = () => generateCharacters();

export default async function Characters() {
  const characters = await loader();

  const listContent = characters.map(
    ({ name: characterName, class: classType, level, ...content }, index) => ({
      primary: characterName ?? '',
      secondary: `${classType} \n ${level}`,
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
