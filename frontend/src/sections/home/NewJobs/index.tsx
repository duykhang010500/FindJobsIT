import { Box, styled, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import JobList from './JobList';

type Props = {};

const NewJobsWrapper = styled(Box)({
  marginTop: '40px',
  padding: '25px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
});

const NewJobs: React.FC<Props> = () => {
  return (
    <NewJobsWrapper>
      <Stack justifyContent='space-between' direction='row'>
        <Typography
          variant='h4'
          fontWeight={700}
          color='rgb(255,153,0)'
          align='center'
          sx={{
            marginBottom: 3,
            textTransform: 'uppercase',
            display: 'inline-block',
          }}
          component={'span'}
        >
          New Jobs
        </Typography>
        <Link to='/'>See all</Link>
      </Stack>
      <JobList />
    </NewJobsWrapper>
  );
};

export default NewJobs;
