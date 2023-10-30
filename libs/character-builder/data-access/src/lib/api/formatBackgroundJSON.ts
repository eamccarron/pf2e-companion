import type { BackgroundContent } from '@pf2-companion/character-builder/types';
import type { Background } from '@pf2-companion/data-access-compendium/types';

export const formatBackgroundJSON = (backgrounds: Array<Background>) =>
  backgrounds.map(
    ({
      name,
      system: {
        description: { value: description },
        traits: { rarity },
        boosts,
      },
      id,
    }: Background) => ({
      primary: name,
      description,
      id,
      content: {
        rarity,
        boosts: {
          choices: boosts['0']?.value ?? [],
          free: boosts['1']?.value ?? [],
        },
      },
    })
  );
