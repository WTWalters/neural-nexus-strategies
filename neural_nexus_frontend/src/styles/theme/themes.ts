import { colors, typography, spacing, animation } from "../tokens";

export const lightTheme = {
  colors: {
    ...colors.semantic,
    background: {
      primary: colors.base.navy[50],
      secondary: colors.base.blue[50],
    },
    text: {
      primary: colors.base.navy[900],
      secondary: colors.base.navy[500],
    },
  },
  typography,
  spacing,
  animation,
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...colors.semantic,
    background: {
      primary: colors.base.navy[900],
      secondary: colors.base.navy[800],
    },
    text: {
      primary: colors.base.navy[50],
      secondary: colors.base.navy[100],
    },
  },
};

export type Theme = typeof lightTheme;
