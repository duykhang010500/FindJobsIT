import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Stack,
  Table,
  Button,
  Collapse,
  Checkbox,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import JobMoreMenu from '../../../sections/employer-dashboard/jobs/JobMoreMenu';

import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import JobFilter from '../../../sections/employer-dashboard/jobs/JobFilter';
import { employerGetJobs } from '../../../store/jobs/actions';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { getStrFromArr } from '../../../utils/convert';

type Props = {};

const EmployerJobsOpen = (props: Props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const { jobs, isLoading } = useSelector((state: AppState) => state.jobs);

  useEffect(() => {
    dispatch(employerGetJobs());
  }, [dispatch]);

  const handleEdit = (id?: string) => {
    navigate(`/employer/hr/jobs/${id}`);
  };

  const handleDelete = () => {};

  const handleViewApplications = () => {};

  if (isLoading) {
    return null;
  }

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' sx={{ mb: 2 }}>
        <Button
          component={Link}
          to={`/employer/hr/job/create`}
          variant='contained'
          startIcon={<AddIcon />}
        >
          Post a job
        </Button>
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
        <JobFilter />
      </Collapse>
      <TableContainer>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox />
              </TableCell>
              <TableCell>Job title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Application(s)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job: any) => {
              return (
                <TableRow key={job.id}>
                  <TableCell padding='checkbox'>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1}>
                      <Typography variant='h4' sx={{ color: '#40a9ff' }}>
                        {job.title}
                      </Typography>
                      <Stack direction='row' alignItems='center'>
                        <Typography variant='body2'>
                          Work location: &nbsp;
                        </Typography>
                        <Typography variant='body2' fontWeight={500}>
                          {getStrFromArr(job.locations)}
                        </Typography>
                      </Stack>
                      <Stack direction='row' alignItems='center'>
                        <Typography variant='body2'>
                          Industries: &nbsp;
                        </Typography>
                        <Typography variant='body2' fontWeight={500}>
                          {getStrFromArr(job.industries)}
                        </Typography>
                      </Stack>
                      <Stack direction='row' alignItems='center'>
                        <Typography variant='body2'>Salary: &nbsp;</Typography>
                        <Typography variant='body2' fontWeight={500}>
                          Negotiate
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack>
                      <Typography variant='caption'>
                        Created at: {dayjs(job.created_at).format('DD/MM/YYYY')}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align='center'>0</TableCell>
                  <TableCell align='center'>0</TableCell>
                  <TableCell>
                    <JobMoreMenu
                      onEdit={() => handleEdit()}
                      onDelete={() => handleDelete()}
                      onViewApplications={() => handleViewApplications()}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component='div'
        count={10}
        rowsPerPage={10}
        page={0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Box>
  );
};

export default EmployerJobsOpen;
