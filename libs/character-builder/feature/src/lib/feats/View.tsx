'use client';

import {
  FeatSelectionPane,
  FeatSelectionContext,
  LevelSelection,
  FeatOptions,
  AncestrySelection,
  AncestrySelectionContext,
} from '@pf2-companion/character-builder/ui';

import { CharacterView as CharacterViewTest } from '../CharacterView';
import { CharacterView } from '@pf2-companion/character-builder/ui';
import { Box, Stack } from '@mui/material';
import { useMemo, useState, useContext, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import type { Selection } from '@pf2-companion/types/ui-selection';
import type {
  BuilderTemplate,
  FeatContent,
  FeatType,
} from '@pf2-companion/types/character-builder';

const featTypes: {
  [k in keyof BuilderTemplate]: FeatType;
} = {
  classFeats: 'class',
  // skillFeats: 'skill',
  ancestryFeats: 'ancestry',
};

export const FeatSelectionView = ({
  featOptions,
}: {
  featOptions: BuilderTemplate;
}) => {
  const searchParams = useSearchParams();
  const level = Number(searchParams.get('level') ?? 1);
  const router = useRouter();
  const pathname = usePathname();

  const [featOptionSelected, setFeatOptionSelected] = useState<Selection<
    keyof BuilderTemplate
  > | null>(null);

  const { selection, updateFeatDispatch } = useContext(FeatSelectionContext);
  const { selection: ancestrySelection } = useContext(AncestrySelectionContext);

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

  const availableFeatOptions = useMemo(
    () =>
      Object.entries(featOptions)
        .filter(([, v]) => v.length > 0)
        .map(([k]: Array<keyof BuilderTemplate>) => k),
    [featOptions]
  );

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

  const handleLevelSelection = (level: number) => {
    router.replace(
      `${pathname}?${new URLSearchParams({
        level: level.toString(),
        className: searchParams.get('className') ?? '',
        ancestryId: searchParams.get('ancestryId') ?? '',
      })}`
    );
  };

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
      <LevelSelection
        selectedLevel={level}
        setSelectedLevel={handleLevelSelection}
      />
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
            featOptions={availableFeatOptions}
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
      <Box mt={2}>
        <CharacterViewTest />
      </Box>
    </Box>
  );
};
