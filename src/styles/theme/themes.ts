import { colors, typography, spacing, animation } from '../tokens'

export const lightTheme = {
  colors,
  typography,
  spacing,
  animation
}

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...colors,
    semantic: {
      primary: 'var(--color-navy-100)',
      secondary: 'var(--color-blue-100)',
      error: 'var(--color-red-100)'
    }
  }
}