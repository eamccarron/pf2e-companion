import { createTheme } from '@mui/material/styles';

const palette = {
  primary: '#885200',
  secondary: '#725a41',
  tertiary: '#56633b',
  error: '#ba1a1a',
  background: '#fffbff',
  outline: '#827568',
  onBackground: '#1f1b16',
  onError: '#ffffff',
  onTertiary: '#ffffff',
  onSecondary: '#ffffff',
  onPrimary: '#ffffff',
  primaryContainer: '#ffddbb',
  secondaryContainer: '#fdddbd',
  tertiaryContainer: '#d9e9b6',
  errorContainer: '#ffdad6',
  surface: '#fffbff',
  surfaceVariant: '#f1dfd0',
  onPrimaryContainer: '#2b1700',
  onSecondaryContainer: '#281805',
  onTertiaryContainer: '#141f01',
  onErrorContainer: '#410002',
  onSurface: '#1f1b16',
  onSurfaceVariant: '#50453a',
};

type M3Palette = typeof palette;

const buildM2Palette = (palette: M3Palette) => Object.fromEntries(Object.entries(palette).map(([key, value]) => ([
  key, {
    main: value,
    // @ts-ignore
    contrastText: palette[`on${key[0].toUpperCase()}${key.slice(1)}`],
  },
])));

export const theme = createTheme({
  palette: buildM2Palette(palette),
})
