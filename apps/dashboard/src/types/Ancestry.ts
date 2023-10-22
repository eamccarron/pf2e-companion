type AbilityModifier = {
  [key: number]: { value: Array<string> };
};

export type Ancestry = {
  _id: string;
  name: string;
  system: {
    additionalLanguages: any;
    boosts: AbilityModifier;
    description: string;
    flaws: AbilityModifier;
    hp: number;
    items: any;
    languages: {
      custom: string;
      value: Array<string>;
    };
    reach: number;
    rules: Array<any>;
    size: string;
    speed: 25;
    traits: {
      rarity: string;
      value: Array<string>;
    };
    vision: string;
  };
  type: string;
};
