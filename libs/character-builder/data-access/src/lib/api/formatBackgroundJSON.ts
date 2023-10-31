import type { BackgroundContent } from '@pf2-companion/types/character-builder';
import type { Background } from '@pf2-companion/types/compendium';

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
          restricted: boosts['0']?.value ?? [],
          free: boosts['1']?.value ?? [],
        },
      },
    })
  );
