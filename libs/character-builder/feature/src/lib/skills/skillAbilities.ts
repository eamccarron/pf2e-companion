import type {
  SkillIdentifier,
  AbilityIdentifier,
} from '@pf2-companion/types/compendium';

export const skillAbilities: Record<SkillIdentifier, AbilityIdentifier> = {
  acr: 'dex',
  arc: 'int',
  ath: 'str',
  cra: 'int',
  dec: 'cha',
  dip: 'cha',
  itm: 'cha',
  med: 'wis',
  nat: 'int',
  occ: 'int',
  prf: 'cha',
  rel: 'int',
  soc: 'int',
  ste: 'dex',
  sur: 'wis',
  thi: 'dex',
};
