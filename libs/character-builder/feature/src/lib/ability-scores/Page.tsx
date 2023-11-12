import { CircularProgress, Divider, Skeleton } from '@mui/material';

import { AbilityScoreSelection } from '@pf2-companion/character-builder/ui';
import { Suspense } from 'react';

import type { Selection } from '@pf2-companion/ui-selection';

import { loader as abilityScoreSelectionLoader } from './loader';

import { AbilityScoreView } from './View';
import { HeritageSelection } from './heritage/HeritageSelection';

import { loader } from './loader';

export const Page = async ({
  searchParams,
}: {
  searchParams?: {
    ancestryId: string;
  };
}) => {
  const data = await loader();
  const { ancestryId } = searchParams || {};
  return (
    <>
      <AbilityScoreSelection />
      <Divider />
      <AbilityScoreView
        data={data}
        heritageSelection={
          <Suspense key={ancestryId} fallback={<CircularProgress />}>
            <HeritageSelection ancestryId={ancestryId} />
          </Suspense>
        }
      />
    </>
  );
};
