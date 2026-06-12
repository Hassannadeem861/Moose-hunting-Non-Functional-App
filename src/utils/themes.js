import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const MyLightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    text: '#000000',
    card: '#FFFFFF',
    border: '#D3D3D3',
    primary: '#FFDF00',
  },
};

export const MyDarkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: '#0a1a0d',
    text: '#FFFFFF',
    card: '#031705',
    border: '#334155',
    primary: '#FFDF00',
  },
};