'use client';
import { createSelectionContext } from '@pf2-companion/ui-selection';
import type { Character } from '@pf2-companion/types/character-builder';

export const CharacterSelectionContext = createSelectionContext<Character>();
