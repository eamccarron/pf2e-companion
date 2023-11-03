'use client';

import { useContext } from 'react';

import { ClassSelectionContext } from './ClassSelectionContext';
import { ContentDetailPane } from '@pf2-companion/ui-selection';
import type { ClassContent } from '@pf2-companion/types/character-builder';

export const ClassDetailPane = () => {
  const { selection } = useContext(ClassSelectionContext);

  return (
    <ContentDetailPane<ClassContent>
      slide
      slideDirection="left"
      selection={selection}
    />
  );
};
