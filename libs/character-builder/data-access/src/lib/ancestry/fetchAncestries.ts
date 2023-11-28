'use server';
import { fetchCompendium } from '../fetchCompendium';

import { formatAncestryJSON } from '@pf2-companion/character-builder/data-access';

import type { AncestryContent } from '@pf2-companion/types/character-builder';

import type { Ancestry } from '@pf2-companion/compendium-models';

import type { Selection } from '@pf2-companion/ui-selection/types';

export const fetchAncestries = async (): Promise<
  Selection<AncestryContent>[]
> => {
  const ancestryResponse = await fetchCompendium('ancestries');
  const ancestries = (await ancestryResponse.json()) as Array<Ancestry>;

  return formatAncestryJSON(ancestries);
};
