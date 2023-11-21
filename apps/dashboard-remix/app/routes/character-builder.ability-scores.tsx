import { abiltyScoreSelectionLoader } from '@pf2-companion/character-builder/feature/server';
import { AbilityScoreSelectionPage } from '@pf2-companion/character-builder/feature';

export const loader = abiltyScoreSelectionLoader;
export default function Page() {
  return <AbilityScoreSelectionPage />;
}
