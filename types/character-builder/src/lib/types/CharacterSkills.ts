import type { SkillIdentifier } from '@pf2-companion/types/compendium';
import type { ProficiencyRank } from '.';

export type CharacterSkills = {
  [key in SkillIdentifier]: {
    proficiency: ProficiencyRank;
    modifier: number;
  };
};
