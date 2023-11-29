'use client';
import { Stack, Box } from '@mui/material';
import { useContext } from 'react';

import { ClassDetailPane } from '@pf2-companion/character-builder/ui';
import { ContentList } from '@pf2-companion/ui-selection';
import { ClassSelectionContext } from './ClassSelectionContext';

import type { Selection } from '@pf2-companion/ui-selection/types';
import type { ClassContent } from '@pf2-companion/types/character-builder';

export const ClassSelectionView = ({
  classDescriptions,
}: {
  classDescriptions: Selection<ClassContent>[];
}) => {
  const { selection, setSelection } = useContext(ClassSelectionContext);
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
        <ContentList<ClassContent>
          content={classDescriptions}
          selection={selection}
          setSelection={setSelection}
        />
      </Box>

      <Box sx={{ maxWidth: '80%', flexGrow: 1 }}>
        <ClassDetailPane selection={selection} />
      </Box>
    </Stack>
  );
};
