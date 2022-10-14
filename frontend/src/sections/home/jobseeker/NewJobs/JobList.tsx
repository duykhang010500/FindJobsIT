import React from 'react';
import { Box, styled, Grid, Pagination, Stack } from '@mui/material';

import JobCard from '../../../../components/JobCard';
import { jobsData } from '../../../../mock/jobsData';
type Props = {};

const JobListWrapper = styled(Box)({
  marginTop: 20,
  marginBottom: 20,
});
const JobList = (props: Props) => {
  return (
    <JobListWrapper>
      <Grid container spacing={4}>
        {jobsData.map((job, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <JobCard job={job} />
            </Grid>
          );
        })}
      </Grid>
      <Stack alignItems='center' sx={{ margin: '30px 0px' }}>
        <Pagination count={10} color='primary' />
      </Stack>
    </JobListWrapper>
  );
};

export default JobList;
