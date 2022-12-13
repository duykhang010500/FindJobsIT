import { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  Stack,
  Breadcrumbs,
  Typography,
  Link,
  Card,
  Skeleton,
} from '@mui/material';

import JobNewForm from '../../../sections/employer-dashboard/jobs/JobNewForm';

import { AppState } from '../../../store/reducer';
import { adminGetDetailJob, approveJob } from '../../../store/jobs/actions';

type Props = {};

const DetailJob = (props: Props) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(adminGetDetailJob(Number(id)));
  }, [id, dispatch]);

  const { job, isLoadingDetailJob } = useSelector(
    (state: AppState) => state.jobs
  );

  if (isLoadingDetailJob) {
    return null;
  }

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
          <Link component={RouterLink} to={`/admin/jobs/active`}>
            Jobs
          </Link>
          <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
            {job?.title}
          </Typography>
        </Breadcrumbs>
      </Card>
      <Card sx={{ maxWidth: '700px', margin: 'auto', p: 2 }}>
        <JobNewForm job={job} readonly />
        <Stack spacing={2} direction={'row'} sx={{ mt: 3 }}>
          {job?.status === 2 && (
            <>
              <Button
                variant='contained'
                color='success'
                onClick={() => dispatch(approveJob(Number(id), 1))}
              >
                Accept
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={() => dispatch(approveJob(Number(id), 4))}
              >
                Reject
              </Button>
            </>
          )}
          {job?.status === 1 && (
            <Button
              variant='contained'
              color='error'
              onClick={() => dispatch(approveJob(Number(id), 4))}
            >
              Reject
            </Button>
          )}
          {job?.status === 4 && (
            <Button
              variant='contained'
              color='success'
              onClick={() => dispatch(approveJob(Number(id), 1))}
            >
              Accept
            </Button>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default DetailJob;
