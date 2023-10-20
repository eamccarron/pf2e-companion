'use client'

import { createSelectionContext } from '@/components/providers/SelectionContextProvider';
import type { Character } from '@/types/Character';

export const CharacterSelectionContext = createSelectionContext<Character>();
