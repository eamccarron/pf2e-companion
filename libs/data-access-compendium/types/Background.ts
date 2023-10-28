import { AbilityIdentifier, SkillIdentifier, Rarity } from './System';

export interface Boost {
  value: Array<AbilityIdentifier>;
}

export interface BackgroundSystem {
  boosts: {
    [key: number]: Boost;
  };
  description: {
    value: string;
  };
  rules: [];
  trainedLore: string;
  trainedSkills: {
    value: Array<SkillIdentifier>;
  };
  traits: {
    rarity: Rarity;
    value: [];
  };
}

export interface Background {
  _id: string;
  name: string;
  type: 'background';
  system: BackgroundSystem;
}
