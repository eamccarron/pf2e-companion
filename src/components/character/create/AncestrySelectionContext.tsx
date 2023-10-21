'use client';

import { createSelectionContext } from '@/components/providers/SelectionContextProvider';
import type { Ancestry } from '@/types/Ancestry';

export const AncestrySelectionContext = createSelectionContext<Ancestry>();
