'use server';
import { FeatureSelection } from './View';
import {
  fetchClassFeats,
  fetchAncestryFeats,
} from '@pf2-companion/character-builder/data-access';

export const FeatSelectionPage = async ({
  searchParams,
}: {
  searchParams: {
    className?: string;
    level?: string;
    ancestryId?: string;
  };
}) => {
  const { className, level, ancestryId } = searchParams;
  const classFeats = await fetchClassFeats(level ?? '1', className ?? '');

  const ancestryFeats = await fetchAncestryFeats(
    level ?? '1',
    className ?? '',
    ancestryId ?? ''
  );

  return (
    <FeatureSelection
      featureOptions={{
        feats: { classFeats, ancestryFeats, skillFeats: [] },
        classFeatures: [],
        abilityIncreases: 0,
      }}
    />
  );
};
