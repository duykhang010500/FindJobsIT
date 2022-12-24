import React from 'react';

import { Grid } from '@mui/material';
import StatisticCard from '../../jobseeker-dashboard/dashboard/StatisticCard';

import WorkIcon from '@mui/icons-material/Work';
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import ArticleIcon from '@mui/icons-material/Article';

type Props = {
  data: any;
};

const Statistic = ({ data }: Props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatisticCard
          icon={<WorkIcon />}
          color='#40a9ff'
          count={data?.totalJobsActive}
          title='Total Active Jobs'
          key={1}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatisticCard
          icon={<GroupIcon />}
          color='#ff4d4f'
          count={data?.totalMembers}
          title='Total Candidates'
          key={1}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatisticCard
          icon={<ArticleIcon />}
          color='#faad14'
          count={data?.totalResumes}
          title='Total Online Resumes'
          key={1}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatisticCard
          icon={<SwitchAccountIcon />}
          color='#73d13d'
          count={data?.totalCandidates}
          title='Total Job Applications'
          key={1}
        />
      </Grid>
    </Grid>
  );
};

export default Statistic;
