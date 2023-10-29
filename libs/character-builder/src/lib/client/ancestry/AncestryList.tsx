'use client';

import { useContext } from 'react';

import { AncestrySelectionContext } from './AncestrySelectionContext';
import { ContentList } from '@pf2-companion/ui-selection';
import type { Selection } from '@pf2-companion/ui-selection';

import type { AncestrySelectionContent } from './types/AncestrySelectionContent';
import type { AncestryContent } from './types/AncestrySelectionContent';

export const AncestryList = ({
  content,
}: { content: AncestrySelectionContent }) => {
  const { selection, setSelection } = useContext(AncestrySelectionContext);

  return (
    <ContentList<AncestryContent>
      selection={selection}
      setSelection={setSelection}
      content={content}
    />
  );
};
