import { useSkillContext } from '../hooks';

import { ProficiencyRank } from '@pf2-companion/types/character-builder';
import { SkillIdentifier } from '@pf2-companion/types/compendium';
import { useEffect, useMemo } from 'react';

import { SkillSelection } from '@pf2-companion/character-builder/ui';

export const SkillTrainingSelection = ({
  selectionsAvailable,
  setSelectionCompleted,
}: {
  selectionsAvailable: number;
  setSelectionCompleted: (completed: boolean) => void;
}) => {
  const level = 1;

  const [skills, skillReducer] = useSkillContext();

  useEffect(() => console.log(skills), [skills]);

  const selectionsRemaining = useMemo(() => {
    const selectionsCompleted = Object.values(skills)
      .flatMap(({ levelsTrainedAt }) => levelsTrainedAt)
      .filter((levelTrainedAt) => levelTrainedAt === level).length;

    console.log(selectionsCompleted, selectionsAvailable);
    const remaining = selectionsAvailable - selectionsCompleted;
    return remaining < 0 ? 0 : remaining;
  }, [skills, selectionsAvailable]);

  // useEffect(() => {
  //   if (selectionsRemaining === 0) setSelectionCompleted(true);
  //   if (selectionsRemaining > 0) setSelectionCompleted(false);
  // }, [selectionsRemaining, setSelectionCompleted]);

  const handleSkillIncrease = (skill: SkillIdentifier) => {
    if (selectionsRemaining === 1) setSelectionCompleted(true);
    skillReducer({
      type: 'TRAIN',
      target: { level, skill },
    });
  };

  const handleSkillDecrease = (skill: SkillIdentifier) => {
    if (selectionsRemaining === 0) setSelectionCompleted(false);
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
