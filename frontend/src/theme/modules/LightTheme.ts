import { createTheme } from '@mui/material';

const LightTheme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          position: 'relative',
          textDecoration: 'none',
          WebkitTapHighlightColor: 'transparent',
          color: 'black',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            transition: 'width 0.5s ease',
            height: '2px',
            backgroundColor: 'rgb(0, 171, 85)',
          },
          '&:hover': {
            color: 'rgb(0, 171, 85)',
            '&:after': {
              width: '50%',
            },
          },
        },
      },
    },
  },
});

export default LightTheme;
