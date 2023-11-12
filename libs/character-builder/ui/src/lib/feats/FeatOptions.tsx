import { useMemo } from 'react';

import { ContentList } from '@pf2-companion/ui-selection';

import type { Dispatch, SetStateAction } from 'react';
import type { BuilderTemplate } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection/types';

export type FeatOptionsProps = {
  featOptions: Array<keyof BuilderTemplate>;
  selectedOption: Selection<keyof BuilderTemplate>;
  setSelectedOption: Dispatch<
    SetStateAction<Selection<keyof BuilderTemplate> | null>
  >;
};

export const FeatOptions = ({
  featOptions,
  selectedOption,
  setSelectedOption,
}: FeatOptionsProps) => {
  const options: Selection<keyof BuilderTemplate>[] = useMemo(
    () =>
      featOptions.map((option) => ({
        id: option,
        primary: option,
        content: option,
      })),
    [featOptions]
  );

  return (
    <ContentList
      content={options}
      selection={selectedOption}
      setSelection={setSelectedOption}
    />
  );
};
