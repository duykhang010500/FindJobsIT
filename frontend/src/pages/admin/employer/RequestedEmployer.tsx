import React, { useEffect } from 'react';

import { Breadcrumbs, Typography, Link, Card, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { adminGetCompaniesPending } from '../../../store/companies/action';

type Props = {};

const RequestedEmployer = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminGetCompaniesPending());
  }, [dispatch]);

  return (
    <Box>
      <Breadcrumbs>
        <Link href='/admin/dashboard'>Dashboard</Link>
        <Link>Employer</Link>
        <Typography>Requested</Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default RequestedEmployer;
