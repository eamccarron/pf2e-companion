import type { Ancestry } from '@pf2-companion/compendium-models';

type AncestrySystem = Ancestry['system'];

export const calculateAbilityBoosts = (boosts: AncestrySystem['boosts']) => ({
  free: Object.values(boosts)
    .map(({ value }) => value)
    .filter((value) => value.length === 6).length,
  fixed: Object.values(boosts)
    .map(({ value }) => value)
    .filter((value) => value.length === 1)
    .flat(),
  restricted: Object.values(boosts)
    .map(({ value }) => value)
    .filter((value) => value.length > 1 && value.length < 6),
});
