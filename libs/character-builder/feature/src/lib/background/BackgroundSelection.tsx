'use client';
// Server
import { Suspense, useContext, useState } from 'react';

// Client
import { Box, CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';

import { BackgroundSelectionContext } from './BackgroundSelectionContext';
import {
  BackgroundList,
  BackgroundDetailPane,
} from '@pf2-companion/character-builder/ui';
import { RarityFilter } from '@pf2-companion/character-builder/ui';

import type { BackgroundContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection/types';

type Content = Selection<BackgroundContent>[];
export const BackgroundSelection = ({ content }: { content: Content }) => {
  const [listContent, setListContent] = useState<Content>([]);
  const [initialContent, setInitialContent] = useState<Content>([]);

  const { selection, setSelection } = useContext(BackgroundSelectionContext);

  useEffect(() => {
    setListContent(content);
    setInitialContent(content);
  }, [content]);

  return (
    <>
      <RarityFilter
        content={listContent}
        setContent={setListContent}
        initialContent={initialContent}
      />
      <Stack
        direction="row"
        spacing={2}
      >
        <Box sx={{ maxHeight: 600, overflow: 'auto', width: '50%' }}>
          <BackgroundList
            content={listContent}
            selection={selection}
            setSelection={setSelection}
          />
        </Box>

        <Box sx={{ maxWidth: '50%' }}>
          <BackgroundDetailPane selection={selection} />
        </Box>
      </Stack>
    </>
  );
};
