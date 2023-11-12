import type { FeatContent } from '@pf2-companion/types/character-builder';
import type { Feat } from '@pf2-companion/compendium-models';

export const formatFeatJSON = (feats: Array<Feat>) =>
  feats.map(
    ({
      _id: id,
      name: featName,
      system: {
        description: { value: description },
        actionType: { value: actionType },
        actions: { value: actions },
        traits: { value: traits, rarity },
      },
    }) => ({
      id,
      primary: featName,
      description,
      content: {
        actionType,
        actions,
        traits,
        rarity,
      } as FeatContent,
    })
  );
