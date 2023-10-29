import type { BackgroundSelectionContent } from '../../client/background';
import type { Background } from '@pf2-companion/data-access-compendium';

export const formatBackgroundJSON = (backgrounds: Array<Background>) =>
  backgrounds.map(
    ({
      name,
      system: {
        description: { value: description },
        traits: { rarity },
      },
      id,
    }: Background) =>
      ({
        primary: name,
        description,
        id,
        content: { rarity },
      })
  );
