import { createSelectionContext } from '@pf2-companion/ui-selection';

import type { AncestryContent } from './types/AncestrySelectionContent';
import type { Selection } from '@pf2-companion/ui-selection';

export const AncestrySelectionContext = createSelectionContext<AncestryContent>();
