import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link as RouterLink } from 'react-router-dom';

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
  Dialog,
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
import {
  adminGetDetailJob,
  approveJob,
  getPendingJobs,
} from '../../../store/jobs/actions';
import Image from '../../../components/Image';
import DetailDialog from '../../../sections/admin-dasboard/job-management/DetailDialog';
import { useNavigate } from 'react-router-dom';

type Props = {};

const JobsPending = (props: Props) => {
  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getPendingJobs());
  }, [dispatch]);

  const { pendingJobs } = useSelector((state: AppState) => state.jobs);

  const handleViewDetail = (jobID: number) => {
    // dispatch(adminGetDetailJob(jobID));
    navigate(`/admin/job/${jobID}`);
  };

  return (
    <>
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
          <Link component={RouterLink} to={`/admin/jobs/pending`}>
            Jobs
          </Link>
          <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
            Pending
          </Typography>
        </Breadcrumbs>
      </Card>

      <Card sx={{ p: 3 }}>
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
                        <IconButton onClick={() => handleViewDetail(job.id)}>
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
            rowsPerPageOptions={[10, 20, 40]}
            component='div'
            count={pendingJobs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, value) => setPage(value)}
            onRowsPerPageChange={(e: any) => setRowsPerPage(e.target.value)}
          />
        </TableContainer>
      </Card>
    </>
  );
};

export default JobsPending;
