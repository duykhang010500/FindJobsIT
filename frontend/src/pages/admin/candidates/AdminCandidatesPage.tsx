import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Typography, Breadcrumbs, Link } from '@mui/material';

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
      <Typography variant='h3' gutterBottom>
        Candidates Management
      </Typography>
      <Breadcrumbs sx={{ mt: 3, mb: 5 }}>
        <Link component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Typography> Candidates Management</Typography>
      </Breadcrumbs>
      <AdminCandidateList />
    </>
  );
};

export default AdminCandidatesPage;
