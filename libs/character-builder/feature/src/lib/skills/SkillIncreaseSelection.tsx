import { useEffect, useMemo } from 'react';

import { useSkillContext } from '../hooks';

import { ProficiencyRank } from '@pf2-companion/types/character-builder';
import { SkillIdentifier } from '@pf2-companion/types/compendium';

import { SkillSelection } from '@pf2-companion/character-builder/ui';

export const SkillIncreaseSelection = ({ level }: { level: number }) => {
  const [skills, skillReducer] = useSkillContext();

  useEffect(() => console.log(skills), [skills]);

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

  const skillSelected = useMemo(() => {
    const [selectionName, selectionSkill] =
      Object.entries(skills).find(([skillName, { levelsTrainedAt }]) =>
        levelsTrainedAt.includes(level)
      ) ?? [];

    return { selectionName, selectionSkill };
  }, [level, skills]);

  const selectionCompleted = Boolean(skillSelected.selectionName);

  const isSkillIncreaseAvailable = (skillIdentifier: SkillIdentifier) => {
    console.log(skillSelected);
    console.log(selectionCompleted);
    if (selectionCompleted) return false;

    const { proficiency } = skills[skillIdentifier];

    if (level < 3 && proficiency >= ProficiencyRank.TRAINED) return false;

    if (level < 7 && proficiency >= ProficiencyRank.EXPERT) return false;

    if (level < 14 && proficiency === ProficiencyRank.MASTER) return false;

    if (proficiency === ProficiencyRank.LEGENDARY) return false;

    return true;
  };

  const isSkillDecreaseAvailable = (skillIdentifier: SkillIdentifier) => {
    if (!selectionCompleted) return false;

    const { proficiency, locked } = skills[skillIdentifier];
    if (locked && locked === proficiency) return false;
    if (skillIdentifier !== skillSelected.selectionName) return false;

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
