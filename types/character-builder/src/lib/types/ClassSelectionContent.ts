import { AbilityBoostOptions } from './AbilityBoostOptions';
import { TrainedSkills } from './TrainedSkills';

export type ClassContent = {
  hp: number;
  boosts: AbilityBoostOptions;
  trainedSkills: TrainedSkills;
};
