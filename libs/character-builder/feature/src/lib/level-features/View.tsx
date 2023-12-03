'use client';
import { useContext, useEffect, useMemo, useState, useTransition } from 'react';

import { Badge, Box, Collapse, Typography } from '@mui/material';
import { Tabs, Tab } from '@mui/material';

import { FeatSelection } from './FeatSelection';
import { ClassSelectionContext } from '../character-class';

import type { BuilderTemplate } from '@pf2-companion/types/character-builder';
import { CharacterView } from '../CharacterView';
import { LevelSelection } from './LevelSelection';
import { Skills } from './Skills';
import { useSelectionsRequiredContext } from './useSelectionsRequiredContext';
import { useCharacterLevel } from '../hooks';

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
  const [level, setLevel] = useCharacterLevel();

  const [levelTransitionPending, startLevelTransition] = useTransition();

  const {
    skillIncreaseSelectionsRemaining,
    skillTrainingSelectionsRemaining,
    skillTrainingSelectionsAvailable,
    featSelectionsRemaining,
  } = useSelectionsRequiredContext(level, featureOptions);

  const selectionsRemaining = {
    feats: featSelectionsRemaining,
    skillIncrease:
      skillIncreaseSelectionsRemaining + skillTrainingSelectionsRemaining,
  };

  const { selection: classSelection } = useContext(ClassSelectionContext);

  const [featureSelected, setFeatureSelected] =
    useState<keyof BuilderTemplate>();

  const { skillIncreaseLevels } = classSelection.content;

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
  }, [availableFeatureOptions, levelTransitionPending]);

  const handleLevelSelection = (level: number) => {
    startLevelTransition(() => {
      setFeatureSelected(null);
      setLevel(level);
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
                key={key}
                value={key}
                sx={{
                  pt: 4,
                }}
                label={
                  <Badge
                    badgeContent={selectionsRemaining[key]}
                    color="primary"
                  >
                    <Typography sx={{ mr: 2 }}>{featureLabels[key]}</Typography>
                  </Badge>
                }
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
          skillTrainingSelectionsRemaining={skillTrainingSelectionsRemaining}
          level={level}
          skillIncreaseLevels={skillIncreaseLevels}
        />
      )}
    </Box>
  );
};
