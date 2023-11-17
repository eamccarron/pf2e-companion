import { fetchCompendium } from '../fetchCompendium';
import { formatFeatJSON } from '@pf2-companion/character-builder/data-access';
import type {
  BuilderTemplate,
  Feat,
} from '@pf2-companion/types/character-builder';

export const classFeatsLoader = async (level: number, className: string) => {
  const classFeatRes = await fetchCompendium('builder/feats/class', {
    className,
    level: level.toString(),
  });
  const classFeats = (await classFeatRes.json()) as BuilderTemplate<Feat>;

  return formatFeatJSON(classFeats ?? []);
};

export const ancestryFeatsLoader = async (
  level: number,
  className: string,
  ancestryId: string
) => {
  console.log('ancestry ID:', ancestryId);
  const ancestryFeatRes = await fetchCompendium('builder/feats/ancestry', {
    className,
    level: level.toString(),
    ancestryId,
  });

  if (!ancestryFeatRes.ok) {
    return [];
  }

  const ancestryFeats = (await ancestryFeatRes.json()) as BuilderTemplate<Feat>;
  console.log('ancestry feats:', ancestryFeats);

  return formatFeatJSON(ancestryFeats ?? []);
};
