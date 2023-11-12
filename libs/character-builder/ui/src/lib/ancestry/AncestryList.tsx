'use client';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Box } from '@mui/material';

import { AncestrySelectionContext } from './AncestrySelectionContext';
import { ContentList } from '@pf2-companion/ui-selection';

import type { AncestryContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection/types';

type ListContent = Selection<AncestryContent>[];

export const AncestryList = ({ content }: { content: ListContent }) => {
  const { selection, setSelection } = useContext(AncestrySelectionContext);
  const router = useRouter();
  const pathname = usePathname();

  const handleSelection = (selection: Selection<AncestryContent> | null) => {
    setSelection(selection);
    router.replace(`${pathname}?ancestryId=${selection?.id}`, { scroll: false });
  };

  return (
    <ContentList<AncestryContent>
      selection={selection}
      setSelection={handleSelection}
      content={content}
      data-cy="ancestry-list"
    />
  );
};
