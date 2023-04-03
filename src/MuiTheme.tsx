/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import type { PaletteMode, PaletteOptions } from '@mui/material'
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import red from '@mui/material/colors/red'
import { useIsSystemDarkTheme } from 'App/Hook/UseIsSystemDarkTheme'
import React from 'react'

function MuiTheme({ children }: React.PropsWithChildren) {
  const isDarkTheme = useIsSystemDarkTheme()
  const mode: PaletteMode = isDarkTheme ? 'dark' : 'light'
  const palette: PaletteOptions =
    mode === 'light'
      ? {
          mode,
          primary: { main: '#2c5896', light: '#3388ff', dark: '#1f3e69' },
          secondary: { main: '#2cb67d', light: '#3fc68e' },
          error: { main: red['300'], light: '#e45858' },
        }
      : {
          mode,
          primary: { main: '#3388ff', light: '#2c5896', dark: '#2c5896' },
          secondary: { main: '#2cb67d', light: '#3fc68e' },
          error: { main: red['300'], light: '#e45858' },
        }

  const theme = createTheme({
    palette,
    typography: {
      fontFamily: '"Inter var", Inter, Roboto, sans-serif',
    },
    zIndex: {
      appBar: 20,
      drawer: 20,
      modal: 40,
      tooltip: 60,
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          position: 'sticky',
          className: 'shadow-b',
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            zIndex: 50,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          scrollBody: {
            '& .MuiDialog-paper': {
              // Intentional, overlay is chromium specific, and no standard
              overflowY: 'overlay' as unknown as 'hidden',
            },
          },
          scrollPaper: {
            '& .MuiDialogContent-root': {
              // Intentional, overlay is chromium specific, and no standard
              overflowY: 'overlay' as unknown as 'hidden',
            },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          gutterBottom: false,
        },
        styleOverrides: {
          h4: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
          },
        },
      },
      MuiList: {
        defaultProps: {
          dense: true,
        },
      },
      MuiListItem: {
        defaultProps: {
          dense: true,
        },
      },
      MuiListItemButton: {
        defaultProps: {
          dense: true,
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiOutlinedInput: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiButton: {
        defaultProps: {
          type: 'button',
        },
        styleOverrides: {
          root: {
            textTransform: 'inherit',
            borderRadius: '1.5rem',
            padding: '0.5rem 1.5rem',
          },
          contained: {
            ':active': {
              boxShadow: 'none',
            },
            ':hover': {
              boxShadow: 'none',
            },
            boxShadow: 'none',
          },
          sizeSmall: {
            padding: '4px 6px',
          },
        },
      },
      MuiMenuItem: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            alignItems: 'center',
          },
          message: {},
          action: {
            display: 'flex',
            alignItems: 'center',
            paddingTop: 0,
          },
        },
      },
    },
  })

  // return <>{children}</>

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default MuiTheme
