import { fetchCompendium } from '../fetchCompendium';
import { formatFeatJSON } from '@pf2-companion/character-builder/data-access';
import type { BuilderTemplate } from '@pf2-companion/types/character-builder';
import type { Feat } from '@pf2-companion/compendium-models';

export const classFeatsLoader = async (level: string, className: string) => {
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

export const ancestryFeatsLoader = async (
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
