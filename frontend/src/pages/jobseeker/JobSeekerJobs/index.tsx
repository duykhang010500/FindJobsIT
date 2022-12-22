import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
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
  Skeleton,
} from '@mui/material';

import { AppState } from '../../../store/reducer';
import { getJobsApplied } from '../../../store/jobs/actions';

import Image from '../../../components/Image';

import BusinessIcon from '@mui/icons-material/Business';
import BadgeStatus from '../../../components/Badge';
import { convertAppliedJobStatusToNum } from '../../../utils/convert';

import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import Nodata from '../../../components/Nodata';

type Props = {};

const JobSeekerJobs = (props: Props) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(0);

  const [rowPerPage, setRowPerPage] = useState<number>(5);

  useEffect(() => {
    dispatch(getJobsApplied());
  }, [dispatch]);

  const { appliedJobs, isFetchingDashboard } = useSelector(
    (state: AppState) => state.jobs
  );

  if (isFetchingDashboard) {
    return (
      <Card sx={{ p: 1 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Job</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Stack spacing={2} mt={2}>
            <Skeleton variant='rounded' width={'100%'} height={60} />
            <Skeleton variant='rounded' width={'100%'} height={60} />
            <Skeleton variant='rounded' width={'100%'} height={60} />
            <Skeleton variant='rounded' width={'100%'} height={60} />
          </Stack>
        </TableContainer>
      </Card>
    );
  }

  if (appliedJobs.length === 0) {
    return (
      <Card sx={{ p: 1 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Nodata />
        </TableContainer>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 1 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job</TableCell>
              <TableCell align='center'>Date applied</TableCell>
              <TableCell align='center'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appliedJobs
              ?.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
              .map((job: any) => {
                return (
                  <TableRow key={job?.id}>
                    <TableCell>
                      <Stack direction='row' spacing={3} alignItems='center'>
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
                              backgroundColor: '#fff',
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
                        <Stack spacing={1}>
                          <Link
                            color='#1890ff'
                            component={RouterLink}
                            to={`/job/${job?.job_id}`}
                            sx={{ fontSize: '18px', fontWeight: 600 }}
                          >
                            {job?.job?.title}
                          </Link>
                          <Link
                            color='#595959'
                            component={RouterLink}
                            to={`/company/${job?.company?.id}`}
                            sx={{ fontSize: '16px', fontWeight: 600 }}
                          >
                            {job?.company?.name}
                          </Link>
                          <Stack
                            alignItems='center'
                            spacing={1}
                            direction='row'
                          >
                            <LocalAtmRoundedIcon sx={{ color: '#52c41a' }} />
                            <Typography typography='body1'>
                              {job?.job?.salary !== 'Negotiate' ? (
                                <>{`${job?.job?.salary_from} - ${job?.job?.salary_to} ${job?.job?.salary}`}</>
                              ) : (
                                <>{job?.job?.salary}</>
                              )}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography fontWeight={600} variant='body2'>
                        {dayjs(job?.date_apply).format('DD/MM/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      {!job?.status || job?.status === 'New' ? (
                        <BadgeStatus status={0}>Pending</BadgeStatus>
                      ) : (
                        <BadgeStatus
                          status={convertAppliedJobStatusToNum(job?.status)}
                        >
                          {job?.status}
                        </BadgeStatus>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={appliedJobs.length}
          rowsPerPage={rowPerPage}
          page={page}
          onPageChange={(_, value: any) => setPage(value)}
          onRowsPerPageChange={(e: any) => {
            setRowPerPage(e.target.value);
          }}
        />
      </TableContainer>
    </Card>
  );
};

export default JobSeekerJobs;
