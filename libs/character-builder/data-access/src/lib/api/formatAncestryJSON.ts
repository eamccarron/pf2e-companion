import type { Ancestry } from '@pf2-companion/types/compendium';
import type { Selection } from '@pf2-companion/types/ui-selection';
import { AncestryContent } from '@pf2-companion/types/character-builder';

import { calculateAbilityBoosts } from './calculateAbilityBoosts';

export const formatAncestryJSON = (
  ancestries: Array<Ancestry>
): Selection<AncestryContent>[] =>
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
      secondary: `Starting HP: ${hp}`,
      description,
      id,
      content: {
        rarity,
        hp: hp,
        boosts: calculateAbilityBoosts(boosts),
        flaws,
      },
    })
  );
