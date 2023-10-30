import type { AncestrySelectionContent } from '../../client/ancestry';
import type { Ancestry } from '@pf2-companion/data-access-compendium';

export const formatAncestryJSON = (ancestries: Array<Ancestry>) =>
  ancestries.map(
    ({
      name,
      system: {
        description: { value: description },
        boosts,
        flaws,
        hp,
        traits: { rarity },
      },
      _id: id,
    }: Ancestry) => ({
      primary: name,
      secondary: [`Starting HP: ${hp}`],
      description,
      id,
      content: {
        rarity,
        hp: hp,
        boosts: {
          fixed: [...boosts['0'].value, ...boosts['1'].value],
          free: boosts['2']?.value ?? [],
        },
        flaws,
      },
    })
  );
