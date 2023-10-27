import { Box } from '@mui/material';

import { Outlet } from '@remix-run/react'

import {
  CharacterCreationStepper,
  CharacterCreationContextProvider,
} from '@pf2-companion/character-builder';

export default function CharacterLayout() {
  return (
    <CharacterCreationContextProvider>
      <Box sx={{ mb: 2 }}>
        <CharacterCreationStepper />
      </Box>
      <Outlet/>
    </CharacterCreationContextProvider>
  );
}
