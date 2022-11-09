import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  TablePagination,
  Stack,
  Link,
  Avatar,
} from '@mui/material';

import { AppState } from '../../../store/reducer';
import { getJobsApplied } from '../../../store/jobs/actions';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from '../../../components/Image';

import BusinessIcon from '@mui/icons-material/Business';

type Props = {};

const JobSeekerJobs = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobsApplied());
  }, [dispatch]);

  const { jobs, isLoading } = useSelector((state: AppState) => state.jobs);

  if (isLoading) {
    return null;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Job title</TableCell>
            <TableCell>Date applied</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs?.map((job: any) => {
            return (
              <TableRow key={job?.id}>
                <TableCell>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    {job?.company?.logo ? (
                      <Image
                        alt='logo'
                        src={job?.company?.logo}
                        sx={{
                          width: 80,
                          height: 80,
                          border: '1px solid #d9d9d9',
                          padding: '4px',
                          borderRadius: '8px',
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          border: '1px solid #d9d9d9',
                          padding: '4px',
                          borderRadius: '8px',
                        }}
                      >
                        <BusinessIcon />
                      </Avatar>
                    )}
                    <Stack>
                      <Link
                        color='#1890ff'
                        component={RouterLink}
                        to={`/job/${job?.job_id}`}
                        sx={{ fontSize: '18px', fontWeight: 500 }}
                      >
                        {job?.job?.title}
                      </Link>
                      <Typography typography='h5'>
                        {job?.company?.name}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  {dayjs(job?.created_at).format('DD/MM/YYYY h:mm A')}
                </TableCell>
                <TableCell>
                  {!job?.status || job?.status === 'New'
                    ? 'Inprogress'
                    : job?.status}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={10}
        rowsPerPage={10}
        page={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </TableContainer>
  );
};

export default JobSeekerJobs;
