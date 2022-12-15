import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import {
  Typography,
  Breadcrumbs,
  Link,
  Card,
  TablePagination,
} from '@mui/material';

import { adminGetCandidatesList } from '../../../store/candidates/action';
import AdminCandidateList from '../../../sections/admin-dasboard/candidates-management/AdminCandidateList';

type Props = {};

const AdminCandidatesPage = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminGetCandidatesList());
  }, [dispatch]);

  return (
    <>
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
          <Link component={RouterLink} to={`/admin/candidates/list`}>
            Candidates
          </Link>
          <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
            List
          </Typography>
        </Breadcrumbs>
      </Card>
      <AdminCandidateList />
    </>
  );
};

export default AdminCandidatesPage;
