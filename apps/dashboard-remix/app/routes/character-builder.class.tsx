import { ClassSelectionPage } from '@pf2-companion/character-builder/feature';

import { classDescriptionLoader } from '@pf2-companion/character-builder/feature/server';

export const loader = classDescriptionLoader;
export default function Page() {
  return <ClassSelectionPage />;
}
