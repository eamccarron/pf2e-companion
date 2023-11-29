'use client';
import { Box } from '@mui/material';
import type { Selection } from '@pf2-companion/ui-selection';
import { useContext, useEffect } from 'react';

import { FilterChip, HTMLContent } from '@pf2-companion/ui-general';

import { HeritageSelectionContext } from '.';

export const HeritageSelectionView = ({
  content,
}: {
  content: Selection<unknown>[];
}) => {
  const { selection, setSelection } = useContext(HeritageSelectionContext);
  const { secondary } = selection ?? {};

  const isSelected = (heritage: Selection<unknown>) =>
    heritage.id === selection?.id;

  useEffect(() => setSelection(null), [content, setSelection]);
  return (
    <Box>
      {content?.map((heritage) => (
        <FilterChip
          key={heritage.id}
          label={heritage.primary}
          handleSelection={() => setSelection(heritage)}
          selectedFilters={isSelected(heritage) ? [heritage.primary] : []}
          sx={{ mr: 1, mb: 1 }}
        />
      ))}

      {secondary && (
        <Box mt={2}>
          <HTMLContent content={secondary} />
        </Box>
      )}
    </Box>
  );
};
