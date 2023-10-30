import { fetchCompendium } from "../fetchCompendium";

import { formatAncestryJSON } from '@pf2-companion/character-builder/data-access'
import { formatBackgroundJSON } from '@pf2-companion/character-builder/data-access'

import type { AncestryContent } from "@pf2-companion/character-builder/types";
import type { BackgroundContent } from "@pf2-companion/character-builder/types";

import type { Ancestry } from '@pf2-companion/data-access-compendium/types';
import type { Background } from '@pf2-companion/data-access-compendium/types';

import type { Selection } from '@pf2-companion/ui-selection';

export const loader = async (): Promise<{
  ancestries: Selection<AncestryContent>[];
  backgrounds: Selection<BackgroundContent>[];
}> => {
  const ancestryResponse = await fetchCompendium('ancestries');
  const ancestries = (await ancestryResponse.json()) as Array<Ancestry>;

  const backgroundResponse = await fetchCompendium('backgrounds');
  const backgrounds = (await backgroundResponse.json()) as Array<Background>;

  return {
    ancestries: formatAncestryJSON(ancestries),
    backgrounds: formatBackgroundJSON(backgrounds),
  };
};