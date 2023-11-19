import type { Rarity } from '@pf2-companion/compendium-models';
import type { Selection } from '@pf2-companion/types/ui-selection';

type FeatDetails = {
  actionType: string;
  actions: number;
  traits: Array<string>;
  rarity: Rarity;
};

export type FeatContent = FeatDetails & { bonus: Selection<FeatDetails>[] };
