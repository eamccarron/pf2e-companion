import { AncestrySelectionContext } from '@pf2-companion/character-builder/ui';
import { HeritageView } from '@pf2-companion/character-builder/ui';
import { useFetcher, Await } from '@remix-run/react';
import { Suspense, useCallback, useContext, useEffect } from 'react';
import { fetchCompendium } from '../fetchCompendium';

import type { Selection } from '@pf2-companion/ui-selection';
import {
  Box,
  CircularProgress,
  Divider,
  LinearProgress,
  Skeleton,
} from '@mui/material';

const useFetchHeritage = () => {
  const fetcher = useFetcher();
};

export const HeritageSelection = ({ ancestryId }: { ancestryId: string }) => {
  const fetchHeritageOptions = useCallback(async () => {
    if (!ancestryId) return [];

    const response = await fetch(
      `http://localhost:4000/heritages/${ancestryId}`
    );

    return await response.json();
  }, [ancestryId]);

  const data = fetchHeritageOptions();

  return (
    <Box mt={2}>
      <Divider
        sx={{ mb: 2 }}
        variant="middle"
      />
      <Suspense fallback={<Skeleton />}>
        <Await resolve={data}>
          {(data) => (
            <HeritageView
              content={data.map(
                ({
                  name: heritageName,
                  system: {
                    description: { value: description },
                  },
                  id,
                }) => ({
                  id,
                  primary: heritageName,
                  secondary: description,
                })
              )}
            />
          )}
        </Await>
      </Suspense>
    </Box>
  );
};
