'use client';

import { ContentDetailPane } from '@pf2-companion/ui-selection';
import type { ClassContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection';
import { TrainedSkills } from '../skills/TrainedSkills';

export const ClassDetailPane = ({
  selection,
}: {
  selection: Selection<ClassContent> | null;
}) => {
  return (
    <ContentDetailPane<ClassContent>
      slide
      slideDirection="left"
      selection={selection}
    >
      <TrainedSkills
        trainedSkills={
          selection?.content.trainedSkills ?? { skills: [], additional: 0 }
        }
      />
    </ContentDetailPane>
  );
};
