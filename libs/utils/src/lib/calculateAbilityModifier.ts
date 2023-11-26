export const calculateAbilityModifier = (abilityScore: number): number =>
  Math.floor((abilityScore - 10) / 2);
