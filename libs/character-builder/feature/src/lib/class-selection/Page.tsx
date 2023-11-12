import { Stack } from '@mui/material';

import {
  ClassList,
  ClassDetailPane,
} from '@pf2-companion/character-builder/ui';

import type { Selection } from '@pf2-companion/ui-selection/types';
import type {
  ClassContent,
  ClassDescription,
} from '@pf2-companion/types/character-builder';
import type { Loader } from '../../types/Loader';
import { loader as fetchClasses } from './loader';

export const Page = async () => {
  const classDescriptions = await fetchClasses();

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
