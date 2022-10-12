import React from 'react';
import { Typography, Breadcrumbs, Link } from '@mui/material';

type Props = {};

const DashboardAdmin = (props: Props) => {
  return (
    <>
      <Typography variant='h3' gutterBottom>
        Dashboard
      </Typography>
      <Breadcrumbs sx={{ mt: 3 }}>
        <Link>Dashboard</Link>
        <Typography>General</Typography>
      </Breadcrumbs>
    </>
  );
};

export default DashboardAdmin;
