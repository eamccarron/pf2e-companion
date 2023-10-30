import type { Selection } from '@pf2-companion/ui-selection';

export type AncestryContent = { 
  rarity: string,
  hp: number,
  boosts: {
    fixed: string[],
    free: string[],
  },
};
export type AncestrySelectionContent = Selection<AncestryContent>[];