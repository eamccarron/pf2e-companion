import { AbilityIdentifier } from '@pf2-companion/types/compendium';

//TODO: Remove references to this duplicate type
export type AbilityScore = AbilityIdentifier;

export interface AbilityBoostOptions {
  fixed: Array<AbilityScore>;
  free: number;
  restricted?: Array<AbilityScore[]>;
}
