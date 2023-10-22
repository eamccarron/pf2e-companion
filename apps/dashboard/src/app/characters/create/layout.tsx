import { Box } from '@mui/material';

import { CharacterCreationStepper } from '@/components/character/create/CharacterCreationStepper';
import { CharacterCreationContextProvider } from '@/components/character/create/CharacterCreationContextProvider';

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
