'use client';
import { useContext, useEffect, useMemo, useState, useTransition } from 'react';

import { Box, Collapse, Stack } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { Tabs, Tab } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FeatSelection } from './FeatSelection';
import { ClassSelectionContext } from '../character-class';

import type { BuilderTemplate } from '@pf2-companion/types/character-builder';
import { CharacterView } from '../CharacterView';
import { LevelSelection } from './LevelSelection';
import { useAbilityScoreContext } from '../hooks';
import { calculateAbilityModifier } from '@pf2-companion/utils';
import { Skills } from './Skills';
import { set } from 'mongoose';

const featureLabels: {
  [k in keyof BuilderTemplate]: string;
} = {
  feats: 'Feats',
  classFeatures: 'Class Features',
  abilityIncreases: 'Abilities',
  skillIncrease: 'Skills',
};

export const FeatureSelection = ({
  featureOptions,
}: {
  featureOptions: BuilderTemplate;
}) => {
  const searchParams = useSearchParams();
  const level = Number(searchParams.get('level') ?? 1);
  const router = useRouter();
  const pathname = usePathname();

  const [levelTransitionPending, startLevelTransition] = useTransition();

  const [selectionsCompleted, setSelectionsCompleted] = useState<
    Array<keyof BuilderTemplate>
  >([]);

  const { selection: classSelection } = useContext(ClassSelectionContext);
  const abilityScores = useAbilityScoreContext();

  const [featureSelected, setFeatureSelected] =
    useState<keyof BuilderTemplate>();

  const skillTrainingSelectionsAvailable = useMemo(() => {
    return (
      (classSelection.content.trainedSkills.additional ?? 0) +
      calculateAbilityModifier(abilityScores['int'] ?? 0)
    );
  }, [abilityScores, classSelection.content.trainedSkills.additional]);

  const { skillIncreaseLevels } = classSelection.content;

  // const skillIncreaseAvailable = useMemo(
  //   () => skillIncreaseLevels.includes(level),
  //   [skillIncreaseLevels, level]
  // );

  const availableFeatureOptions = useMemo(() => {
    const { feats } = featureOptions;
    const featAvailable = Object.values(feats).some(
      (featOptions) => featOptions.length > 0
    );

    if (featAvailable) {
      return ['feats', 'skillIncrease'];
    } else {
      return ['skillIncrease'];
    }
  }, [featureOptions]);

  useEffect(() => {
    if (!levelTransitionPending) {
      setFeatureSelected(availableFeatureOptions[0] as keyof BuilderTemplate);
    }
  }, [availableFeatureOptions]);

  const handleLevelSelection = (level: number) => {
    startLevelTransition(() => {
      setFeatureSelected(null);
      router.replace(
        `${pathname}?${new URLSearchParams({
          level: level.toString(),
          className: searchParams.get('className') ?? '',
          ancestryId: searchParams.get('ancestryId') ?? '',
        })}`
      );
    });
  };

  const handleFeatureSelectionChange = (
    event: React.ChangeEvent<unknown>,
    newValue: keyof BuilderTemplate
  ) => {
    setFeatureSelected(newValue);
  };

  return (
    <Box>
      <LevelSelection
        selectedLevel={level}
        setSelectedLevel={handleLevelSelection}
        isPending={levelTransitionPending}
      />

      <Box mt={2}>
        <CharacterView />

        <Collapse in={availableFeatureOptions.length > 1}>
          <Tabs
            value={featureSelected ?? false}
            onChange={handleFeatureSelectionChange}
          >
            {availableFeatureOptions.map((key, index) => (
              <Tab
                label={featureLabels[key]}
                value={key}
              />
            ))}
          </Tabs>
        </Collapse>
      </Box>

      {featureSelected === 'feats' && (
        <FeatSelection
          featOptions={featureOptions?.feats}
          level={level}
        />
      )}

      {featureSelected === 'skillIncrease' && (
        <Skills
          skillTrainingSelectionsAvailable={skillTrainingSelectionsAvailable}
          level={level}
          skillIncreaseLevels={skillIncreaseLevels}
        />
      )}
    </Box>
  );
};
