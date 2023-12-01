import type { SkillIdentifier } from '@pf2-companion/types/compendium';
import type { ProficiencyRank } from '.';

export type CharacterSkills = {
  [key in SkillIdentifier]: {
    proficiency: ProficiencyRank;
    levelsTrainedAt: Array<number>;
    /* "Locks" a proficiency so it cannot be untrained below a certain rank.
     * Used for skills that are trained by default from background or class. */
    locked?: ProficiencyRank;
    modifier: number;
  };
};
