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

import BadgeStatus from '../../../components/Badge';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import JobFilter from '../../../sections/employer-dashboard/jobs/JobFilter';
import JobMoreMenu from '../../../sections/employer-dashboard/jobs/JobMoreMenu';

import { AppState } from '../../../store/reducer';
import {
  employerGetJobs,
  employerUpdateJobStatus,
} from '../../../store/jobs/actions';
import { employerGetOrderedServices } from '../../../store/services/actions';

import { convertJobStatus, getStrFromArr } from '../../../utils/convert';
import JobNewForm from '../../../sections/employer-dashboard/jobs/JobNewForm';

type Props = {};

const EmployerJobsOpen = (props: Props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState<boolean>(true);

  const [searchValue, setSearchValue] = useState<string>('');

  const { jobs, isLoading } = useSelector((state: AppState) => state.jobs);

  const { activeServices } = useSelector((state: AppState) => state.services);

  const canPostJob = activeServices.findIndex((item: any) => item.id === 12);

  useEffect(() => {
    dispatch(employerGetJobs());
    dispatch(employerGetOrderedServices());
  }, [dispatch]);

  const handleEdit = (id?: string) => {
    navigate(`/employer/hr/job/${id}/edit`);
  };

  const handleViewApplications = (jobID: number) => {
    navigate(`/employer/hr/candidates/job/${jobID}`);
  };

  const handleClose = (jobID: number, status: number) => {
    dispatch(employerUpdateJobStatus(jobID, status));
  };

  const handleSearch = (e: any) => {
    console.log('Search: ', e.target.value);
    setSearchValue(e.target.value);
  };

  const handleReset = () => {
    setSearchValue('');
  };

  if (isLoading) {
    return (
      <Stack spacing={3}>
        <Skeleton variant='rounded' width={100} height={30} />
        <Skeleton variant='rounded' width={'100%'} height={100} />
        <Skeleton variant='rounded' width={'100%'} height={100} />
        <Skeleton variant='rounded' width={'100%'} height={100} />
        <Skeleton variant='rounded' width={'100%'} height={100} />
      </Stack>
    );
  }

  const filteredJobs = filterJob(jobs, searchValue);

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' sx={{ mb: 2 }}>
        <Tooltip
          placement='top'
          title={canPostJob < 0 ? 'Please buy this service!' : ''}
        >
          <div>
            <Button
              component={Link}
              to={`/employer/hr/job/create`}
              variant='contained'
              startIcon={<AddIcon />}
              disabled={canPostJob < 0}
            >
              Post a job
            </Button>
          </div>
        </Tooltip>
        <Button
          variant='contained'
          color='info'
          startIcon={<FilterAltIcon />}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
        </Button>
      </Stack>
      <Collapse in={showFilter}>
        <JobFilter
          searchValue={searchValue}
          onSearch={(e: any) => handleSearch(e)}
          onReset={handleReset}
        />
      </Collapse>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell padding='checkbox'>
                <Checkbox />
              </TableCell> */}
              <TableCell>Job title</TableCell>
              <TableCell align='center' sx={{ width: '25%' }}>
                Date create
              </TableCell>
              <TableCell align='center'>Expire at</TableCell>
              <TableCell align='center'>Applied</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs?.map((job: any) => {
              if (job.status === 1) {
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
                        <Typography variant='body2'>
                          {dayjs(job.created_at).format('DD/MM/YYYY')}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align='center'>
                      <Stack>
                        <Typography variant='body2'>
                          {dayjs(job.end_date).format('DD/MM/YYYY')}
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
                        status={job.status}
                        onEdit={() => handleEdit(job.id)}
                        onClose={() => handleClose(job.id, 3)}
                        onViewApplications={() =>
                          handleViewApplications(job.id)
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              }
              return <></>;
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

export const filterJob = (jobs: any, str: string) => {
  if (str) {
    jobs = jobs.filter((job: any) =>
      job.title.toLowerCase().includes(str.toLowerCase())
    );
  }
  return jobs;
};

export default EmployerJobsOpen;
