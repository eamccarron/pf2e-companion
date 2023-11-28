import { Dispatch, SetStateAction } from 'react';
import { ContentList } from '@pf2-companion/ui-selection';

import type { BackgroundContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection/types';

export const BackgroundList = ({
  content,
  selection,
  setSelection,
}: {
  content: Selection<BackgroundContent>[];
  selection: Selection<BackgroundContent>;
  setSelection: Dispatch<SetStateAction<Selection<BackgroundContent> | null>>;
}) => {
  return (
    <ContentList<BackgroundContent>
      data-cy="background-list"
      selection={selection}
      setSelection={setSelection}
      content={content}
    />
  );
};
