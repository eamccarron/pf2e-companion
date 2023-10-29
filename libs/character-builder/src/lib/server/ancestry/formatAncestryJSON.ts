import type { AncestrySelectionContent } from '../../client/ancestry';
import type { Ancestry } from '@pf2-companion/data-access-compendium';

export const formatAncestryJSON = (ancestries: Array<Ancestry>) =>
  ancestries.map(
    ({
      name,
      system: {
        description: { value: description },
        hp,
        traits: { rarity },
      },
      _id: id,
    }: Ancestry) =>
      ({
        primary: name,
        secondary: [`Starting HP: ${hp}`],
        description,
        id,
        content: { rarity },
      })
  );
