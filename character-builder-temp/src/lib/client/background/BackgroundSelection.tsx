// Server
import { useState } from 'react';

// Client
import { Box, Stack } from '@mui/material';
import { useEffect } from 'react';

import { BackgroundList, BackgroundDetailPane } from '.';

import { RarityFilter } from '../RarityFilter';

import type { BackgroundSelectionContent as Content } from '.';

export const BackgroundSelection = ({ content }: { content: Content }) => {
  const [listContent, setListContent] = useState<Content>([]);
  const [initialContent, setInitialContent] = useState<Content>([]);

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
          <BackgroundList content={listContent} />
        </Box>

        <Box sx={{ maxWidth: '50%' }}>
          <BackgroundDetailPane />
        </Box>
      </Stack>
    </>
  );
};