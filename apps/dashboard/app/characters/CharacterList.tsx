'use client';
import { useContext } from 'react';

import { ContentList, Selection } from '@pf2-companion/ui-selection';
import { CharacterSelectionContext } from './CharacterSelectionContext';

import type { Character } from '@pf2-companion/types/character-builder';

export const CharacterList = ({
  content,
}: React.PropsWithChildren<{ content: Selection<Character>[] }>) => {
  const { selection, setSelection } = useContext(CharacterSelectionContext);

  return (
    <ContentList<Character>
      selection={selection}
      setSelection={setSelection}
      content={content}
    />
  );
};
