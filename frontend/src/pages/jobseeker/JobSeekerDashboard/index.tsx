import React from 'react';
import { Grid, Breadcrumbs, Typography, Card } from '@mui/material';

import WorkIcon from '@mui/icons-material/Work';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import StatisticCard from '../../../sections/jobseeker-dashboard/dashboard/StatisticCard';
import LineChart from './LineChart';

type Props = {};

const JobSeekerDashboardPage = (props: Props) => {
  return (
    <>
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={12} md={4}>
          <StatisticCard
            title='My Jobs'
            color='rgba(64, 169, 255, 1)'
            icon={<WorkIcon />}
            count={2}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <StatisticCard
            title='Save Jobs'
            color='#faad14'
            icon={<BookmarkIcon />}
            count={0}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <StatisticCard
            title='Views'
            color='#f759ab'
            icon={<RemoveRedEyeIcon />}
            count={1}
          />
        </Grid>
      </Grid>
      <Card>
        <LineChart />
      </Card>
    </>
  );
};

export default JobSeekerDashboardPage;
