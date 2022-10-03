import { createTheme } from '@mui/material';

const LightTheme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 500,
      color: '#212B36',
      fontSize: '0.75rem',
    },
    h5: {
      fontSize: '0.875rem',
      color: '#212B36',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      color: '#212B36',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      color: '#212B36',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      color: '#212B36',
      fontWeight: 700,
    },
    h1: {
      fontSize: '2.125rem',
      color: '#212B36',
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#212B36',
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: '#212B36',
    },
    caption: {
      fontSize: '0.75rem',
      color: '#212B36',
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334em',
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: '#212B36',
    },
    button: {
      textTransform: 'capitalize',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#FA541C',
    },
    success: {
      main: '#00AB55',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiLink: {
      defaultProps: {
        color: 'black',
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          WebkitTapHighlightColor: 'transparent',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
          borderRadius: 8,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: 10,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default LightTheme;
