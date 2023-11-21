import type { SkillIdentifier } from '@pf2-companion/types/compendium';
import type { ProficiencyRank } from '@pf2-companion/types/character-builder';

export type CharacterSkills = {
  [key in SkillIdentifier]: {
    proficiency: ProficiencyRank;
    modifier: number;
  };
};
