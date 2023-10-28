import type {
  AbilityScoreModifiers,
  AdditionalLanguages,
  Languages,
  Item,
} from './System';

export interface Ancestry {
  _id: string;
  img: string;
  name: string;
  system: AncestrySystem;
  type: string;
}

export interface AncestrySystem {
  additionalLanguages: AdditionalLanguages;
  boosts: AbilityScoreModifiers;
  description: Description;
  flaws: AbilityScoreModifiers;
  hp: number;
  items: { [key: string]: Item };
  languages: Languages;
  publication: Publication;
  reach: number;
  rules: object[];
  size: string;
  speed: number;
  traits: Traits;
  vision: string;
}

export interface Description {
  value: string;
}

export interface Publication {
  license: string;
  remaster: boolean;
  title: string;
}

export interface Traits {
  rarity: string;
  value: string[];
}