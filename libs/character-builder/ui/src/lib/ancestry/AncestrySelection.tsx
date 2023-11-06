// Server
import { useState, Suspense, PropsWithChildren } from 'react';

// Client
import { Box, CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';

import { AncestryList, AncestryDetailPane } from '.';

import { RarityFilter } from '../RarityFilter';

import type { AncestryContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection/types';

type Content = Selection<AncestryContent>[];

export const AncestrySelection = ({ content, children }: PropsWithChildren<{ content: Content }>) => {
  const [listContent, setListContent] = useState<Content>([]);
  const [initialContent, setInitialContent] = useState<Content>([]);

  useEffect(() => {
    setListContent(content);
    setInitialContent(content);
  }, [content]);

  return (
    <Suspense fallback={<CircularProgress />}>
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
          <AncestryList content={listContent} />
        </Box>
        <Box sx={{ maxHeight: 600, overflow: 'auto', width: '50%' }}>
          <AncestryDetailPane >
            {children}
          </AncestryDetailPane>
        </Box>
      </Stack>
    </Suspense>
  );
};
