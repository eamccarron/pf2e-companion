import { useSkillContext } from '../hooks';

import { ProficiencyRank } from '@pf2-companion/types/character-builder';
import { SkillIdentifier } from '@pf2-companion/types/compendium';
import { useMemo } from 'react';

import { SkillSelection } from '@pf2-companion/character-builder/ui';

export const SkillTrainingSelection = ({
  selectionsRemaining,
  selectionsAvailable,
}: {
  selectionsRemaining: number;
  selectionsAvailable: number;
}) => {
  const level = 1;

  const [skills, skillReducer] = useSkillContext();

  // const selectionsRemaining = useMemo(() => {
  //   const selectionsCompleted = Object.values(skills)
  //     .flatMap(({ levelsTrainedAt }) => levelsTrainedAt)
  //     .filter((levelTrainedAt) => levelTrainedAt === level).length;

  //   const remaining = selectionsAvailable - selectionsCompleted;
  //   return remaining < 0 ? 0 : remaining;
  // }, [skills, selectionsAvailable]);

  const handleSkillIncrease = (skill: SkillIdentifier) => {
    skillReducer({
      type: 'TRAIN',
      target: { level, skill },
    });
  };

  const handleSkillDecrease = (skill: SkillIdentifier) => {
    skillReducer({
      type: 'UNTRAIN',
      target: { level, skill },
    });
  };

  const isSkillIncreaseAvailable = (skillIdentifier: SkillIdentifier) => {
    if (selectionsRemaining === 0) return false;

    const { proficiency } = skills[skillIdentifier];

    if (proficiency >= ProficiencyRank.TRAINED) return false;

    return true;
  };

  const isSkillDecreaseAvailable = (skillIdentifier: SkillIdentifier) => {
    if (selectionsRemaining === selectionsAvailable) return false;

    const { proficiency, locked } = skills[skillIdentifier];
    if (locked && locked === proficiency) return false;
    if (proficiency !== ProficiencyRank.TRAINED) return false;

    return true;
  };

  return (
    <SkillSelection
      {...{
        skills,
        handleSkillDecrease,
        handleSkillIncrease,
        isSkillDecreaseAvailable,
        isSkillIncreaseAvailable,
      }}
    />
  );
};
