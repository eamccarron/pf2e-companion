import type { LinksFunction } from '@remix-run/node'; // or cloudflare/deno
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './src/theme';

// export const links: LinksFunction = () => {
//   return [{ rel: 'stylesheet', href: globalStylesheetUrl }];
// };

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />

        <ThemeProvider theme={theme}>
          <Outlet />
        </ThemeProvider>
      </body>
    </html>
  );
}
