import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Viewport Width  (like CSS vw)
export const vw = (percentage) => (width * percentage) / 100;

// Viewport Height (like CSS vh)
export const vh = (percentage) => (height * percentage) / 100;

// Font scaling based on screen width
export const fs = (size) => {
  const baseWidth = 375; // iPhone X base
  return (width / baseWidth) * size;
};

// Spacing utility
export const spacing = {
  xs: vw(2),
  sm: vw(3),
  md: vw(4),
  lg: vw(5),
  xl: vw(6),
};