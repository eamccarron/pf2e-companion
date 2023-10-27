import { Stack } from '@mui/material';

import type { Selection } from '@pf2-companion/ui-selection';
import { ClassList, ClassDetailPane } from '@pf2-companion/character-builder';

import type { ClassDescription } from '@pf2-companion/character-builder/types';

export const revalidate = 3;

const getClassDescriptions = async () => {
  const res = await fetch('http://localhost:4200/api/class-descriptions');
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
      <ClassList content={listContent} />
      <ClassDetailPane />
    </Stack>
  );
}
