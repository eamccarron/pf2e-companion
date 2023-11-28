'use server';
import { fetchCompendium } from '../fetchCompendium';
import { formatFeatJSON } from './formatFeatJSON';
import type { Feat } from '@pf2-companion/compendium-models';

export const fetchAncestryFeats = async (
  level: string,
  className: string,
  ancestryId: string
) => {
  const ancestryFeatRes = await fetchCompendium('builder/feats/ancestry', {
    className,
    level: level,
    ancestryId,
  });

  if (!ancestryFeatRes.ok) {
    return [];
  }

  const ancestryFeats: Array<Feat> = await ancestryFeatRes.json();

  return formatFeatJSON(ancestryFeats ?? []);
};
