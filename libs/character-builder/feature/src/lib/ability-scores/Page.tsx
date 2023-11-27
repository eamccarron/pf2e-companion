'use server';
import { CircularProgress, Divider } from '@mui/material';

import { AbilityScoreSelection } from './AbilityScoreSelection';
import { Suspense } from 'react';

import { AbilityScoreView } from './View';
import { HeritageView } from '../heritage/HeritageView';

import { loader } from './loader';

export const Page = async ({
  searchParams,
}: {
  searchParams: {
    ancestryId: string;
  };
}) => {
  const data = await loader();
  const { ancestryId } = searchParams;
  return (
    <>
      <AbilityScoreSelection />
      <Divider />
      <AbilityScoreView
        data={data}
        heritageSelection={
          <Suspense
            key={ancestryId}
            fallback={<CircularProgress />}
          >
            <HeritageView ancestryId={ancestryId} />
          </Suspense>
        }
      />
    </>
  );
};
