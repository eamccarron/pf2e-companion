import { CharacterView as Character } from '@pf2-companion/character-builder/ui';

import {
  useAbilityScoreContext,
  useHPContext,
  useSkillContext,
} from '@pf2-companion/character-builder/ui';
import { useEffect } from 'react';

export const CharacterView = () => {
  const abilityScores = useAbilityScoreContext();
  const skills = useSkillContext();

  useEffect(() => console.log(abilityScores), [abilityScores]);
  return (
    <Character
      character={{
        abilityScores: abilityScores,
        characterSkills: skills,
      }}
    />
  );
};
