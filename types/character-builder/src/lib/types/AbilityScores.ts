import type { AbilityIdentifier } from '@pf2-companion/types/compendium';

export type AbilityScores = {
  [key in AbilityIdentifier]: number;
};
