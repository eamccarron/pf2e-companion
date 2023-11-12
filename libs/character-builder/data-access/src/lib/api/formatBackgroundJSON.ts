import type { BackgroundContent } from '@pf2-companion/types/character-builder';
import type { Background } from '@pf2-companion/types/compendium';

import { calculateAbilityBoosts } from './calculateAbilityBoosts';

export const formatBackgroundJSON = (backgrounds: Array<Background>) =>
  backgrounds.map(
    ({
      name,
      system: {
        description: { value: description },
        traits: { rarity },
        boosts,
      },
      _id: id,
    }: Background) => ({
      primary: name,
      description,
      id,
      content: {
        rarity,
        boosts: calculateAbilityBoosts(boosts),
      },
    })
  );
