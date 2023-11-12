import { ThemeRegistry } from './ThemeRegistry';
import type { NavigationEntry } from '@pf2-companion/ui-general';
import PersonIcon from '@mui/icons-material/Person';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PetsIcon from '@mui/icons-material/Pets';
import { ExpandableNavigationRail } from '@pf2-companion/ui-general';
import NextLink from 'next/link';

let revalidation: number | undefined;
if (process.env.NODE_ENV === 'development') {
  revalidation = 1;
}

export const revalidate = revalidation;

const navigationEntries: Array<NavigationEntry> = [
  { text: 'Characters', icon: <PersonIcon />, href: '/characters' },
  { text: 'Campaigns', icon: <AutoStoriesIcon />, href: '/campaigns' },
  { text: 'Creatures', icon: <PetsIcon />, href: '/creatures' },
];

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <ExpandableNavigationRail
            navigationEntries={navigationEntries}
            LinkComponent={NextLink}
            appTitle="PF2 Companion"
          >
            {children}
          </ExpandableNavigationRail>
        </ThemeRegistry>
      </body>
    </html>
  );
}
