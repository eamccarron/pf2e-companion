import type { ReactElement, PropsWithChildren } from 'react';
import { Fab } from '@mui/material';
import type { IconProps } from '@mui/material';
import Link from 'next/link';

export type FabLinkProps = PropsWithChildren<{
  icon: ReactElement<IconProps>;
  href: string;
}>;

export const FabLink = ({ icon, href }: FabLinkProps) => (
  <Fab
    color="primary"
    aria-label="add"
    LinkComponent={Link}
    href={href}
  >
    {icon}
  </Fab>
);