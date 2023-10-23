'use client';

import { useContext } from 'react';

import { ClassSelectionContext } from './ClassSelectionContext';
import { ContentList, Selection } from '@pf2-companion/ui-selection';

import type { ClassDescription } from '@types';
import type { SelectionContext } from '@pf2-companion/ui-selection';

export const ClassList = ({
  content,
}: React.PropsWithChildren<{ content: Selection<ClassDescription>[] }>) => {
  const { selection, setSelection } = useContext<
    SelectionContext<ClassDescription>
  >(ClassSelectionContext);

  return (
    <ContentList<ClassDescription>
      selection={selection}
      setSelection={setSelection}
      content={content}
    />
  );
};
