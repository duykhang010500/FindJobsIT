import { Box, styled, Typography, Stack, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import JobList from './JobList';

type Props = {};

const NewJobsWrapper = styled(Box)({
  marginTop: '50px',
});

const NewJobs: React.FC<Props> = () => {
  return (
    <NewJobsWrapper>
      <Stack justifyContent='space-between' direction='row'>
        <Typography
          variant='h2'
          fontWeight={700}
          color='rgb(255,153,0)'
          align='center'
          sx={{
            textTransform: 'uppercase',
            WebkitBackgroundClip: 'text !important',
            WebkitTextFillColor: 'transparent !important',
            background: 'linear-gradient(to right, #009FFF  , #ec2F4B)',
          }}
          component={'span'}
        >
          New Jobs
        </Typography>
        <Link variant='h5' component={RouterLink} to='/'>
          See all
        </Link>
      </Stack>
      <JobList />
    </NewJobsWrapper>
  );
};

export default NewJobs;
