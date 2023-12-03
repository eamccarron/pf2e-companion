import { useContext, useEffect, useMemo } from 'react';
import { ClassSelectionContext } from '../character-class';
import { useAbilityScoreContext, useSkillContext } from '../hooks';

import { calculateAbilityModifier } from '@pf2-companion/utils';
import { findSkillIncreaseSelectionsCompleted } from './findSkillIncreaseSelectionsCompleted';
import { BuilderTemplate } from '@pf2-companion/types/character-builder';
import { FeatSelectionContext } from '.';

export const useSelectionsRequiredContext = (
  level: number,
  featureOptions: BuilderTemplate
) => {
  const { feats: featOptions } = featureOptions;
  const abilityScores = useAbilityScoreContext();
  const [skills] = useSkillContext();

  const { selection: classSelection } = useContext(ClassSelectionContext);
  const { selection: featSelection } = useContext(FeatSelectionContext);
  const { skillIncreaseLevels } = classSelection.content;

  // SKill training
  const skillTrainingSelectionsAvailable = useMemo(() => {
    return (
      (classSelection.content.trainedSkills.additional ?? 0) +
      calculateAbilityModifier(abilityScores['int'] ?? 0)
    );
  }, [abilityScores, classSelection.content.trainedSkills.additional]);

  const skillTrainingSelectionsRemaining = useMemo(() => {
    const selectionsCompleted = Object.values(skills)
      .flatMap(({ levelsTrainedAt }) => levelsTrainedAt)
      .filter((levelTrainedAt) => levelTrainedAt === 1).length;

    const remaining = skillTrainingSelectionsAvailable - selectionsCompleted;
    return remaining < 0 ? 0 : remaining;
  }, [skills, skillTrainingSelectionsAvailable]);

  // SKill increase
  const skillIncreaseSelectionsCompleted = useMemo(
    () =>
      findSkillIncreaseSelectionsCompleted(skills, skillIncreaseLevels).filter(
        (completed: boolean) => completed
      ).length,
    [skills, skillIncreaseLevels]
  );

  const skillIncreaseSelectionsRemaining = useMemo(
    () =>
      skillIncreaseLevels.filter((increaseLevel) => increaseLevel <= level)
        .length - skillIncreaseSelectionsCompleted,
    [skillIncreaseLevels, skillIncreaseSelectionsCompleted, level]
  );

  // Feats
  const featSelections = useMemo(
    () =>
      Object.entries(featOptions)
        .filter(([, v]) => v.length > 0)
        .map(([k]) => k).length,
    [featOptions]
  );

  const featSelectionsCompleted = useMemo(
    () =>
      Object.values(featSelection[level - 1] ?? {})
        .map((v) => Boolean(v))
        .filter((v) => v).length,
    [featSelection, level]
  );

  const featSelectionsRemaining = featSelections - featSelectionsCompleted;

  return {
    skillTrainingSelectionsRemaining,
    skillTrainingSelectionsAvailable,
    skillIncreaseSelectionsRemaining,
    featSelectionsRemaining,
  };
};
