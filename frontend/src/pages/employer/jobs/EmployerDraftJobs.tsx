import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Stack,
  Table,
  Button,
  Tooltip,
  Skeleton,
  Collapse,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import JobMoreMenu from '../../../sections/employer-dashboard/jobs/JobMoreMenu';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
import JobFilter from '../../../sections/employer-dashboard/jobs/JobFilter';

import {
  employerDeleteJob,
  employerGetJobs,
  employerUpdateJobStatus,
} from '../../../store/jobs/actions';
import { AppState } from '../../../store/reducer';
import { convertJobStatus, getStrFromArr } from '../../../utils/convert';
import { employerGetOrderedServices } from '../../../store/services/actions';
import BadgeStatus from '../../../components/Badge';

type Props = {};

const EmployerDraftJob = (props: Props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const { jobs, isLoading } = useSelector((state: AppState) => state.jobs);

  const { activeServices } = useSelector((state: AppState) => state.services);

  const canPostJob = activeServices.findIndex((item: any) => item.id === 12);

  useEffect(() => {
    dispatch(employerGetOrderedServices());
    dispatch(employerGetJobs());
  }, [dispatch]);

  const handleEdit = (id?: string) => {
    navigate(`/employer/hr/job/${id}/edit`);
  };

  const handlePost = (jobID: number, status: number) => {
    dispatch(employerUpdateJobStatus(jobID, status));
  };

  const handleDelete = (id: number) => {
    dispatch(employerDeleteJob(id));
  };

  if (isLoading) {
    return (
      <Stack spacing={3}>
        <Skeleton variant='rounded' width={'100%'} height={100} />
        <Skeleton variant='rounded' width={'100%'} height={100} />
        <Skeleton variant='rounded' width={'100%'} height={100} />
        <Skeleton variant='rounded' width={'100%'} height={100} />
      </Stack>
    );
  }

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' sx={{ mb: 2 }}>
        {/* <Button
          variant='contained'
          color='info'
          startIcon={<FilterAltIcon />}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
        </Button> */}
      </Stack>
      <Collapse in={showFilter}>
        <JobFilter />
      </Collapse>
      <TableContainer>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              {/* <TableCell padding='checkbox'>
                <Checkbox />
              </TableCell> */}
              <TableCell>Job title</TableCell>
              <TableCell align='center'>Date create</TableCell>
              <TableCell align='center'>Applied</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs?.map((job: any) => {
              if (job.status === 0) {
                return (
                  <TableRow key={job.id}>
                    {/* <TableCell padding='checkbox'>
                      <Checkbox />
                    </TableCell> */}
                    <TableCell sx={{ width: '40%' }}>
                      <Stack spacing={1}>
                        <Typography variant='h4' sx={{ color: '#faad14' }}>
                          {job.title}
                        </Typography>
                        <Stack direction='row' alignItems='center'>
                          <Typography variant='body2' noWrap>
                            Work location: &nbsp;
                          </Typography>
                          <Typography variant='body2' fontWeight={500} noWrap>
                            {getStrFromArr(job.locations)}
                          </Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center'>
                          <Typography variant='body2' noWrap>
                            Industries: &nbsp;
                          </Typography>
                          <Typography variant='body2' fontWeight={500} noWrap>
                            {getStrFromArr(job.industries)}
                          </Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center'>
                          <Typography variant='body2'>
                            Salary: &nbsp;
                          </Typography>
                          <Typography variant='body2' fontWeight={500}>
                            {job?.salary !== 'Negotiate' ? (
                              <>
                                {job?.salary_from} - {job?.salary_to} &nbsp;
                                {job?.salary}
                              </>
                            ) : (
                              <>Negotiate</>
                            )}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align='center'>
                      <Stack>
                        <Typography variant='h6'>
                          {dayjs(job.created_at).format('DD/MM/YYYY')}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align='center'>{job.applied}</TableCell>
                    <TableCell align='center'>
                      <BadgeStatus status={job.status}>
                        {convertJobStatus(job.status)}
                      </BadgeStatus>
                    </TableCell>
                    <TableCell align='center'>
                      <JobMoreMenu
                        onEdit={() => handleEdit(job.id)}
                        onDelete={() => handleDelete(job.id)}
                        onPost={() => handlePost(job.id, 2)}
                      />
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 40, 60]}
        component='div'
        count={60}
        rowsPerPage={20}
        page={0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Box>
  );
};

export default EmployerDraftJob;
