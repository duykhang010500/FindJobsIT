import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  Stack,
  Breadcrumbs,
  Typography,
  Link,
  Card,
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
      <Breadcrumbs>
        <Typography>Jobs Management</Typography>
        <Link>{job?.title}</Link>
      </Breadcrumbs>
      <Card sx={{ maxWidth: '700px', margin: 'auto', p: 2, mt: 5 }}>
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
