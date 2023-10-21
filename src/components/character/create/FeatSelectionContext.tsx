'use client';

import { createSelectionContext } from '@/components/providers/SelectionContextProvider';
import type { Feat } from '@/types/Feat';

export const FeatSelectionContext = createSelectionContext<Feat>();
