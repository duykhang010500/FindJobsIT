import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Stack,
  Avatar,
  Popover,
  Divider,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';

import { AppState } from '../../../store/reducer';
import { logout } from '../../../store/auth/action';

import LogoutIcon from '@mui/icons-material/Logout';

type Props = {};

const HeaderAccount = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { currentUser } = useSelector((state: AppState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        <Avatar
          sx={{
            height: 30,
            width: 30,
          }}
        />
      </IconButton>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorEl={anchorEl}
        sx={{ mt: 2 }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>
          <Stack>
            {/* <Typography variant='subtitle1'>{currentUser?.fullname}</Typography> */}
            <Typography variant='subtitle1'>ADMIN</Typography>
            <Typography variant='caption'>{currentUser?.email}</Typography>
          </Stack>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: '#ff4d4f' }} onClick={() => handleLogout()}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};

export default HeaderAccount;
