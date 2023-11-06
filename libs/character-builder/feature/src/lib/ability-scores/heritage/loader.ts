import { fetchCompendium } from '../../fetchCompendium';

export const loader = async (ancestryId: string) => {
  const heritages = await fetchCompendium(`heritages/${ancestryId}`);
  console.log(heritages);
  return heritages;
};