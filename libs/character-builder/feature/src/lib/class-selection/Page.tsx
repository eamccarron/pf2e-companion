'use server';
import { loader as fetchClasses } from './loader';
import { ClassSelectionView } from '.';

export const Page = async () => {
  const classDescriptions = await fetchClasses();

  return <ClassSelectionView classDescriptions={classDescriptions} />;
};
