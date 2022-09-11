import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import HeaderMenu from './HeaderMenu';

type Props = {};

const Header = (props: Props) => {
  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        backgroundColor: 'transparent',
        color: 'black',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: 56,
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alightItem: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography color='black' variant='h5'>
            Jobs IT
          </Typography>
          <HeaderMenu />
          <Stack direction='row' spacing={2}>
            <IconButton>
              <img
                src='https://cdn-icons-png.flaticon.com/128/555/555515.png'
                alt=''
                style={{ width: 30, height: 25 }}
              />
            </IconButton>
            <Button component={Link} to='/sign-up' variant='outlined'>
              Sign Up
            </Button>
            <Button component={Link} to='/login' variant='contained'>
              Login
            </Button>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
