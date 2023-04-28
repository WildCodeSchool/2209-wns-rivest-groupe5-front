import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#60e5dc',
      main: '#17b2aa',
      dark: '#00827b',
      contrastText: '#000',
    },
    secondary: {
      light: '#376775',
      main: '#003c49',
      dark: '#001721',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
  },
})
