import { Box } from '@mui/material';

import {
  CharacterCreationStepper,
  CharacterCreationContextProvider,
} from '@pf2-companion/character-builder';

export default function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CharacterCreationContextProvider>
      <Box sx={{ mb: 2 }}>
        <CharacterCreationStepper />
      </Box>
      {children}
    </CharacterCreationContextProvider>
  );
}
