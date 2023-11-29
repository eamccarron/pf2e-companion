'use client';

import { Skeleton } from '@mui/material';
import { Suspense, useContext, useDeferredValue } from 'react';
import type { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

import { ContentDetailPane } from '@pf2-companion/ui-selection';
import type { AncestryContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection/types';

export const AncestryDetailPane = ({
  children,
  selection,
}: PropsWithChildren<{ selection: Selection<AncestryContent> | null }>) => {
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
