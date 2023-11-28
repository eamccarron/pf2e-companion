'use server';
import { fetchCompendium } from '../fetchCompendium';
import { formatFeatJSON } from './formatFeatJSON';
import type { Feat } from '@pf2-companion/compendium-models';

export const fetchClassFeats = async (level: string, className: string) => {
  const classFeatRes = await fetchCompendium('builder/feats/class', {
    className,
    level: level,
  });
  const classFeats: Array<Feat> = await classFeatRes.json();

  if (!classFeatRes.ok) {
    return [];
  }

  return formatFeatJSON(classFeats ?? []);
};
