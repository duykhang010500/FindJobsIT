import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

type Props = {};

const AdminLayout = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100%', overflow: 'hidden' }}>
      <Header />

      <Sidebar />

      <Box
        sx={{
          // mt: 8,
          pt: 10,
          px: 3,
          pb: 3,
          flexGrow: 1,
          overflow: 'auto',
          minHeight: '100vh',
          backgroundColor: 'rgb(227, 242, 253)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
