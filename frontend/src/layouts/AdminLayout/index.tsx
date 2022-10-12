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
      <Box sx={{ mt: 7, p: 7 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
