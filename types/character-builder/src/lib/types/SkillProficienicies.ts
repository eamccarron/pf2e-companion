import type { SkillIdentifier } from '@pf2-companion/types/compendium';

export enum ProficiencyRank {
  UNTRAINED,
  TRAINED,
  EXPERT,
  MASTER,
  LEGENDARY,
}

// Stores the set of levels at which a skill has been trained
// The proficiency rank and modifier are calculated from this
export type SkillProficiencies = {
  [key in SkillIdentifier]: Array<number>;
};
