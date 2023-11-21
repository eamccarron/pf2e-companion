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

const paletteAon = {
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

const paletteM3BaselineDark = {
  primary: '#D0BCFF',
  onPrimary: '#381E72',
  primaryContainer: '#4F378B',
  onPrimaryContainer: '#EADDFF',
  secondary: '#CCC2DC',
  onSecondary: '#332D41',
  secondaryContainer: '#4A4458',
  onSecondaryContainer: '#E8DEF8',
  tertiary: '#EFB8C8',
  onTertiary: '#492532',
  tertiaryContainer: '#633B48',
  onTertiaryContainer: '#FFD8E4',
  error: '#F2B8B5',
  errorContainer: '#8C1D18',
  onError: '#601410',
  onErrorContainer: '#F9DEDC',
  background: '#141218',
  onBackground: '#E6E0E9',
  surface: '#141218',
  onSurface: '#E6E0E9',
  surfaceVariant: '#49454F',
  onSurfaceVariant: '#CAC4D0',
  outline: '#938F99',
  inverseOnSurface: '#322F35',
  inverseSurface: '#E6E0E9',
  inversePrimary: '#6750A4',
  shadow: '#000000',
  surfaceTint: '#D0BCFF',
  outlineVariant: '#49454F',
  surfaceContainerHighest: '#36343B',
  surfaceContainerHigh: '#2B2930',
  surfaceContainer: '#211F26',
  surfaceContainerLow: '#1D1B20',
  surfaceContainerLowest: '#0F0D13',
  scrim: '#000000',
};

const paletteM3Baseline = {
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005D',
  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1D192B',
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#31111D',
  error: '#B3261E',
  errorContainer: '#F9DEDC',
  onError: '#FFFFFF',
  onErrorContainer: '#410E0B',
  background: '#FEF7FF',
  onBackground: '#1D1B20',
  surface: '#FEF7FF',
  onSurface: '#1D1B20',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454F',
  outline: '#79747E',
  inverseOnSurface: '#F5EFF7',
  inverseSurface: '#322F35',
  inversePrimary: '#D0BCFF',
  shadow: '#000000',
  surfaceTint: '#6750A4',
  outlineVariant: '#CAC4D0',
  surfaceContainerHighest: '#E6E0E9',
  surfaceContainerHigh: '#ECE6F0',
  surfaceContainer: '#F3EDF7',
  surfaceContainerLow: '#F7F2FA',
  surfaceContainerLowest: '#FFFFFF',
  scrim: '#000000',
};

type M3Palette = typeof paletteM3BaselineDark;

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
  palette: buildM2Palette(paletteM3Baseline),
});