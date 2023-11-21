import { createTheme } from '@mui/material/styles';

const paletteOld = {
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

const palette = {
  primary: '#9c413f',
  onPrimary: '#ffffff',
  primaryContainer: '#ffdad7',
  onPrimaryContainer: '#410005',
  secondary: '#775a00',
  onSecondary: '#ffffff',
  secondaryContainer: '#ffdf98',
  onSecondaryContainer: '#251a00',
  tertiary: '#1b6c31',
  onTertiary: '#ffffff',
  tertiaryContainer: '#a3f5aa',
  onTertiaryContainer: '#002108',
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  onErrorContainer: '#410002',
  background: '#f8fdff',
  onBackground: '#001f25',
  surface: '#f8fdff',
  onSurface: '#001f25',
  surfaceVariant: '#f4dddb',
  onSurfaceVariant: '#534342',
  outline: '#857371',
  inverseOnSurface: '#d6f6ff',
  inverseSurface: '#00363f',
  inversePrimary: '#ffb3ae',
  shadow: '#000000',
  surfaceTint: '#9c413f',
  outlineVariant: '#d8c2c0',
  scrim: '#000000',
};

type M3Palette = typeof palette;

const buildM2Palette = (palette: M3Palette) =>
  Object.fromEntries(
    Object.entries(palette).map(([key, value]) => [
      key,
      {
        main: value,
        // @ts-ignore
        contrastText: palette[`on${key[0].toUpperCase()}${key.slice(1)}`],
      },
    ])
  );

export const theme = createTheme({
  palette: buildM2Palette(palette),
});
