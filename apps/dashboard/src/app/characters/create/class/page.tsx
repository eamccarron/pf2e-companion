import { Stack } from '@mui/material';

import ContentList from '@/components/ContentList';
import { ContentDetailPane } from '@/components/ContentDetailPane';
import { CharacterSelectionContext } from '@/components/character/CharacterSelectionContext';

import type { Selection } from '@/components/providers/SelectionContextProvider';
import type { ClassDescription } from '@/types/ClassDescription';

export const revalidate = 3;

const getClassDescriptions = async () => {
  const res = await fetch('http://localhost:3000/api/class-descriptions');
  return res.json();
};

export default async function CreateCharacter() {
  const classDescriptions: Array<ClassDescription> =
    await getClassDescriptions();

  const listContent = classDescriptions.map(
    ({ className, description, keyAbility, startingHP }, index) => ({
      primary: className,
      secondary: [`Key ability: ${keyAbility}`, `Starting HP: ${startingHP}`],
      description,
      id: index,
    })
  ) as Selection<ClassDescription>[];

  return (
    <Stack
      direction="row"
      spacing={2}
    >
      <ContentList
        content={listContent}
        selectionContext={CharacterSelectionContext}
        secondaryContentLength={2}
      />
      <ContentDetailPane
        selectionContext={CharacterSelectionContext}
        slide
        slideDirection="left"
      />
    </Stack>
  );
}
