export type AbilityIdentifier = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export type SkillIdentifier =
  | 'acr'
  | 'arc'
  | 'ath'
  | 'cra'
  | 'dec'
  | 'dip'
  | 'itm'
  | 'med'
  | 'nat'
  | 'occ'
  | 'prf'
  | 'rel'
  | 'soc'
  | 'ste'
  | 'sur'
  | 'thi';

export type Rarity = 'common' | 'uncommon' | 'rare';

export interface Description {
  value: string;
}

export interface AbilityScoreModifiers {
  [key: number]: AbilityScoreModifier;
}

export interface AbilityScoreModifier {
  value: AbilityIdentifier[];
}

export interface AdditionalLanguages {
  count: number;
  custom: string;
  value: string[];
}

export interface Languages {
  custom: string;
  value: string[];
}

export interface Item {
  img: string;
  level: number;
  name: string;
  uuid: string;
}

export interface Publication {
  license: string;
  remaster: boolean;
  title: string;
}

export interface Traits {
  rarity: Rarity;
  value: string[];
}
