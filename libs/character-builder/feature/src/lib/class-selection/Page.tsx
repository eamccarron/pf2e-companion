import { Stack } from '@mui/material';
import { useLoaderData } from '@remix-run/react';

import {
  ClassList,
  ClassDetailPane,
} from '@pf2-companion/character-builder/ui';

import type { Selection } from '@pf2-companion/ui-selection/types';
import type { ClassDescription } from '@pf2-companion/types/character-builder';

export const Page = () => {
  const classDescriptions: Array<ClassDescription> =
    useLoaderData<Array<ClassDescription>>();

  const listContent = classDescriptions.map(
    ({ className, description, keyAbility, startingHP }, index) => ({
      primary: className,
      secondary: [`Key ability: ${keyAbility}`, `Starting HP: ${startingHP}`],
      description,
      id: index,
      content: { hp: startingHP },
    })
  ) as Selection<{ hp: number }>[];

  return (
    <Stack
      direction="row"
      spacing={2}
    >
      <ClassList content={listContent} />
      <ClassDetailPane />
    </Stack>
  );
};
