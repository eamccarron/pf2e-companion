import { ContentDetailPane } from '@pf2-companion/ui-selection';
import { type BackgroundContent } from '@pf2-companion/types/character-builder';
import { TrainedSkills } from '../skills/TrainedSkills';

import type { Selection } from '@pf2-companion/types/ui-selection';

export const BackgroundDetailPane = ({
  selection,
}: {
  selection: Selection<BackgroundContent> | null;
}) => {
  return (
    <ContentDetailPane<BackgroundContent>
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
