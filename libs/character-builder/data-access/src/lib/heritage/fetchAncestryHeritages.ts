import { fetchCompendium } from '../fetchCompendium';
import { formatHeritageJSON } from './formatHeritageJSON';

export const fetchAncestryHeritages = async (ancestryId: string) => {
  if (!ancestryId) {
    return [];
  }
  const heritages = await fetchCompendium(`heritages/${ancestryId}`);
  return formatHeritageJSON(await heritages.json());
};
