'use client';

import { useContext } from 'react';

import { CharacterSelectionContext } from './CharacterSelectionContext';
import { ContentList, Selection } from '@pf2-companion/ui-selection';

import type { Character } from '@pf2-companion/data-access-characters/types';
import type { SelectionContext } from '@pf2-companion/ui-selection';

export const CharacterList = ({
  content,
}: React.PropsWithChildren<{ content: Selection<Character>[] }>) => {
  const { selection, setSelection } = useContext<SelectionContext<Character>>(
    CharacterSelectionContext
  );

  return (
    <ContentList<Character>
      selection={selection}
      setSelection={setSelection}
      content={content}
    />
  );
};
