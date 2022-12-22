import React from 'react';

import { Box } from '@mui/material';

import LoginForm from '../../../sections/auth/admin/LoginForm';

type Props = {};

const AdminLogin = (props: Props) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default AdminLogin;
