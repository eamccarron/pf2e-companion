import { useContext } from 'react';

import { BackgroundSelectionContext } from './BackgroundSelectionContext';
import { ContentDetailPane } from '@pf2-companion/ui-selection';
import type { BackgroundContent } from '@pf2-companion/types/character-builder';

export const BackgroundDetailPane = () => {
  const { selection } = useContext(BackgroundSelectionContext);

  return (
    <ContentDetailPane<BackgroundContent>
      slide
      slideDirection="left"
      selection={selection}
    />
  );
};
