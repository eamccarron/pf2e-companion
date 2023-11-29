import type { SkillIdentifier } from '@pf2-companion/types/compendium';

export enum ProficiencyRank {
  Untrained,
  Trained,
  Expert,
  Master,
  Legendary,
}

export type SkillProficiencies = {
  [key in SkillIdentifier]: ProficiencyRank;
};
