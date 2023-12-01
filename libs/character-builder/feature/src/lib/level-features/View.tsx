'use client';

import { Box } from '@mui/material';
import { Tabs, Tab } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FeatSelection } from './FeatSelection';
import { ClassSelectionContext } from '../character-class';

import type { BuilderTemplate } from '@pf2-companion/types/character-builder';
import { CharacterView } from '../CharacterView';
import { LevelSelection } from './LevelSelection';
import { SkillTrainingSelection } from '../skills';
import { useContext, useMemo, useState } from 'react';
import { useAbilityScoreContext } from '../hooks';
import { calculateAbilityModifier } from '@pf2-companion/utils';

const featureLabels: {
  [k in keyof BuilderTemplate]: string;
} = {
  feats: 'Feats',
  classFeatures: 'Class Features',
  abilityIncreases: 'Abilities',
  skillIncreases: 'Skills',
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

  const { selection: classSelection } = useContext(ClassSelectionContext);
  const abilityScores = useAbilityScoreContext();

  const [featureSelected, setFeatureSelected] =
    useState<keyof BuilderTemplate>();

  const handleFeatureSelectionChange = (
    event: React.ChangeEvent<unknown>,
    newValue: keyof BuilderTemplate
  ) => {
    setFeatureSelected(newValue);
  };

  const firstLevelSkillTraining = useMemo(() => {
    if (level !== 1) return 0;

    return (
      (classSelection.content.trainedSkills.additional ?? 0) +
      calculateAbilityModifier(abilityScores['int'] ?? 0)
    );
  }, [level]);

  const availableFeatureOptions = useMemo(
    () =>
      Object.entries({
        ...featureOptions,
        skillIncreases:
          firstLevelSkillTraining + (featureOptions.skillIncreases ?? 0),
      })
        .filter(
          ([, v]) =>
            Boolean(v) &&
            (typeof v === 'object' ? Object.keys(v).length > 0 : true)
        )
        .map(([k]) => k as keyof BuilderTemplate),
    [featureOptions, firstLevelSkillTraining]
  );

  const handleLevelSelection = (level: number) => {
    router.replace(
      `${pathname}?${new URLSearchParams({
        level: level.toString(),
        className: searchParams.get('className') ?? '',
        ancestryId: searchParams.get('ancestryId') ?? '',
      })}`
    );
  };

  return (
    <Box>
      <LevelSelection
        selectedLevel={level}
        setSelectedLevel={handleLevelSelection}
      />

      <Box mt={2}>
        <CharacterView />

        <Tabs
          value={featureSelected}
          onChange={handleFeatureSelectionChange}
        >
          {availableFeatureOptions.map((key, index) => (
            <Tab
              key={key}
              label={featureLabels[key]}
              value={key}
            />
          ))}
        </Tabs>
      </Box>

      {featureSelected === 'feats' && (
        <FeatSelection
          featOptions={featureOptions?.feats}
          level={level}
        />
      )}

      {featureSelected === 'skillIncreases' &&
        (level === 1 ? (
          <SkillTrainingSelection
            selectionsAvailable={firstLevelSkillTraining}
          />
        ) : (
          <></>
        ))}
    </Box>
  );
};
