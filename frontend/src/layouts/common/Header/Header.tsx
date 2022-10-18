import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Stack,
  Link,
  useTheme,
  Avatar,
  IconButton,
  Popover,
  MenuItem,
  Divider,
  Typography,
} from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';

import Logo from '../../../components/Logo';
import HeaderMenu from './HeaderMenu';
import HeaderLangues from './HeaderLanguages';
import HeaderMenuMobile from './HeaderMenuMobile';
import LogoutIcon from '@mui/icons-material/Logout';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

import { AppState } from '../../../store/reducer';
import { logoutEmployer } from '../../../store/auth/action';

type Props = {};

const Header: FC<Props> = () => {
  const { currentUser } = useSelector((state: AppState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  const isTop = 50;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

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

  const handleLogout = async () => {
    try {
      await dispatch(logoutEmployer());
      navigate('/employer/login', { replace: true });
    } catch (err) {
      throw err;
    }
  };

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
          <Link
            component={RouterLink}
            to={pathname.includes('/employer') ? '/employer' : '/'}
          >
            <Logo />
          </Link>

          {isDesktop ? (
            <>
              <HeaderMenu />
              <Stack direction='row' spacing={2} alignItems='center'>
                <HeaderLangues />
                {currentUser ? (
                  <>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                      <Avatar sx={{ width: 30, height: 30 }} />
                    </IconButton>
                    <Popover
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      sx={{ mt: 2 }}
                    >
                      <MenuItem sx={{ color: '#637381', cursor: 'unset' }}>
                        <Stack>
                          <Typography variant='h4' gutterBottom>
                            {currentUser.info.fullname}
                          </Typography>
                          <Typography variant='caption'>
                            {currentUser.info.email}
                          </Typography>
                        </Stack>
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        sx={{ color: '#637381' }}
                        onClick={() => navigate('/employer/hr/dashboard')}
                      >
                        <ContentPasteSearchIcon sx={{ mr: 3 }} />
                        {`Find candidates`}
                      </MenuItem>
                      <MenuItem
                        sx={{ color: '#637381' }}
                        onClick={() => navigate('/employer/hr/dashboard')}
                      >
                        <BusinessCenterIcon sx={{ mr: 3 }} />
                        {`Management`}
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={handleLogout}
                        sx={{ color: '#ff4d4f' }}
                      >
                        <LogoutIcon sx={{ mr: 3 }} /> Logout
                      </MenuItem>
                    </Popover>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
