import React from 'react';
import { Box } from '@mui/material';

export type SecondaryContentProps = {
  secondary?: Array<string>;
  secondaryContentLength: number;
};

export const SecondaryContent = ({
  secondary,
  secondaryContentLength,
}: SecondaryContentProps) => {
  const mapContentToLine = (content: string, index: number) => (
    <Box key={index}>{`${(secondary ?? [])[index]}`}</Box>
  );

  return <Box>{secondary?.map(mapContentToLine)}</Box>;
};
