import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  Link,
  Table,
  Stack,
  Tooltip,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  IconButton,
  Breadcrumbs,
  TableContainer,
  TablePagination,
} from '@mui/material';

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { Visibility } from '@mui/icons-material';

import { AppState } from '../../../store/reducer';
import { approveJob, getPendingJobs } from '../../../store/jobs/actions';
import Image from '../../../components/Image';

type Props = {};

const JobsPending = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingJobs());
  }, [dispatch]);

  const { pendingJobs } = useSelector((state: AppState) => state.jobs);

  return (
    <>
      <Typography variant='h3' mb={3}>
        Pending Jobs
      </Typography>
      <Breadcrumbs>
        <Typography>Jobs Management</Typography>
        <Link>Pending</Link>
      </Breadcrumbs>

      <Card sx={{ mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '10%' }} align='center'>
                  Logo
                </TableCell>
                <TableCell sx={{ width: '40%' }}>Job title</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingJobs?.map((job: any) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <Image
                      alt={'Company logo'}
                      src={job.company.logo}
                      sx={{ width: 70, height: 70, borderRadius: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant='h4' gutterBottom>
                      {job.title}
                    </Typography>
                    <Typography variant='body1'>{job.company.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {dayjs(job.created_at).format('DD/MM/YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack
                      direction='row'
                      spacing={0.5}
                      justifyContent='center'
                    >
                      <Tooltip placement='top' title='View Detail'>
                        <IconButton>
                          <Visibility sx={{ color: '#4096ff' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement='top' title='Accept'>
                        <IconButton
                          color='success'
                          onClick={() =>
                            dispatch(approveJob(Number(job.id), 1))
                          }
                        >
                          <CheckCircleOutlineRoundedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement='top' title='Reject'>
                        <IconButton
                          color='error'
                          onClick={() =>
                            dispatch(approveJob(Number(job.id), 4))
                          }
                        >
                          <HighlightOffRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[20, 40, 60]}
            component='div'
            count={60}
            rowsPerPage={20}
            page={0}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
        </TableContainer>
      </Card>
    </>
  );
};

export default JobsPending;
