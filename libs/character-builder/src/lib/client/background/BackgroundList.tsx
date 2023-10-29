import { useContext } from 'react';

import { BackgroundSelectionContext } from './BackgroundSelectionContext';
import { ContentList } from '@pf2-companion/ui-selection';
import type { Selection } from '@pf2-companion/ui-selection';

import type {
  BackgroundSelectionContent,
  BackgroundContent,
} from './types/BackgroundSelectionContent';

export const BackgroundList = ({
  content,
}: {
  content: BackgroundSelectionContent;
}) => {
  const { selection, setSelection } = useContext(BackgroundSelectionContext);

  return (
    <ContentList<BackgroundContent>
      selection={selection}
      setSelection={setSelection}
      content={content}
    />
  );
};
