'use client';

import { FeatSelectionContext } from '.';

import {
  FeatOptions,
  FeatSelectionPane,
} from '@pf2-companion/character-builder/ui';

import { AncestrySelectionContext } from '../ancestry';

import { Box, Stack } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';

import type {
  BuilderTemplate,
  FeatContent,
  FeatType,
} from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/types/ui-selection';

type FeatOptions = BuilderTemplate['feats'];

const featTypes: {
  [k in keyof FeatOptions]: FeatType;
} = {
  classFeats: 'class',
  skillFeats: 'skill',
  ancestryFeats: 'ancestry',
};

const featOptionLabels: {
  [k in keyof FeatOptions]: string;
} = {
  classFeats: 'Class Feat',
  skillFeats: 'Skill Feat',
  ancestryFeats: 'Ancestry Feat',
};

export const FeatSelection = ({
  featOptions,
  level,
}: {
  featOptions: FeatOptions;
  level: number;
}) => {
  const { selection, updateFeatDispatch } = useContext(FeatSelectionContext);
  const { selection: ancestrySelection } = useContext(AncestrySelectionContext);

  const availableFeatOptions = useMemo(
    () =>
      Object.entries(featOptions)
        .filter(([, v]) => v.length > 0)
        .map(([k]) => k as keyof FeatOptions),
    [featOptions]
  );

  const featOptionSelections: Selection<keyof FeatOptions>[] = useMemo(
    () =>
      availableFeatOptions.map((option) => ({
        id: option,
        primary: featOptionLabels[option],
        content: option,
      })),
    [availableFeatOptions]
  );

  const [featOptionSelected, setFeatOptionSelected] = useState<Selection<
    keyof FeatOptions
  > | null>(featOptionSelections[0]);

  const featType: FeatType | null = useMemo(() => {
    const selectedOption = featOptionSelected?.content;
    return selectedOption ? featTypes[selectedOption] : null;
  }, [featOptionSelected]);

  const selectionsCompleted = useMemo(() => {
    return Object.fromEntries(
      Object.entries(selection[level - 1] ?? {}).map(([k, v]) => [
        k,
        Boolean(v),
      ])
    ) as { [k in FeatType]: boolean };
  }, [selection, level]);

  const selectedFeat = useMemo(
    () => (featType && selection ? selection[level - 1][featType] : null),
    [selection, featType, level]
  );

  const selectionOptions = useMemo(() => {
    const selectedOption = featOptionSelected?.content;
    return selectedOption ? featOptions[selectedOption] : [];
  }, [featOptions, featOptionSelected]);

  // Ideal case for the new useEffectEvent hook when it releases
  // For now, this seems like the best way to clear the ancestry feat if (and only if) the ancestry is changed
  useEffect(() => {
    const levelSelection = selection[level - 1] ?? null;
    if (!levelSelection) return;

    if (
      ancestrySelection &&
      selection &&
      levelSelection.ancestry?.content?.traits &&
      !levelSelection.ancestry.content.traits.includes(
        ancestrySelection.primary.toLowerCase()
      )
    ) {
      updateFeatDispatch({
        type: 'RESET',
        target: {
          level,
          featType: 'ancestry',
        },
      });
    }
  }, [ancestrySelection, updateFeatDispatch, level, selection]);

  const handleFeatSelection = (feat: Selection<FeatContent> | null) =>
    feat &&
    featType &&
    updateFeatDispatch({
      type: 'ADD_FEAT',
      target: {
        feat,
        level,
        featType: featType,
      },
    });

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        justifyContent={'space-around'}
        mt={1}
      >
        <Box
          sx={{
            bgcolor: 'surfaceContainerLow.main',
            color: 'onSurface.main',
            borderRadius: '12px',
            width: '20%',
          }}
        >
          <FeatOptions
            featOptions={featOptionSelections}
            selectedOption={featOptionSelected}
            setSelectedOption={setFeatOptionSelected}
            featsSelected={selectionsCompleted}
            featTypes={featTypes}
          />
        </Box>
        <Box
          sx={{
            bgcolor: 'surfaceContainerLow.main',
            color: 'onSurface.main',
            borderRadius: '12px',
            width: '80%',
            padding: 2,
          }}
        >
          <FeatSelectionPane
            options={selectionOptions}
            selectedFeat={selectedFeat}
            handleFeatSelection={handleFeatSelection}
          />
        </Box>
      </Stack>
    </Box>
  );
};
