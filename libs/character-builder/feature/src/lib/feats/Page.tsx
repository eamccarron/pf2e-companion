import { FeatSelectionView } from './View';
import { Loader } from '../../types/Loader';
import { classFeatsLoader, ancestryFeatsLoader } from './loader';
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

export const FeatSelectionPage = async ({ searchParams }) => {
  const { className, level, ancestryId } = searchParams ?? {};
  console.log(searchParams);
  const classFeats = await classFeatsLoader(level ?? 1, className);
  const ancestryFeats = await ancestryFeatsLoader(
    level ?? 1,
    className,
    ancestryId ?? ''
  );

  return (
    <Suspense fallback={<CircularProgress />}>
      <FeatSelectionView featOptions={{ classFeats, ancestryFeats }} />
    </Suspense>
  );
};
