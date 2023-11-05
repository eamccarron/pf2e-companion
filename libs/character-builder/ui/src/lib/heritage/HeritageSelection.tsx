import { Box, Chip } from '@mui/material';
import type { Selection } from '@pf2-companion/ui-selection';

export const HeritageSelection = ({
  content,
}: {
  content: Selection<unknown>[];
}) => {
  return (
    <Box>
      {content.map(({ primary }) => (
        <Chip
          key={primary}
          label={primary}
        />
      ))}
    </Box>
  );
};
