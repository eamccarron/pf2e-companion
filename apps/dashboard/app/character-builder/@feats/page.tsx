import { classFeatsLoader } from '@pf2-companion/character-builder/feature/server';
import { FeatSelectionPage } from '@pf2-companion/character-builder/feature';

export default function Page() {
  return <FeatSelectionPage fetchData={classFeatsLoader} />;
}
