'use client';

import { createSelectionContext } from '@pf2-companion/ui-selection';
import type { Ancestry } from '@pf2-companion/data-access-compendium/types';

export const AncestrySelectionContext = createSelectionContext<Ancestry>();
