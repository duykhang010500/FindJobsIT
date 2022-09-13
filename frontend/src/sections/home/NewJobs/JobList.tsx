import React from 'react';
import { Box, styled, Grid, Pagination, Stack } from '@mui/material';

import JobCard from './JobCard';
import { jobsData } from '../../../mock/jobsData';
type Props = {};

const JobListWrapper = styled(Box)({
  marginBottom: 20,
});
const JobList = (props: Props) => {
  return (
    <JobListWrapper>
      <Grid container spacing={4}>
        {jobsData.map((job) => {
          return (
            <Grid item xs={12} md={4}>
              <JobCard job={job} />
            </Grid>
          );
        })}
      </Grid>
      <Stack alignItems='center' sx={{ margin: '20px 0px' }}>
        <Pagination count={10} color='primary' />
      </Stack>
    </JobListWrapper>
  );
};

export default JobList;
