import { fetchCompendium } from '../fetchCompendium';

export const loader = async () => {
  const classDescriptions = await fetchCompendium('classes/class-descriptions');
  return classDescriptions.json();
};
