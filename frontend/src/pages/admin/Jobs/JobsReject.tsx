import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  Avatar,
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
  InputAdornment,
  TextField,
  Skeleton,
} from '@mui/material';

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { Visibility } from '@mui/icons-material';

import { AppState } from '../../../store/reducer';
import { approveJob, GetRejectedJobs } from '../../../store/jobs/actions';
import Image from '../../../components/Image';
import Nodata from '../../../components/Nodata';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { filterJobs } from './JobsActive';
import { TabPanel } from '@mui/lab';

type Props = {};

const JobsReject = (props: Props) => {
  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    dispatch(GetRejectedJobs());
  }, [dispatch]);

  const { isLoading, rejectedJobs } = useSelector(
    (state: AppState) => state.jobs
  );

  const filteredRejectedJobs = filterJobs(rejectedJobs, keyword);

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
        <Stack
          direction='row'
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={3}
        >
          <TextField
            value={keyword}
            placeholder='Search jobs...'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e: any) => setKeyword(e.target.value)}
          />
          {/* <Button variant='contained'>
            <CSVLink
              data={exportData}
              style={{ textDecoration: 'unset', color: 'inherit' }}
            >
              Export
            </CSVLink>
          </Button> */}
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '10%' }} align='center'>
                  Logo
                </TableCell>
                <TableCell sx={{ width: '40%' }}>Job title</TableCell>
                {/* <TableCell>Created at</TableCell> */}
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell colSpan={4}>
                      <Skeleton />
                    </TableCell>
                  </TableRow> */}
                </>
              )}
              {!isLoading && filteredRejectedJobs?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Nodata />
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                filteredRejectedJobs?.map((job: any) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <Avatar
                        alt={'Company logo'}
                        src={job?.company?.logo}
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: 1,
                          '& > img': {
                            objectFit: 'unset',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant='h4' gutterBottom>
                        {job.title}
                      </Typography>
                      <Typography variant='body1'>
                        {job.company.name}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>
                      <Typography>
                        {dayjs(job.created_at).format('DD/MM/YYYY')}
                      </Typography>
                    </TableCell> */}
                    <TableCell align='center'>
                      <Stack
                        direction='row'
                        spacing={1}
                        justifyContent='center'
                      >
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
            count={filteredRejectedJobs.length}
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
