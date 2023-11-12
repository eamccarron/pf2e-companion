'use client';
import { useContext } from 'react';

import { CharacterSelectionContext } from './CharacterSelectionContext';
import { ContentList, Selection } from '@pf2-companion/ui-selection';

import type { SelectionContext } from '@pf2-companion/ui-selection';

export const CharacterList = ({
  content,
}: React.PropsWithChildren<{ content: Selection<any>[] }>) => {
  const { selection, setSelection } = useContext<SelectionContext<any>>(
    CharacterSelectionContext
  );

  return (
    <ContentList<any>
      selection={selection}
      setSelection={setSelection}
      content={content}
    />
  );
};
