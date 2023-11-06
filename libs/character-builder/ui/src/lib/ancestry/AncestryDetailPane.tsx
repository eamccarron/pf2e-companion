'use client';

import { useContext } from 'react';
import type { PropsWithChildren } from 'react';

import { AncestrySelectionContext } from './AncestrySelectionContext';
import { ContentDetailPane } from '@pf2-companion/ui-selection';
import { HeritageSelection } from '../heritage/HeritageSelection';
import type { AncestryContent } from '@pf2-companion/types/character-builder';

export const AncestryDetailPane = ({ children }: PropsWithChildren) => {
  const { selection } = useContext(AncestrySelectionContext);

  return (
    <ContentDetailPane<AncestryContent>
      slide
      slideDirection="left"
      selection={selection}
    >
      {children}
    </ContentDetailPane>
  );
};
