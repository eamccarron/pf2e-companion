'use client';

import { useContext } from 'react';

import { ClassSelectionContext } from './ClassSelectionContext';
import { ContentDetailPane } from '@pf2-companion/ui-selection';
import type { ClassDescription } from '@types';

export const ClassDetailPane = () => {
  const { selection } = useContext(ClassSelectionContext);

  return (
    <ContentDetailPane<ClassDescription>
      slide
      slideDirection="left"
      selection={selection}
    />
  );
};
