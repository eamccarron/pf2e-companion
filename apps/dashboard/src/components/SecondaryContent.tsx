import React from 'react';
import { Typography } from '@mui/material';

export type SecondaryContentProps = {
  secondary?: Array<string>;
  secondaryContentLength: number;
};

export const SecondaryContent = ({
  secondary,
  secondaryContentLength,
}: SecondaryContentProps) => {
  return (
    <>
      {/* Pre-render skeleton to avoid hydration errors for variable secondary content lengths */}
      {[...Array(secondaryContentLength)].map((item, i) => (
        <React.Fragment key={i}>
          {`${(secondary ?? [])[i]}`}
          <br />
        </React.Fragment>
      ))}
    </>
  );
};
