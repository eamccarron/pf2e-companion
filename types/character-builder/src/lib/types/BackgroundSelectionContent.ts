import { AbilityBoostOptions } from './AbilityBoostOptions';
import { TrainedSkills } from './TrainedSkills';

export type BackgroundContent = {
  rarity: string;
  boosts: AbilityBoostOptions;
  trainedSkills: TrainedSkills;
};
