import { Stack } from '@mui/material';

import {
  AncestryList,
  AncestryDetailPane,
} from '@pf2-companion/character-builder';

import type { Selection } from '@pf2-companion/ui-selection';
import type { Ancestry } from '@pf2-companion/data-access-compendium/types';

export const revalidate = 3;

const getAncestries = async () => {
  const res = await fetch('http://localhost:4200/api/compendium/ancestries');
  return res.json();
};

export default async function SelectAncestryAndAbilityScores() {
  const ancestries: Array<Ancestry> = await getAncestries();

  const listContent = ancestries.map(
    ({ name, system: { descr/iption, hp }, _id: id }) => ({
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
