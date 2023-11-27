'use server';
import { Suspense, useCallback, useContext, useEffect } from 'react';

import type { Selection } from '@pf2-companion/ui-selection';
import { Box, CircularProgress, Divider, Skeleton } from '@mui/material';

import { HeritageSelection } from '.';
import { loader as fetchHeritage } from './loader';

export async function HeritageView({ ancestryId }: { ancestryId: string }) {
  if (!ancestryId) return <></>;

  const heritages = (await fetchHeritage(ancestryId)) as Selection<any>[];

  return (
    <Box mt={2}>
      <Divider
        sx={{ mb: 2 }}
        variant="middle"
      />
      <HeritageSelection content={heritages} />
    </Box>
  );
}
