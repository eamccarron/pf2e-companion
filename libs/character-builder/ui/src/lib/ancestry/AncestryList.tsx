'use client';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Box } from '@mui/material';

import { AncestrySelectionContext } from './AncestrySelectionContext';
import { ContentList } from '@pf2-companion/ui-selection';

import type { AncestryContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection/types';

type ListContent = Selection<AncestryContent>[];

export const AncestryList = ({ content }: { content: ListContent }) => {
  const { selection, setSelection } = useContext(AncestrySelectionContext);

  return (
    <ContentList<AncestryContent>
      selection={selection}
      setSelection={setSelection}
      content={content}
      data-cy="ancestry-list"
    />
  );
};
