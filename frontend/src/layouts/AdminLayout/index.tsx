import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

type Props = {};

const AdminLayout = (props: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box
        sx={{
          mt: 8,
          p: 3,
          width: 'calc(100% - 300px)',
          // backgroundColor: 'rgb(250, 250, 251)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
