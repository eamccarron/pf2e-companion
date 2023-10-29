// Server
import { fetchCompendium } from '../server/fetchCompendium.server';

// Client
import { CircularProgress } from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';

import {
  type AncestrySelectionContent as Content,
  AncestrySelection,
  BackgroundSelection,
} from '@pf2-companion/character-builder';

import { formatAncestryJSON } from '@pf2-companion/character-builder/server';

import type {
  Ancestry,
  Background,
} from '@pf2-companion/data-access-compendium';

export const loader = async (): Promise<{
  ancestries: Content;
  backgrounds: Content;
}> => {
  const ancestryResponse = await fetchCompendium('ancestries');
  const ancestries = (await ancestryResponse.json()) as Array<Ancestry>;

  const backgroundResponse = await fetchCompendium('backgrounds');
  const backgrounds = (await backgroundResponse.json()) as Array<Background>;

  return {
    ancestries: formatAncestryJSON(ancestries),
    backgrounds: formatAncestryJSON(backgrounds),
  };
};

export default function CharacterBuilderAbilityScores() {
  const { ancestries, backgrounds } = useLoaderData<{
    ancestries: Content;
    backgrounds: Content;
  }>();

  return (
    <Suspense fallback={<CircularProgress />}>
      <AncestrySelection content={ancestries} />
      <BackgroundSelection content={backgrounds} />
    </Suspense>
  );
}
