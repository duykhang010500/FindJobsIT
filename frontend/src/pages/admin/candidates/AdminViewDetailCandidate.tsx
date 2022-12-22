import React, { useEffect, useState } from 'react';

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

  const [currentCandidate, setCurrentCandidate] = useState<any>(null);

  useEffect(() => {
    dispatch(adminGetCandidatesList());
  }, []);

  const { isLoading, list } = useSelector(
    (state: AppState) => state.candidates
  );

  useEffect(() => {
    const currentCandidate = list?.find(
      (candidate: any) => candidate.id === Number(id)
    );
    setCurrentCandidate(currentCandidate);
  }, [list]);

  console.log('Current candidate: ', currentCandidate);

  const resume = {
    ...currentCandidate?.resume,
    member: { ...currentCandidate },
  };

  console.log('resume: ', resume);

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
      {currentCandidate && (
        <ViewProfile type={resume?.cv_type} resume={resume} />
      )}
    </div>
  );

  return <></>;
};

export default AdminViewDetailCandidate;
