import { fetchCompendium } from '../fetchCompendium';
import { formatFeatJSON } from '@pf2-companion/character-builder/data-access';
import type {
  BuilderTemplate,
  Feat,
} from '@pf2-companion/types/character-builder';

export const classFeatsLoader = async (className: string, level: number) => {

  const response = await fetchCompendium('builder/feats/class', {
    className,
    level: level.toString(),
  });

  const { classFeats } = (await response.json()) as BuilderTemplate<Feat>;

  return {
    classFeats: formatFeatJSON(classFeats),
  };
};
