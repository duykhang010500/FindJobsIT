import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
} from '@mui/material';

import { AppState } from '../../../store/reducer';
import { getJobsApplied } from '../../../store/jobs/actions';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from '../../../components/Image';

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
            <TableCell>Company</TableCell>
            <TableCell>Applied at</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs?.map((job: any) => {
            return (
              <TableRow key={job?.id}>
                <TableCell>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Image
                      alt='logo'
                      src={job?.company?.logo}
                      sx={{
                        width: 80,
                        height: 80,
                        border: '1px solid #d9d9d9',
                        padding: '4px',
                      }}
                    />
                    <Typography
                      variant='h5'
                      color='#1890ff'
                      component={Link}
                      to={`/job/${job?.job_id}`}
                    >
                      {job?.job?.title}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography>{job?.company?.name}</Typography>
                </TableCell>
                <TableCell>
                  {dayjs(job?.created_at).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>{job?.status || 'Inprogress'}</TableCell>
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
