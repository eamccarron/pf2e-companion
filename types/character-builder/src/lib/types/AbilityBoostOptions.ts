export type AbilityScore = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export interface AbilityBoostOptions {
  fixed: Array<AbilityScore>;
  free: number;
  restricted?: Array<AbilityScore[]>;
}
