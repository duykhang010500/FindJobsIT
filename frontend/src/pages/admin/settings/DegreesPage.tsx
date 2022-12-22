import React from 'react';
import { Typography, Breadcrumbs, Link } from '@mui/material';
import DegreesList from '../../../sections/admin-dasboard/settings/DegreesList';

type Props = {};

const DegreesPage = (props: Props) => {
  return (
    <>
      <Typography variant='h3' gutterBottom>
        Degrees
      </Typography>
      <Breadcrumbs sx={{ mt: 3 }}>
        <Link>Dashboard</Link>
        <Typography>Settings</Typography>
        <Typography>Degrees</Typography>
      </Breadcrumbs>
      <DegreesList />
    </>
  );
};

export default DegreesPage;
