'use client';

import { useContext, useEffect } from 'react';

import { useRouter, usePathname } from 'next/navigation';
import { ClassSelectionContext } from './ClassSelectionContext';
import { ContentDetailPane } from '@pf2-companion/ui-selection';
import type { ClassContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection';
import { TrainedSkills } from '../skills/TrainedSkills';

export const ClassDetailPane = ({
  selection,
}: {
  selection: Selection<ClassContent>;
}) => {
  return (
    <ContentDetailPane<ClassContent>
      slide
      slideDirection="left"
      selection={selection}
    >
      <TrainedSkills trainedSkills={selection?.content.trainedSkills ?? []} />
    </ContentDetailPane>
  );
};
