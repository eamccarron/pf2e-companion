'use client';

import { useContext } from 'react';

import { BackgroundSelectionContext } from './BackgroundSelectionContext';
import { ContentList, Selection } from '@pf2-companion/ui-selection';

import type { Background } from '@pf2-companion/data-access-compendium/types';
import type { SelectionContext } from '@pf2-companion/ui-selection';

export const BackgroundList = ({
  content,
}: React.PropsWithChildren<{ content: Selection<Background>[] }>) => {
  const { selection, setSelection } = useContext<SelectionContext<Background>>(
    BackgroundSelectionContext
  );

  return (
    <ContentList<Background>
      selection={selection}
      setSelection={setSelection}
      content={content}
    />
  );
};
