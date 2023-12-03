import { Dispatch, useContext, useEffect, useMemo } from 'react';

import { ProficiencyRank } from '@pf2-companion/types/character-builder';
import { BackgroundSelectionContext } from '../background/BackgroundSelectionContext';
import { ClassSelectionContext } from '../character-class/ClassSelectionContext';
import { SkillProficiencySelectionContext } from '../skills';
import { skillAbilities } from '../skills/skillAbilities';
import { useAbilityScoreContext } from './useAbilityScoreContext';

import { calculateAbilityModifier } from '@pf2-companion/utils';

import type { CharacterSkills } from '@pf2-companion/types/character-builder';
import type { SkillIdentifier } from '@pf2-companion/types/compendium';
import type { SkillAction } from '../skills';
import { useCharacterLevel } from './useCharacterLevel';

export const useSkillContext = (): [CharacterSkills, Dispatch<SkillAction>] => {
  const abilityScores = useAbilityScoreContext();
  const [level] = useCharacterLevel();
  const { selection: backgroundSelection } = useContext(
    BackgroundSelectionContext
  );
  const { selection: classSelection } = useContext(ClassSelectionContext);
  const {
    selection: skillProficiencySelection,
    updateSkillProficiencyDispatch,
  } = useContext(SkillProficiencySelectionContext);

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
        let proficiencyRank: ProficiencyRank =
          skillProficiencySelection[skill].length;

        let locked: ProficiencyRank | undefined;
        if (trainedSkills.includes(skill as SkillIdentifier)) {
          locked = ProficiencyRank.TRAINED;
          proficiencyRank += 1;
        }

        const baseModifier = calculateAbilityModifier(
          abilityScores[ability] ?? 0
        );

        const proficiencyModifier = proficiencyRank * 2 + level;

        return [
          skill,
          {
            proficiency: proficiencyRank,
            modifier: baseModifier + proficiencyModifier,
            levelsTrainedAt: skillProficiencySelection[skill],
            locked,
          },
        ];
      })
    ) as CharacterSkills;
  }, [abilityScores, skillProficiencySelection, trainedSkills, level]);

  return [skills, updateSkillProficiencyDispatch];
};
