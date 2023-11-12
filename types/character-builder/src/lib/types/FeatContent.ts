import type { Rarity } from "@pf2-companion/compendium-models";
export type FeatContent = {
  actionType: string;
  actions: number;
  traits: Array<string>;
  rarity: Rarity,
};
