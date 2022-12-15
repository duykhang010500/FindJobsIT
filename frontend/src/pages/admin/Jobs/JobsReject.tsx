import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
import { Visibility } from '@mui/icons-material';

import { AppState } from '../../../store/reducer';
import { approveJob, GetRejectedJobs } from '../../../store/jobs/actions';
import Image from '../../../components/Image';

type Props = {};

const JobsReject = (props: Props) => {
  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetRejectedJobs());
  }, [dispatch]);

  const { rejectedJobs } = useSelector((state: AppState) => state.jobs);

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
          <Link component={RouterLink} to={`/admin/jobs/rejected`}>
            Jobs
          </Link>
          <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
            Rejected
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
              {rejectedJobs?.map((job: any) => (
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
                    <Stack direction='row' spacing={1} justifyContent='center'>
                      <Tooltip placement='top' title='View Detail'>
                        <IconButton
                          onClick={() => navigate(`/admin/job/${job.id}`)}
                        >
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
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 20, 40]}
            component='div'
            count={rejectedJobs.length}
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

export default JobsReject;
