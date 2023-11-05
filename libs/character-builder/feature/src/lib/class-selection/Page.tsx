import { Stack } from '@mui/material';
import { useLoaderData } from '@remix-run/react';

import {
  ClassList,
  ClassDetailPane,
} from '@pf2-companion/character-builder/ui';

import type { Selection } from '@pf2-companion/ui-selection/types';
import type {
  ClassContent,
  ClassDescription,
} from '@pf2-companion/types/character-builder';

export const Page = () => {
  const classDescriptions = useLoaderData<Selection<ClassContent>[]>();

  return (
    <Stack
      direction="row"
      spacing={2}
    >
      <ClassList content={classDescriptions} />
      <ClassDetailPane />
    </Stack>
  );
};
