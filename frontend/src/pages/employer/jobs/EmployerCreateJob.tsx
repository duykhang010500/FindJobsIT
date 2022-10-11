import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';

import JobNewForm from '../../../sections/employer-dashboard/jobs/JobNewForm';

type Props = {};

const EmployerCreateJob = (props: Props) => {
  return (
    <Box>
      <Typography variant='h2' sx={{ mb: 3 }}>
        Create a new job
      </Typography>
      <Breadcrumbs separator='/'>
        <Link component={RouterLink} to='/employer/hr/dashboard'>
          Dashboard
        </Link>
        <Link component={RouterLink} to='/employer/hr/jobs/active'>
          Jobs
        </Link>
        <Typography>Create Job</Typography>
      </Breadcrumbs>
      <JobNewForm />
    </Box>
  );
};

export default EmployerCreateJob;
