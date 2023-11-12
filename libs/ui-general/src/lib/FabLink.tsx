import type { ReactElement, PropsWithChildren } from 'react';
import { Fab } from '@mui/material';
import type { IconProps } from '@mui/material';
import Link from 'next/link';

export type FabLinkProps = PropsWithChildren<{
  icon: ReactElement<IconProps>;
  href: string;
}>;

export const FabLink = ({ icon, href }: FabLinkProps) => (
  <Link
    href={href}
    passHref
  >
    <Fab
      color="primary"
      aria-label="add"
      data-cy="fab-link"
    >
      {icon}
    </Fab>
  </Link>
);
