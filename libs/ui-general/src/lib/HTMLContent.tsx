import React from 'react';
import { Box, Typography, GlobalStyles } from '@mui/material';
import type { Interpolation, Theme } from '@mui/material';
import parse from 'html-react-parser';
import { sanitize } from 'dompurify';

import type { ReactNode } from 'react';

export const HTMLContent = ({
  content,
  styles,
}: {
  content: string;
  styles?: Interpolation<Theme>;
}) => {
  let parsedContent: ReactNode = '';
  // TODO: Add sanitization as an interceptor to nest.js server
  const cleanContent = sanitize(content);

  try {
    parsedContent = parse(cleanContent);
  } catch (error) {
    parsedContent = <Typography>{cleanContent}</Typography>;
  }

  return (
    <Box>
      <GlobalStyles styles={styles} />
      {parsedContent}
    </Box>
  );
};
