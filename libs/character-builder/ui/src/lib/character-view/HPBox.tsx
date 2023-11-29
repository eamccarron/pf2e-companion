import { Box, Typography } from '@mui/material';

export const HPBox = ({ hp }: { hp: string | number }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'surfaceVariant.main',
      color: 'onSurfaceVariant.main',
      borderRadius: '8px',
      width: '10%',
      p: 4,
    }}
  >
    <Typography variant="h4">{hp}</Typography>
    <Typography variant="subtitle1">HP</Typography>
  </Box>
);
