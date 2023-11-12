import { FeatSelectionView } from './View';
import { Loader } from '../../types/Loader';
import { classFeatsLoader as loadFeatOptions } from './loader';

export const FeatSelectionPage = async () => {
  const featOptions = await loadFeatOptions('alchemist', 1);

  console.log(featOptions);
  const { classFeats } = featOptions;

  return (
    <FeatSelectionView
      level={1}
      featOptions={featOptions}
    />
  );
};
