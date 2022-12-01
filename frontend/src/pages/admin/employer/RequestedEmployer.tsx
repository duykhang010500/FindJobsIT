import React, { useEffect } from 'react';

import { Box, Link, Card, Typography, Breadcrumbs } from '@mui/material';

import { useDispatch } from 'react-redux';
import { adminGetCompaniesPending } from '../../../store/companies/action';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import CompanyList from './CompanyList';

type Props = {};

const RequestedEmployer = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminGetCompaniesPending());
  }, [dispatch]);

  const { list } = useSelector((state: AppState) => state.companies);

  return (
    <Box>
      <Breadcrumbs>
        <Link href='/admin/dashboard'>Dashboard</Link>
        <Link>Employer</Link>
        <Typography>Requested</Typography>
      </Breadcrumbs>
      <Card sx={{ p: 3, mt: 5 }}>
        <CompanyList companies={list} />
      </Card>
    </Box>
  );
};

export default RequestedEmployer;
