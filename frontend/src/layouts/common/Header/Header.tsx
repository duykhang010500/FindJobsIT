import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Stack,
  Link,
  useTheme,
} from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';

import Logo from '../../../components/Logo';

import HeaderMenu from './HeaderMenu';
import HeaderLangues from './HeaderLanguages';
import HeaderMenuMobile from './HeaderMenuMobile';

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

type Props = {};

const Header: FC<Props> = () => {
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  const isTop = 50;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { pathname } = useLocation();

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
        ...(pathname !== '/' && {
          borderBottom: '1px solid #f0f0f0',
        }),
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
          ...(pathname === '/'
            ? {
                height: 86,
              }
            : {
                height: 70,
              }),
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
            <Logo />
          </Link>

          {isDesktop ? (
            <>
              <HeaderMenu />
              <Stack direction='row' spacing={2}>
                <HeaderLangues />
                <Button
                  variant='text'
                  component={RouterLink}
                  to={
                    pathname.includes('/employer')
                      ? `/employer/login`
                      : '/login'
                  }
                >
                  Log In
                </Button>
                <Button
                  variant='contained'
                  component={RouterLink}
                  to={
                    pathname.includes('/employer')
                      ? `/employer/register`
                      : '/register'
                  }
                >
                  Sign Up
                </Button>
                <Button
                  variant='contained'
                  component={RouterLink}
                  color='success'
                  to={pathname.includes('/employer') ? `/` : '/employer'}
                  startIcon={
                    pathname.includes('/employer') ? (
                      <BusinessCenterIcon />
                    ) : (
                      <PeopleAltIcon />
                    )
                  }
                >
                  {pathname.includes('/employer')
                    ? `For Job Seekers`
                    : 'For Employer'}
                </Button>
              </Stack>
            </>
          ) : (
            <HeaderMenuMobile />
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
