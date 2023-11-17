import { useCallback, useMemo } from 'react';

import { ContentList } from '@pf2-companion/ui-selection';

import type { Dispatch, SetStateAction } from 'react';
import type {
  BuilderTemplate,
  FeatContent,
} from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection/types';
import { ListItemIcon, ListItemText } from '@mui/material';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FeatType } from './FeatSelectionContext';

export type FeatOptionsProps = {
  featOptions: Array<keyof BuilderTemplate>;
  selectedOption: Selection<keyof BuilderTemplate>;
  setSelectedOption: Dispatch<
    SetStateAction<Selection<keyof BuilderTemplate> | null>
  >;
  featsSelected: { [K in FeatType]: boolean };
  featTypes: { [K in keyof BuilderTemplate]: FeatType };
};

const featOptionLabels: {
  [k in keyof BuilderTemplate]: string;
} = {
  classFeats: 'Class Feat',
  skillFeats: 'Skill Feat',
  ancestryFeats: 'Ancestry Feat',
};

export const FeatOptions = ({
  featOptions,
  selectedOption,
  setSelectedOption,
  featsSelected,
  featTypes,
}: FeatOptionsProps) => {
  const options: Selection<keyof BuilderTemplate>[] = useMemo(
    () =>
      featOptions.map((option) => ({
        id: option,
        primary: featOptionLabels[option],
        content: option,
      })),
    [featOptions]
  );

  const renderFeatOption = useCallback(
    ({ content }: { content: Selection<keyof BuilderTemplate> }) => {
      const featType = featTypes[content.content];
      return (
        <>
          <ListItemIcon>
            {featsSelected[featType] ? (
              <CheckCircleIcon />
            ) : (
              <RadioButtonUncheckedIcon />
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
      content={options}
      selection={selectedOption}
      setSelection={setSelectedOption}
      renderListItem={renderFeatOption}
    />
  );
};
