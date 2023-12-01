import type { Selection } from '@pf2-companion/ui-selection';
import type { FeatContent } from '@pf2-companion/types/character-builder';
import { useContext, useMemo, useState } from 'react';

import { FeatSelectionContext } from './FeatSelectionContext';
import { AncestrySelectionContext } from '../ancestry';

export const FeatSelections = ({
  featOptions,
  level,
}: {
  featOptions: Selection<FeatContent>[];
  level: number;
}) => {
  const { selection, updateFeatDispatch } = useContext(FeatSelectionContext);
  const { selection: ancestrySelection } = useContext(AncestrySelectionContext);

  const [featureOptionSelected, setFeatureOptionSelected] = useState<Selection<
    keyof BuilderTemplate
  > | null>(null);

  const featureType: FeatureType = useMemo(() => {
    const selectedOption = featureOptionSelected?.content;
    return selectedOption ? featureTypes[selectedOption] : null;
  }, [featureOptionSelected]);

  const selectionsCompleted = useMemo(() => {
    return Object.fromEntries(
      Object.entries(featSelection[level - 1] ?? {}).map(([k, v]) => [
        k,
        Boolean(v),
      ])
    ) as { [k in FeatType]: boolean };
  }, [featSelection, level]);

  const handleFeatSelection = (feat: Selection<FeatContent> | null) =>
    feat &&
    featureType &&
    updateFeatDispatch({
      type: 'ADD_FEAT',
      target: {
        feat,
        level,
        featType: featureType,
      },
    });

  const selectedFeat = useMemo(
    () => (selection ? selection[level - 1][featureType] : null),
    [selection, featureType, level]
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
    const feat = featSelection[level - 1] ?? null;
    if (!feat) return;

    if (
      ancestrySelection &&
      featSelection &&
      feat.ancestry?.content?.traits &&
      !feat.ancestry.content.traits.includes(
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
  }, [ancestrySelection, updateFeatDispatch, level, featSelection]);
};
