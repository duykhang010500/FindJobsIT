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
import FlagEN from '../../../assets/images/flag_en.svg';

type Props = {};

const Header = (props: Props) => {
  return (
    <AppBar
      sx={{
        // boxShadow: 'none',
        backgroundColor: 'transparent',
        color: 'black',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
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
              <img src={FlagEN} alt='flag' />
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
