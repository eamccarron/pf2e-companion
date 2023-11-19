import { Stack } from '@mui/material';
import type {
  FeatContent,
} from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection';

import { ContentList, ContentDetailPane } from '@pf2-companion/ui-selection';
import type { Dispatch } from 'react';

export type FeatSelectionPaneProps = {
  options: Selection<FeatContent>[];
  handleFeatSelection: Dispatch<Selection<FeatContent> | null>;
  selectedFeat: Selection<FeatContent> | null;
};

export const FeatSelectionPane = ({
  options,
  handleFeatSelection,
  selectedFeat,
}: FeatSelectionPaneProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
    >
      <ContentList<FeatContent>
        data-cy="feat-list"
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
    </Stack>
  );
};
