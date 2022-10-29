import React from 'react';

import { Grid } from '@mui/material';
import StatisticCard from '../../jobseeker-dashboard/dashboard/StatisticCard';

import WorkIcon from '@mui/icons-material/Work';
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VisibilityIcon from '@mui/icons-material/Visibility';

type Props = {};

const Statistic = (props: Props) => {
  return (
    <Grid container sx={{ mt: 3 }} spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatisticCard
          icon={<WorkIcon />}
          color='#40a9ff'
          count={76}
          title='Total Jos'
          key={1}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatisticCard
          icon={<GroupIcon />}
          color='#ff4d4f'
          count={142}
          title='Total candidates'
          key={1}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatisticCard
          icon={<ApartmentIcon />}
          color='#faad14'
          count={40}
          title='Total Employers'
          key={1}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatisticCard
          icon={<VisibilityIcon />}
          color='#73d13d'
          count={40}
          title='Job Views'
          key={1}
        />
      </Grid>
    </Grid>
  );
};

export default Statistic;
