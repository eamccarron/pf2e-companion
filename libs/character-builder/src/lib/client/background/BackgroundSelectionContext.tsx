import { createSelectionContext } from '@pf2-companion/ui-selection';

import type { BackgroundContent } from './types/BackgroundSelectionContent';
import type { Selection } from '@pf2-companion/ui-selection';

export const BackgroundSelectionContext = createSelectionContext<BackgroundContent>();
