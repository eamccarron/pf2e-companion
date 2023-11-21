'use client';

import { useContext, useEffect } from 'react';

import { useRouter, usePathname } from 'next/navigation';
import { ClassSelectionContext } from './ClassSelectionContext';
import { ContentDetailPane } from '@pf2-companion/ui-selection';
import type { ClassContent } from '@pf2-companion/types/character-builder';

export const ClassDetailPane = () => {
  const { selection } = useContext(ClassSelectionContext);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => router.push(pathname), []);

  return (
    <ContentDetailPane<ClassContent>
      slide
      slideDirection="left"
      selection={selection}
    />
  );
};
