import React, { useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Card, Typography, Breadcrumbs } from '@mui/material';

import { useDispatch } from 'react-redux';
import {
  adminGetCompaniesPending,
  adminGetCompaniesRejected,
} from '../../../store/companies/action';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import CompanyList from './CompanyList';

type Props = {};

const RequestedEmployer = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminGetCompaniesRejected());
  }, [dispatch]);

  const { list } = useSelector((state: AppState) => state.companies);

  return (
    <Box>
      <Card
        sx={{ p: 2, backgroundColor: '#fff', display: 'inline-block', mb: 2 }}
      >
        <Breadcrumbs
          sx={{ '&.MuiTypography-root': { fontWeight: 600 } }}
          separator='›'
          aria-label='breadcrumb'
        >
          <Link component={RouterLink} to={`/admin/dashboard`}>
            Dashboard
          </Link>
          <Link component={RouterLink} to={`/admin/employers/rejected`}>
            Employers
          </Link>
          <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
            Rejected
          </Typography>
        </Breadcrumbs>
      </Card>

      <CompanyList companies={list} />
    </Box>
  );
};

export default RequestedEmployer;
