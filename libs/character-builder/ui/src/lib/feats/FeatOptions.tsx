import { useCallback, useMemo } from 'react';

import { ContentList } from '@pf2-companion/ui-selection';

import { ListItemIcon, ListItemText } from '@mui/material';
import type { BuilderTemplate } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection/types';
import type { Dispatch, SetStateAction } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import type { FeatType } from '@pf2-companion/types/character-builder';

type FeatOptions = BuilderTemplate['feats'];

export type FeatOptionsProps = {
  featOptions: Selection<keyof FeatOptions>[];
  selectedOption: Selection<keyof FeatOptions> | null;
  setSelectedOption: Dispatch<
    SetStateAction<Selection<keyof FeatOptions> | null>
  >;
  featsSelected: { [K in FeatType]: boolean };
  featTypes: { [K in keyof FeatOptions]: FeatType };
};

export const FeatOptions = ({
  featOptions,
  selectedOption,
  setSelectedOption,
  featsSelected,
  featTypes,
}: FeatOptionsProps) => {
  const renderFeatOption = useCallback(
    ({ content }: { content: Selection<keyof FeatOptions> }) => {
      const featType = featTypes[content.content];
      return (
        <>
          <ListItemIcon>
            {featsSelected[featType] ? (
              <CheckCircleIcon data-cy="feat-selected-icon" />
            ) : (
              <RadioButtonUncheckedIcon data-cy="feat-unselected-icon" />
            )}
          </ListItemIcon>

          <ListItemText primary={content.primary} />
        </>
      );
    },
    [featsSelected]
  );

  return (
    <ContentList
      content={featOptions}
      selection={selectedOption}
      setSelection={setSelectedOption}
      renderListItem={renderFeatOption}
    />
  );
};
