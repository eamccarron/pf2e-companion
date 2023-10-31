import { useContext } from 'react';
import { Box } from '@mui/material';

import { BackgroundSelectionContext } from './BackgroundSelectionContext';
import { ContentList } from '@pf2-companion/ui-selection';

import type { BackgroundContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection/types';

export const BackgroundList = ({
  content,
}: {
  content: Selection<BackgroundContent>[];
}) => {
  const { selection, setSelection } = useContext(BackgroundSelectionContext);

  return (
    <ContentList<BackgroundContent>
      selection={selection}
      setSelection={setSelection}
      content={content}
    />
  );
};
