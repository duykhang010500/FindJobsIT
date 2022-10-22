import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Breadcrumbs, Link, Typography } from '@mui/material';

import WorkIcon from '@mui/icons-material/Work';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import StatisticCard from '../../../sections/jobseeker-dashboard/dashboard/StatisticCard';

type Props = {};

const JobSeekerDashboardPage = (props: Props) => {
  return (
    <>
      <Breadcrumbs>
        <Typography variant='h3' sx={{ mb: 3 }}>
          Dashboard
        </Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
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
            title='Employer views'
            color='#f759ab'
            icon={<RemoveRedEyeIcon />}
            count={1}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JobSeekerDashboardPage;
