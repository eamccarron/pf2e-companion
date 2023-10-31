import { createSelectionContext } from '@pf2-companion/ui-selection';

import type { BackgroundContent } from '@pf2-companion/types/character-builder';
import type { Selection } from '@pf2-companion/ui-selection';

export const BackgroundSelectionContext =
  createSelectionContext<BackgroundContent>();
