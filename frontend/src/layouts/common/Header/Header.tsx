import { FC, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Stack,
  Typography,
  Link,
} from '@mui/material';

import HeaderMenu from './HeaderMenu';
import HeaderLangues from './HeaderLangues';

type Props = {};

const Header: FC<Props> = () => {
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  const isTop = 100;

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > isTop) {
        setIsScrollBottom(true);
      } else {
        setIsScrollBottom(false);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [isTop]);

  return (
    <AppBar
      sx={{
        zIndex: 999,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        ...(isScrollBottom && {
          backgroundColor: 'rgba(255,255,255, 0.8) !important',
          color: 'black',
          backdropFilter: 'blur(6px)',
        }),
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: 90,
          transition: 'all ease 0.3s',
          ...(isScrollBottom && {
            height: 60,
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alightItem: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href='/'>
            <Typography color='black' variant='h5'>
              This is Logo
            </Typography>
          </Link>
          <HeaderMenu />
          <Stack direction='row' spacing={2}>
            <HeaderLangues />
            <Button component={RouterLink} to='/sign-up' variant='outlined'>
              Sign Up
            </Button>
            <Button component={RouterLink} to='/login' variant='contained'>
              Log In
            </Button>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
