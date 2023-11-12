'use client';

import {
  FeatSelectionPane,
  FeatSelectionContext,
  LevelSelection,
  FeatOptions,
} from '@pf2-companion/character-builder/ui';
import { Box, Stack } from '@mui/material';
import { useMemo, useState, useContext } from 'react';

import type { Selection } from '@pf2-companion/types/ui-selection';
import { BuilderTemplate } from '@pf2-companion/types/character-builder';

export const FeatSelectionView = ({
  level,
}: {
  level: number;
  featOptions: BuilderTemplate;
}) => {
  // const level = useMemo(
  //   () => Number(searchParams.get('level')),
  //   [searchParams]
  // );

  const [featOptionSelected, setFeatOptionSelected] = useState<Selection<
    keyof BuilderTemplate
  > | null>(null);

  const { selection, updateFeatDispatch } = useContext(FeatSelectionContext);

  const featType = 'class';
  const handleFeatSelection = (feat: Selection<FeatContent> | null) =>
    updateFeatDispatch({
      type: 'ADD_FEAT',
      target: {
        feat,
        level,
        featType,
      },
    });

  return (
    <Box>
      <LevelSelection
        selectedLevel={level}
        setSelectedLevel={handleLevelSelection}
      />
      <Stack
        direction="row"
        spacing={2}
        justifyContent={'space-around'}
      >
        <Box width="15%">
          <FeatOptions
            featOptions={
              Object.keys(featOptions) as Array<keyof BuilderTemplate>
            }
            selectedOption={featOptionSelected}
            setSelectedOption={setFeatOptionSelected}
          />
        </Box>
        <Box
          sx={{
            bgcolor: 'surfaceVariant.main',
            color: 'onSurfaceVariant.main',
            borderRadius: '12px',
            width: '85%',
            padding: 2,
          }}
        >
          <FeatSelectionPane
            options={classFeats}
            level={level}
            featType={featType}
            selection={selection}
            handleFeatSelection={handleFeatSelection}
          />
        </Box>
      </Stack>
    </Box>
  );
};
