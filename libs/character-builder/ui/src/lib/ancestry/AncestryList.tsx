'use client';
import { Dispatch, SetStateAction } from 'react';

import { ContentList } from '@pf2-companion/ui-selection';

import type { AncestryContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection/types';

type ListContent = Selection<AncestryContent>[];

export const AncestryList = ({
  content,
  selection,
  setSelection,
}: {
  content: ListContent;
  selection: Selection<AncestryContent>;
  setSelection: Dispatch<SetStateAction<Selection<AncestryContent> | null>>;
}) => {
  return (
    <ContentList<AncestryContent>
      data-cy="ancestry-list"
      selection={selection}
      setSelection={setSelection}
      content={content}
    />
  );
};
