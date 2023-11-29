'use server';
import { fetchCompendium } from '../fetchCompendium';

import { formatBackgroundJSON } from './formatBackgroundJSON';

import type { BackgroundContent } from '@pf2-companion/types/character-builder';

import type { Background } from '@pf2-companion/compendium-models';
import type { Selection } from '@pf2-companion/types/ui-selection';

export const fetchBackgrounds = async (): Promise<
  Selection<BackgroundContent>[]
> => {
  const backgroundResponse = await fetchCompendium('backgrounds');
  const backgrounds = (await backgroundResponse.json()) as Array<Background>;

  return formatBackgroundJSON(backgrounds);
};
