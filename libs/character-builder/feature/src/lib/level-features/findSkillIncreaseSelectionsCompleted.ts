import type { CharacterSkills } from '@pf2-companion/types/character-builder';

export const findSkillIncreaseSelectionsCompleted = (
  skills: CharacterSkills,
  skillIncreaseLevels: Array<number>
) =>
  skillIncreaseLevels.map((level) =>
    Object.values(skills)
      .flatMap(({ levelsTrainedAt }) => levelsTrainedAt)
      .includes(level)
  );
