import { Stack } from '@mui/material';

import ContentList from '@/components/ContentList';
import { ContentDetailPane } from '@/components/ContentDetailPane';
import { AncestrySelectionContext } from '@/components/character/create/AncestrySelectionContext';

import type { Selection } from '@/components/providers/SelectionContextProvider';
import type { Ancestry } from '@/types/Ancestry';

export const revalidate = 3;

const getAncestries = async () => {
  const res = await fetch('http://localhost:3000/api/compendium/ancestries');
  return res.json();
};

export default async function SelectAncestryAndAbilityScores() {
  const ancestries: Array<Ancestry> = await getAncestries();

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
      <ContentList
        content={listContent}
        selectionContext={AncestrySelectionContext}
        secondaryContentLength={1}
      />
      <ContentDetailPane
        selectionContext={AncestrySelectionContext}
        slide
        slideDirection="left"
      />
    </Stack>
  );
}
