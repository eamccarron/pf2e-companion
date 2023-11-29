'use server';
import { CircularProgress, Divider } from '@mui/material';

import { AbilityScoreSelection } from './AbilityScoreSelection';
import { Suspense } from 'react';

import { AbilityScoreView } from './View';
import { HeritageSelection } from '../heritage/HeritageSelection';

import {
  fetchAncestries,
  fetchBackgrounds,
} from '@pf2-companion/character-builder/data-access';

const loader = async () => {
  const ancestries = await fetchAncestries();
  const backgrounds = await fetchBackgrounds();

  return {
    ancestries,
    backgrounds,
  };
};

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
            <HeritageSelection ancestryId={ancestryId} />
          </Suspense>
        }
      />
    </>
  );
};
