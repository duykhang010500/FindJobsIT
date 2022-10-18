import React from 'react';
import { Typography, Breadcrumbs, Link } from '@mui/material';
import IndustriesList from '../../../sections/admin-dasboard/settings/IndustriesList';

type Props = {};

const IndustriesPage = (props: Props) => {
  return (
    <>
      <Typography variant='h3' gutterBottom>
        Industries
      </Typography>
      <Breadcrumbs sx={{ mt: 3 }}>
        <Link>Dashboard</Link>
        <Typography>Settings</Typography>
        <Typography>Industries</Typography>
      </Breadcrumbs>
      <IndustriesList />
    </>
  );
};

export default IndustriesPage;
