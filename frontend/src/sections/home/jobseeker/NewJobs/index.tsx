import { Box, styled, Typography, Stack, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import JobList from './JobList';

type Props = {};

const NewJobsWrapper = styled(Box)({
  marginTop: '50px',
  backgroundColor: '#fff',
  padding: '30px',
});

const NewJobs: React.FC<Props> = () => {
  return (
    <NewJobsWrapper>
      <Typography
        variant='h2'
        fontWeight={700}
        align='center'
        textTransform='uppercase'
        color='#182642'
      >
        New Jobs
      </Typography>
      {/* <Link variant='h5' component={RouterLink} to='/'>
          See all
        </Link> */}

      <JobList />
    </NewJobsWrapper>
  );
};

export default NewJobs;
