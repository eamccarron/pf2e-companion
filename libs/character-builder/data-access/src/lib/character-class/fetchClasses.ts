import { fetchCompendium } from '../fetchCompendium';
import { formatClassJSON } from './formatClassJSON';

export const fetchClasses = async () => {
  const classDescriptions = await fetchCompendium('classes');
  return formatClassJSON(await classDescriptions.json());
};
