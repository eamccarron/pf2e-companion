import type {
  Ancestry,
  AncestrySystem,
} from '@pf2-companion/data-access-compendium';

export const formatAncestryJSON = (ancestries: Array<Ancestry>) =>
  ancestries.map(
    ({
      name,
      system: {
        description: { value: description },
        boosts,
        flaws,
        hp,
        traits: { rarity },
      },
      _id: id,
    }: Ancestry) => ({
      primary: name,
      secondary: [`Starting HP: ${hp}`],
      description,
      id,
      content: {
        rarity,
        hp: hp,
        boosts: calculateAbilityBoosts(boosts),
        flaws,
      },
    })
  );

const calculateAbilityBoosts = (boosts: AncestrySystem['boosts']) => ({
  free: Object.values(boosts)
    .map(({ value }) => value)
    .filter((value) => value.length === 6),
  fixed: Object.values(boosts)
    .map(({ value }) => value)
    .filter((value) => value.length !== 6)
    .flat(),
});
