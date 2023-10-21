'use client';

import { createSelectionContext } from '@/components/providers/SelectionContextProvider';
import type { ClassDescription } from '@/types/ClassDescription';

export const ClassSelectionContext = createSelectionContext<ClassDescription>();
