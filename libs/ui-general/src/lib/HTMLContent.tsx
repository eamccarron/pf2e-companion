import React from 'react';
import { Box, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { sanitize } from 'dompurify';

import type { ReactNode } from 'react';

export const HTMLContent = ({ content }: { content: string }) => {
  let parsedContent: ReactNode = '';
  // TODO: Add sanitization as an interceptor to nest.js server
  const cleanContent = sanitize(content);

  try {
    parsedContent = parse(cleanContent);
  } catch (error) {
    parsedContent = <Typography>{cleanContent}</Typography>;
  }

  return <Box>{parsedContent}</Box>;
};
