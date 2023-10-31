'use client';

import { useContext } from 'react';

import { ClassSelectionContext } from './ClassSelectionContext';
import { ContentList, Selection } from '@pf2-companion/ui-selection';

import type { ClassContent } from '@pf2-companion/types/character-builder';
import type { SelectionContext } from '@pf2-companion/ui-selection';

export const ClassList = ({
  content,
}: React.PropsWithChildren<{ content: Selection<ClassContent>[] }>) => {
  const { selection, setSelection } = useContext(ClassSelectionContext);

  return (
    <ContentList<ClassContent>
      selection={selection}
      setSelection={setSelection}
      content={content}
    />
  );
};
