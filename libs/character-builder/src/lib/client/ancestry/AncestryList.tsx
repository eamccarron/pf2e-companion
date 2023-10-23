'use client';

import { useContext } from 'react';

import { AncestrySelectionContext } from './AncestrySelectionContext';
import { ContentList, Selection } from '@pf2-companion/ui-selection';

import type { Ancestry } from '@pf2-companion/data-access-compendium/types';
import type { SelectionContext } from '@pf2-companion/ui-selection';

export const AncestryList = ({
  content,
}: React.PropsWithChildren<{ content: Selection<Ancestry>[] }>) => {
  const { selection, setSelection } = useContext<SelectionContext<Ancestry>>(
    AncestrySelectionContext
  );

  return (
    <ContentList<Ancestry>
      selection={selection}
      setSelection={setSelection}
      content={content}
    />
  );
};
