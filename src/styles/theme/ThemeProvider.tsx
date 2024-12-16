import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { lightTheme } from './themes'

export const ThemeProvider: React.FC = ({ children }) => {
  return (
    <StyledThemeProvider theme={lightTheme}>
      {children}
    </StyledThemeProvider>
  )
}