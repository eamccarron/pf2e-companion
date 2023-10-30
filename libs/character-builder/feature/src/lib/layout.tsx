import { Box } from '@mui/material';

import { Outlet } from '@remix-run/react';

import { CharacterCreationStepper } from './CharacterCreationStepper';
import { CharacterCreationContextProvider } from '@pf2-companion/character-builder-temp';

export const Layout = () => (
  <CharacterCreationContextProvider>
    <Box sx={{ mb: 2 }}>
      <CharacterCreationStepper />
    </Box>
    <Outlet />
  </CharacterCreationContextProvider>
);
