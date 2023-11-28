'use server';
import { fetchCompendium } from '../fetchCompendium';

import { formatAncestryJSON } from './formatAncestryJSON';

import type { AncestryContent } from '@pf2-companion/types/character-builder';

import type { Ancestry } from '@pf2-companion/compendium-models';

import type { Selection } from '@pf2-companion/types/ui-selection';

export const fetchAncestries = async (): Promise<
  Selection<AncestryContent>[]
> => {
  const ancestryResponse = await fetchCompendium('ancestries');
  const ancestries = (await ancestryResponse.json()) as Array<Ancestry>;

  return formatAncestryJSON(ancestries);
};
