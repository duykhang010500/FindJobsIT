import React, { FC, Fragment, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Button,
  Stack,
} from '@mui/material';

import { RiMenu3Line } from 'react-icons/ri';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import Logo from '../../../components/Logo';
type Props = {};

const MENU = [
  { title: 'Jobs', icon: <BusinessCenterIcon /> },
  { title: 'Top Company', icon: <ApartmentIcon /> },
  { title: 'Blog', icon: <ArticleIcon /> },
  { title: 'About us', icon: <PeopleIcon /> },
];

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  height: 50,
  textTransform: 'capitalize',
  color: '#595959',
}));

const HeaderMenuMobile: FC<Props> = () => {
  const [open, setOpen] = useState<boolean>(false);

  const ListMenu = () => {
    return (
      <Fragment>
        <Logo isMobile />
        {MENU.map((item) => {
          return (
            <ListItemStyle
              key={item.title}
              sx={{
                '&.active': {
                  color: 'primary.main',
                  fontWeight: 500,
                  backgroundColor: '#fff2e8',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText disableTypography primary={`${item.title}`} />
            </ListItemStyle>
          );
        })}
        <Stack
          spacing={2}
          direction='column'
          sx={{ padding: '0px 15px', marginTop: 10 }}
        >
          <Button
            component={RouterLink}
            to='/sign-up'
            variant='outlined'
            size='large'
          >
            Sign Up
          </Button>
          <Button
            component={RouterLink}
            size='large'
            to='/login'
            variant='contained'
          >
            Log In
          </Button>
          <Button
            component={RouterLink}
            to='/employer'
            variant='contained'
            color='success'
            size='large'
          >
            For employer
          </Button>
        </Stack>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <RiMenu3Line />
      </IconButton>
      <Drawer
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <List disablePadding>
          <ListMenu />
        </List>
      </Drawer>
    </Fragment>
  );
};

export default HeaderMenuMobile;
