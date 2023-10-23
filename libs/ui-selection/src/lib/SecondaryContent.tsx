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
  const mapContentToLine = (index: number) => (
    <Box key={index}>{`${(secondary ?? [])[index]}`}</Box>
  );
  return (
    <>
      {/* Pre-render skeleton to avoid hydration errors for variable secondary content lengths */}
      {[...Array(secondaryContentLength)].map((item, i) =>
        mapContentToLine(i)
      )}
    </>
  );
};
