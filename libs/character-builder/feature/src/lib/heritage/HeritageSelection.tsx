'use server';
import type { Selection } from '@pf2-companion/ui-selection';
import { Box, Divider } from '@mui/material';

import { HeritageSelectionView } from '.';
import { fetchAncestryHeritages } from '@pf2-companion/character-builder/data-access';

export async function HeritageSelection({
  ancestryId,
}: {
  ancestryId: string;
}) {
  if (!ancestryId) return <></>;

  const heritages = (await fetchAncestryHeritages(
    ancestryId
  )) as Selection<unknown>[];

  return (
    <Box mt={2}>
      <Divider
        sx={{ mb: 2 }}
        variant="middle"
      />
      <HeritageSelectionView content={heritages} />
    </Box>
  );
}
