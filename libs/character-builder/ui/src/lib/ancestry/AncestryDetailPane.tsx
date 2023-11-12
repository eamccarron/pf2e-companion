'use client';

import { Skeleton } from '@mui/material';
import { Suspense, useContext, useDeferredValue } from 'react';
import type { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

import { AncestrySelectionContext } from './AncestrySelectionContext';
import { ContentDetailPane } from '@pf2-companion/ui-selection';
import type { AncestryContent } from '@pf2-companion/types/character-builder';

export const AncestryDetailPane = ({ children }: PropsWithChildren) => {
  const { selection } = useContext(AncestrySelectionContext);
  // Defer value to sync render with ancestry options change
  const deferredSelection = useDeferredValue(selection);

  return (
    <ContentDetailPane<AncestryContent>
      slide
      slideDirection="left"
      selection={deferredSelection}
    >
      {children}
    </ContentDetailPane>
  );
};
