// Server
import { json } from '@remix-run/node';
import { CompendiumDB, formatCompendiumJSON } from '../server/db.server';
import { Ancestry as AncestryModel } from '../server/models.server';

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
  const db = await CompendiumDB.initialize();

  // TODO: typing on data access layer for better typing here
  const ancestries: Array<any> = formatCompendiumJSON(
    await db.getRepository(AncestryModel).find()
  );

  return json(ancestries);
};

export default function SelectAncestryAndAbilityScores() {
  const ancestries: Array<any> = useLoaderData<Ancestry[]>();

  const listContent = ancestries.map(
    ({ name, system: { description, hp }, _id: id }) => ({
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
