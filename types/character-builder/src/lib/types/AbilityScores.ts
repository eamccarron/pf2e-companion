import type { AbilityIdentifier } from '@pf2-companion/types/compendium';

export type AbilityScores = Array<{
  ability: AbilityIdentifier;
  abilityScore: number;
}>;
