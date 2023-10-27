// Server
import { json } from '@remix-run/node';
import { classDescriptions } from '@pf2-companion/character-builder/server';

// Client
import { Stack } from '@mui/material';
import { useLoaderData } from '@remix-run/react';

import type { Selection } from '@pf2-companion/ui-selection';
import { ClassList, ClassDetailPane } from '@pf2-companion/character-builder';

import type { ClassDescription } from '@pf2-companion/character-builder/types';

export const revalidate = 3;

export const loader = () => classDescriptions;

export default function CreateCharacter() {
  const classDescriptions: Array<ClassDescription> = useLoaderData<Array<ClassDescription>>();

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