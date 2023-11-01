export type BackgroundContent = {
  rarity: string;
  boosts: {
    free: number;
    fixed: string[];
    restricted: Array<string[]>;
  };
};
