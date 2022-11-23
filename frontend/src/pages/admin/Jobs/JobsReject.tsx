import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetRejectedJobs());
  }, [dispatch]);

  const { rejectedJobs } = useSelector((state: AppState) => state.jobs);

  return (
    <>
      <Typography variant='h3' mb={3}>
        Rejected Jobs
      </Typography>
      <Breadcrumbs>
        <Typography variant='body1'>Jobs Management</Typography>
        <Link>Rejected</Link>
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

export default JobsReject;
