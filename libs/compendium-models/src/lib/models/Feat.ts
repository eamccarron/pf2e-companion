type FeatSystem = {
  actionType: {
    value: string;
  };
  actions: {
    value: string;
  };
  category: string;
  description: {
    value: string;
  };
  frequency: {
    max: number;
    per: string;
  };
  level: {
    value: number;
  };
  prerequisites: {
    value: Array<{ value: string }>;
  };
  publication: {
    license: string;
    remaster: boolean;
    title: string;
  };
};

export type Feat = {
  _id: string;
  name: string;
  system: FeatSystem;
  type: string;
  rules: Array<any>;
  traits: {
    rarity: string;
    value: Array<string>;
  };
};
