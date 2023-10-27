import type { ReactElement, PropsWithChildren } from 'react';
import { Fab } from '@mui/material';
import type { IconProps } from '@mui/material';
import { Link } from '@remix-run/react';

export type FabLinkProps = PropsWithChildren<{
  icon: ReactElement<IconProps>;
  href: string;
}>;

export const FabLink = ({ icon, href }: FabLinkProps) => (
  <Fab
    color="primary"
    aria-label="add"
    component={Link}
    to={href}
  >
    {icon}
  </Fab>
);
