import type { Ancestry } from '@pf2-companion/types/compendium';

type AncestrySystem = Ancestry['system'];

const calculateAbilityBoosts = (boosts: AncestrySystem['boosts']) => ({
  free: Object.values(boosts)
    .map(({ value }) => value)
    .filter((value) => value.length === 6),
  fixed: Object.values(boosts)
    .map(({ value }) => value)
    .filter((value) => value.length !== 6)
    .flat(),
});
