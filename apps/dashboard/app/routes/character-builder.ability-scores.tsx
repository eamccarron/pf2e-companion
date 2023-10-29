// Server
import { fetchCompendium } from '../server/fetchCompendium.server';

// Client
import { Stack } from '@mui/material';
import { useLoaderData } from '@remix-run/react';

import {
  AncestryList,
  AncestryDetailPane,
} from '@pf2-companion/character-builder';

import type { Selection } from '@pf2-companion/ui-selection';
import type { Ancestry } from '@pf2-companion/data-access-compendium/types';

export const loader = async () => {
  const res = await fetchCompendium('ancestries');
  return res.json();
};

export default function SelectAncestryAndAbilityScores() {
  const ancestries: Array<any> = useLoaderData<Ancestry[]>();

  const listContent = ancestries.map(
    ({
      name,
      system: {
        description: { value: description },
        hp,
      },
      _id: id,
    }) => ({
      primary: name,
      secondary: [`Starting HP: ${hp}`],
      description,
      id,
    })
  ) as Selection<Ancestry>[];

  return (
    <Stack
      direction="row"
      spacing={2}
    >
      <AncestryList content={listContent} />
      <AncestryDetailPane />
    </Stack>
  );
}
