'use server';

import { fetchClasses } from '@pf2-companion/character-builder/data-access';
import { ClassSelectionView } from '.';

export const Page = async () => {
  const classDescriptions = await fetchClasses();

  return <ClassSelectionView classDescriptions={classDescriptions} />;
};
