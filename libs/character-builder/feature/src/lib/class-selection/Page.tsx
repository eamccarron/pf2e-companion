import { Box, Stack } from '@mui/material';

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
      <Box
        sx={{
          maxHeight: 600,
          overFlow: 'auto',
          minWidth: '20%',
        }}
      >
        <ClassList content={classDescriptions} />
      </Box>

      <Box sx={{ maxWidth: '80%', flexGrow: 1 }}>
        <ClassDetailPane />
      </Box>
    </Stack>
  );
};
