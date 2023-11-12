import { Button, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import { useMemo, useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import type { Dispatch } from 'react';

export type LevelSelectionProps = {
  selectedLevel: number | null;
  setSelectedLevel: Dispatch<number | null>;
};

const levels = Array.from({ length: 20 }, (_, i) => i + 1);

export const LevelSelection = ({
  selectedLevel,
  setSelectedLevel,
}: LevelSelectionProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuSelection = (level: number) => {
    setSelectedLevel(level);
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNextLevel = () =>
    selectedLevel !== null && setSelectedLevel(selectedLevel + 1);
  const handlePreviousLevel = () =>
    selectedLevel !== null && setSelectedLevel(selectedLevel - 1);

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent={'space-between'}
    >
      <Stack direction="row">
        <IconButton onClick={handlePreviousLevel}>
          <NavigateBeforeIcon />
        </IconButton>

        <Button
          variant="outlined"
          onClick={handleMenuOpen}
          endIcon={<KeyboardArrowDownIcon />}
          disableElevation
        >
          Level {selectedLevel}
        </Button>

        <IconButton onClick={handleNextLevel}>
          <NavigateNextIcon />
        </IconButton>

        <Menu
          open={menuOpen}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
        >
          {levels.map((level) => (
            <MenuItem
              onClick={() => handleMenuSelection(level)}
              key={level}
            >
              {level}
            </MenuItem>
          ))}
        </Menu>
      </Stack>

      <Button variant="outlined">Add Level</Button>
    </Stack>
  );
};
