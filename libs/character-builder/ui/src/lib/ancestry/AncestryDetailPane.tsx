'use client';

import { useContext } from 'react';

import { AncestrySelectionContext } from './AncestrySelectionContext';
import { ContentDetailPane } from '@pf2-companion/ui-selection';
import type { AncestryContent } from '@pf2-companion/character-builder/types';

export const AncestryDetailPane = () => {
  const { selection } = useContext(AncestrySelectionContext);

  return (
    <ContentDetailPane<AncestryContent>
      slide
      slideDirection="left"
      selection={selection}
    />
  );
};
