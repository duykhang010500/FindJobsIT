import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import JobList from './JobList';

type Props = {};

const NewJobsWrapper = styled(Box)({
  marginTop: '40px',
});

const NewJobs: React.FC<Props> = () => {
  return (
    <NewJobsWrapper>
      <Typography variant='h4' fontWeight={700} gutterBottom align='center'>
        New Jobs
      </Typography>
      <JobList />
    </NewJobsWrapper>
  );
};

export default NewJobs;
