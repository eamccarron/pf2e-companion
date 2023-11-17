import { Stack } from '@mui/material';
import type { FeatContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection';
import type {
  FeatType,
  FeatSelection,
  FeatAction,
} from './FeatSelectionContext';

import { ContentList, ContentDetailPane } from '@pf2-companion/ui-selection';
import { FeatSelectionContext } from './FeatSelectionContext';
import { useContext, useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export type FeatSelectionPaneProps = {
  options: Selection<FeatContent>[];
  featType: FeatType;
  level: number;
  handleFeatSelection: Dispatch<SetStateAction<Selection<FeatContent> | null>>;
  selectedFeat: Selection<FeatContent>;
};

export const FeatSelectionPane = ({
  options,
  featType,
  level,
  handleFeatSelection,
  selectedFeat,
}: FeatSelectionPaneProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
    >
      {featType !== 'bonus' && (
        <>
          <ContentList<FeatContent>
            content={options}
            setSelection={handleFeatSelection}
            selection={selectedFeat}
          />
          <ContentDetailPane<FeatContent>
            outlined
            selection={selectedFeat as Selection<FeatContent>}
            slide
            slideDirection="left"
          />
        </>
      )}
    </Stack>
  );
};
