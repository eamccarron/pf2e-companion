import { useContext, useMemo } from 'react';

import { AncestrySelectionContext } from '../ancestry/AncestrySelectionContext';
import { ClassSelectionContext } from '../class-selection/ClassSelectionContext';

export const useHPContext = () => {
  const { selection: ancestrySelection } = useContext(AncestrySelectionContext);
  const { selection: classSelection } = useContext(ClassSelectionContext);

  const hp = useMemo(
    () =>
      Number(classSelection?.content.hp ?? 0) +
      Number(ancestrySelection?.content.hp ?? 0),
    [classSelection, ancestrySelection]
  );

  return hp;
};
