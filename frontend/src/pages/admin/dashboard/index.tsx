import React from 'react';
import { Typography, Breadcrumbs, Link, Grid } from '@mui/material';
import Statistic from '../../../sections/admin-dasboard/dashboard/Statistic';
import LineChart from '../../../sections/admin-dasboard/dashboard/LineChart';
import PieChart from '../../../sections/admin-dasboard/dashboard/PieChart';

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
      <Statistic />
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={7}>
          <LineChart />
        </Grid>
        <Grid item xs={12} md={5}>
          <PieChart />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardAdmin;
