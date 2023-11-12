import { resolve } from 'path';
import { fetchCompendium } from '../../fetchCompendium';
import { formatHeritageJSON } from '@pf2-companion/character-builder/data-access';

export const loader = async (ancestryId: string) => {
  const heritages = await fetchCompendium(`heritages/${ancestryId}`);
  return formatHeritageJSON(await heritages.json());
};
