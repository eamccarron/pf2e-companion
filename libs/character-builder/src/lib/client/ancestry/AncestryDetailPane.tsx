'use client';

import { useContext } from 'react';
import { Box, Typography, Grid } from '@mui/material';

import { AncestrySelectionContext } from './AncestrySelectionContext';
import { ContentDetailPane } from '@pf2-companion/ui-selection';
import type { Ancestry } from '@pf2-companion/data-access-compendium/types';

export const AncestryDetailPane = () => {
  const { selection } = useContext(AncestrySelectionContext);

  return (
    <ContentDetailPane<Ancestry>
      slide
      slideDirection="left"
      selection={selection}
    />
  );
};
