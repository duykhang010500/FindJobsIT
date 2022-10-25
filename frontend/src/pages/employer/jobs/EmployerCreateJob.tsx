import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';

import JobNewForm from '../../../sections/employer-dashboard/jobs/JobNewForm';
import { AppState } from '../../../store/reducer';
import { useDispatch } from 'react-redux';
import { employerGetJobs } from '../../../store/jobs/actions';

type Props = {};

const EmployerCreateJob = (props: Props) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const isEdit = pathname.includes('/edit');

  const { jobs } = useSelector((state: AppState) => state.jobs);

  useEffect(() => {
    dispatch(employerGetJobs());
  }, [id]);

  const job = jobs.find((job: any) => job.id == id);

  return (
    <Box>
      <Typography variant='h2' sx={{ mb: 3 }}>
        {isEdit ? 'Edit job' : 'Create a new job'}
      </Typography>
      <Breadcrumbs separator='/'>
        <Link component={RouterLink} to='/employer/hr/dashboard'>
          Dashboard
        </Link>
        <Link component={RouterLink} to='/employer/hr/jobs/active'>
          Jobs
        </Link>
        <Typography>{isEdit ? 'Edit' : 'Create'}</Typography>
      </Breadcrumbs>
      <JobNewForm job={job} isEdit={true} />
    </Box>
  );
};

export default EmployerCreateJob;
