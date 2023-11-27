'use server';
import { fetchCompendium } from '../fetchCompendium';
import { formatClassJSON } from '@pf2-companion/character-builder/data-access';

export const loader = async () => {
  const classDescriptions = await fetchCompendium('classes');
  return formatClassJSON(await classDescriptions.json());
};
