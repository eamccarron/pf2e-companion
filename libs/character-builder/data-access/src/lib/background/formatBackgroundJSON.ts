import type { Background } from '@pf2-companion/compendium-models';

import { calculateAbilityBoosts } from '../calculateAbilityBoosts';

export const formatBackgroundJSON = (backgrounds: Array<Background>) =>
  backgrounds.map(
    ({
      name,
      system: {
        description: { value: description },
        trainedSkills,
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
        trainedSkills: {
          skills: trainedSkills?.value,
          additional: trainedSkills?.additional,
        },
      },
    })
  );
