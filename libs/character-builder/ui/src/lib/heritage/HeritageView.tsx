'use client';
import { Box, Chip, Typography } from '@mui/material';
import type { Selection } from '@pf2-companion/ui-selection';
import { useContext, useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { HTMLContent } from '@pf2-companion/ui-general';
import { HeritageSelectionContext } from './HeritageSelectionContext';
import { FilterChip } from '@pf2-companion/ui-general';

export const HeritageView = ({
  content,
}: {
  content: Selection<unknown>[];
}) => {
  const { selection, setSelection } = useContext(HeritageSelectionContext);
  const { secondary } = selection ?? {};

  const isSelected = (heritage: Selection<unknown>) =>
    heritage.id === selection?.id;

  useEffect(() => setSelection(null), [content]);
  return (
    <Box>
      {content.map((heritage) => (
        <FilterChip
          key={heritage.id}
          label={heritage.primary}
          handleSelection={() => setSelection(heritage)}
          selectedFilters={isSelected(heritage) ? [heritage.primary] : []}
          // variant={isSelected(heritage) ? 'filled' : 'outlined'}
          // icon={isSelected(heritage) ? <CheckCircleIcon /> : undefined}
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
