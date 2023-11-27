'use client';
import { useState, Suspense, PropsWithChildren, useContext } from 'react';

import { Box, CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';

import {
  AncestryList,
  AncestryDetailPane,
  RarityFilter,
} from '@pf2-companion/character-builder/ui';
import { AncestrySelectionContext } from './AncestrySelectionContext';

import type { AncestryContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection/types';

type Content = Selection<AncestryContent>[];

export const AncestrySelection = ({
  content,
  children,
}: PropsWithChildren<{ content: Content }>) => {
  const [listContent, setListContent] = useState<Content>([]);
  const [initialContent, setInitialContent] = useState<Content>([]);

  const { selection, setSelection } = useContext(AncestrySelectionContext);

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
          <AncestryList
            content={listContent}
            selection={selection}
            setSelection={setSelection}
          />
        </Box>
        <Box sx={{ maxHeight: 600, overflow: 'auto', width: '50%' }}>
          <AncestryDetailPane selection={selection}>
            {children}
          </AncestryDetailPane>
        </Box>
      </Stack>
    </>
  );
};
