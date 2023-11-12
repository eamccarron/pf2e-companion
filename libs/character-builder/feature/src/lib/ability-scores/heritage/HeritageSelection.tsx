'use server';
import { HeritageView } from '@pf2-companion/character-builder/ui';
import { Suspense, useCallback, useContext, useEffect } from 'react';

import type { Selection } from '@pf2-companion/ui-selection';
import { Box, CircularProgress, Divider, Skeleton } from '@mui/material';

import { loader as fetchHeritage } from './loader';

export async function HeritageSelection({
  ancestryId,
}: {
  ancestryId: string;
}) {
  if (!ancestryId) return <></>;

  const heritages = (await fetchHeritage(ancestryId)) as Selection<any>[];

  return (
    <Box mt={2}>
      <Divider
        sx={{ mb: 2 }}
        variant="middle"
      />
      <HeritageView content={heritages} />
    </Box>
  );
}
