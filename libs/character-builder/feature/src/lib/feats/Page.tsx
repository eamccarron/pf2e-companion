'use server';
import { FeatSelectionView } from './View';
import {
  fetchClassFeats,
  fetchAncestryFeats,
} from '@pf2-companion/character-builder/data-access';

import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

export const FeatSelectionPage = async ({
  searchParams,
}: {
  searchParams: {
    className?: string;
    level?: string;
    ancestryId?: string;
  };
}) => {
  const { className, level, ancestryId } = searchParams;
  const classFeats = await fetchClassFeats(level ?? '1', className ?? '');

  const ancestryFeats = await fetchAncestryFeats(
    level ?? '1',
    className ?? '',
    ancestryId ?? ''
  );

  return (
    <Suspense fallback={<CircularProgress />}>
      <FeatSelectionView featOptions={{ classFeats, ancestryFeats }} />
    </Suspense>
  );
};
