import React, { useEffect } from 'react';

import { Link as RouterLink, useParams } from 'react-router-dom';

import { Card, Breadcrumbs, Typography, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { adminGetCandidatesList } from '../../../store/candidates/action';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import ViewProfile from '../../../components/ViewProfile';

type Props = {};

const AdminViewDetailCandidate = (props: Props) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminGetCandidatesList());
  }, []);

  const { list } = useSelector((state: AppState) => state.candidates);

  const currentCandidate = list.find(
    (candidate: any) => candidate.id === Number(id)
  );

  console.log('Current candidate: ', currentCandidate);

  const resume = {
    ...currentCandidate?.resume,
    member: { ...currentCandidate },
  };

  return (
    <div>
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
            {currentCandidate?.fullname}
          </Typography>
        </Breadcrumbs>
      </Card>
      <ViewProfile type={0} resume={resume} />
    </div>
  );
};

export default AdminViewDetailCandidate;
