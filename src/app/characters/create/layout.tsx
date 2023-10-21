import { useState } from 'react';
import { Stepper, Step, Box } from '@mui/material';

import { SelectionContextProvider } from '@/components/providers/SelectionContextProvider';
import { ClassSelectionContext } from '@/components/character/create/ClassSelectionContext';
import { CharacterCreationStepper } from '@/components/character/create/CharacterCreationStepper';
import {
  CharacterCreationContextProvider,
  CharacterCreationContext,
} from '@/components/character/create/CharacterCreationContextProvider';

export default function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CharacterCreationContextProvider>
      <SelectionContextProvider Context={ClassSelectionContext}>
        <Box sx={{ mb: 2 }}>
          <CharacterCreationStepper />
        </Box>
        {children}
      </SelectionContextProvider>
    </CharacterCreationContextProvider>
  );
}
