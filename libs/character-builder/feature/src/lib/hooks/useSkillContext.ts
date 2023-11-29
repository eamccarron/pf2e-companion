import { useContext, useMemo } from 'react';

import type { CharacterSkills } from '@pf2-companion/types/character-builder';
import { ProficiencyRank } from '@pf2-companion/types/character-builder';
import type { SkillIdentifier } from '@pf2-companion/types/compendium';
import { BackgroundSelectionContext } from '../background/BackgroundSelectionContext';
import { ClassSelectionContext } from '../character-class/ClassSelectionContext';
import { skillAbilities } from '../skills/skillAbilities';
import { useAbilityScoreContext } from './useAbilityScoreContext';

import { calculateAbilityModifier } from '@pf2-companion/utils';

export const useSkillContext = (): CharacterSkills => {
  const abilityScores = useAbilityScoreContext();
  const { selection: backgroundSelection } = useContext(
    BackgroundSelectionContext
  );
  const { selection: classSelection } = useContext(ClassSelectionContext);

  const trainedSkills = useMemo(() => {
    return Array.from(
      new Set([
        ...(classSelection?.content.trainedSkills.skills ?? []),
        ...(backgroundSelection?.content.trainedSkills.skills ?? []),
      ])
    );
  }, [classSelection, backgroundSelection]);

  const skills = useMemo(() => {
    const result = (Object.keys(skillAbilities) as SkillIdentifier[]).map(
      (skill) => [skill, skillAbilities[skill]]
    );

    return Object.fromEntries(
      result.map(([skill, ability]) => {
        const baseModifier = calculateAbilityModifier(
          abilityScores.find((a) => a.ability === ability)?.abilityScore ?? 0
        );

        // TODO - add support for expert, master, and legendary proficiencies when needed
        const proficiencyRank = trainedSkills.includes(skill as SkillIdentifier)
          ? ProficiencyRank.Trained
          : ProficiencyRank.Untrained;

        // TODO - read level from a context
        const level = 1;
        console.log(skill, proficiencyRank);
        console.log(skill, baseModifier);
        console.log(skill, proficiencyRank === ProficiencyRank.Trained);
        return [
          skill,
          {
            proficiency: proficiencyRank,
            modifier:
              baseModifier +
              (proficiencyRank === ProficiencyRank.Trained ? 2 + level : 0),
          },
        ];
      })
    ) as CharacterSkills;
  }, [abilityScores, trainedSkills]);

  return skills;
};
