import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Link,
  Table,
  Stack,
  Button,
  Tooltip,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  IconButton,
  Breadcrumbs,
  TableContainer,
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Visibility } from '@mui/icons-material';

import { AppState } from '../../../store/reducer';
import { approveJob, getPendingJobs } from '../../../store/jobs/actions';
import Image from '../../../components/Image';

type Props = {};

const JobsPending = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingJobs());
  }, []);

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

      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '10%' }} align='center'>
                Logo
              </TableCell>
              <TableCell sx={{ width: '40%' }}>Job title</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell align='center'>Actions</TableCell>
              <TableCell sx={{ width: '10%' }}></TableCell>
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
                <TableCell align='center'>
                  <Tooltip placement='top' title='View Detail'>
                    <IconButton>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Stack direction='row' spacing={1}>
                    <Tooltip placement='top' title='Accept'>
                      <IconButton
                        color='success'
                        onClick={() => dispatch(approveJob(Number(job.id), 1))}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement='top' title='Reject'>
                      <IconButton
                        color='error'
                        onClick={() => dispatch(approveJob(Number(job.id), 4))}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default JobsPending;
