import { useContext } from 'react';

import { BackgroundSelectionContext } from './BackgroundSelectionContext';
import { ContentDetailPane } from '@pf2-companion/ui-selection';
import type { BackgroundContent } from './types/BackgroundSelectionContent';

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
