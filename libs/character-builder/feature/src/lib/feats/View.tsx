'use client';

import {
  FeatSelectionPane,
  FeatSelectionContext,
  LevelSelection,
  FeatOptions,
  AncestrySelection,
  AncestrySelectionContext,
} from '@pf2-companion/character-builder/ui';
import { Box, Stack } from '@mui/material';
import { useMemo, useState, useContext, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import type { Selection } from '@pf2-companion/types/ui-selection';
import { BuilderTemplate } from '@pf2-companion/types/character-builder';
import { FeatType } from 'libs/character-builder/ui/src/lib/feats/FeatSelectionContext';

const featTypes: {
  [k in keyof BuilderTemplate]: FeatType;
} = {
  classFeats: 'class',
  skillFeats: 'skill',
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

  useEffect(() => console.log('Feat options', featOptions), [featOptions]);

  const [featOptionSelected, setFeatOptionSelected] = useState<Selection<
    keyof BuilderTemplate
  > | null>(null);

  const { selection, updateFeatDispatch } = useContext(FeatSelectionContext);
  const { selection: ancestrySelection } = useContext(AncestrySelectionContext);

  const featType = useMemo(
    () => featTypes[featOptionSelected?.content ?? ''],
    [featOptionSelected]
  );

  const selectionsCompleted = useMemo(() => {
    console.log('updating selections completed: ', selection[level - 1], level);
    return Object.fromEntries(
      Object.entries(selection[level - 1] ?? {}).map(([k, v]) => [
        k,
        Boolean(v),
      ])
    ) as { [k in FeatType]: boolean };
  }, [selection, level]);

  const selectedFeat = useMemo(
    () => (selection ? selection[level - 1][featType] : null),
    [selection, featType, level]
  );

  // Ideal case for the new useEffectEvent hook when it releases
  // For now, this seems like the best way to clear the ancestry feat if (and only if) the ancestry is changed
  useEffect(() => {
    if (
      ancestrySelection &&
      selection[level - 1]?.ancestry?.content?.traits &&
      !selection[level - 1]?.ancestry.content.traits.includes(
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

  useEffect(
    () => console.log('selections completed:', selectionsCompleted),
    [selectionsCompleted]
  );

  useEffect(() => console.log('selection: ', selection), [selection]);

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
            featOptions={
              Object.keys(featOptions) as Array<keyof BuilderTemplate>
            }
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
            options={featOptions[featOptionSelected?.content ?? ''] ?? []}
            level={level}
            featType={featType}
            selectedFeat={selectedFeat}
            handleFeatSelection={handleFeatSelection}
          />
        </Box>
      </Stack>
    </Box>
  );
};
