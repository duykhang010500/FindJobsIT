import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  Link,
  Table,
  Stack,
  Tooltip,
  Avatar,
  Skeleton,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';

import Image from '../../../components/Image';

import DeleteIcon from '@mui/icons-material/Delete';

import { AppState } from '../../../store/reducer';
import { deleteJobSaved, getJobsSaved } from '../../../store/jobsSaved/action';
import DeleteDialog from '../../../components/DeleteDialog';
import Nodata from '../../../components/Nodata';

type Props = {};

const JobSaved = (props: Props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);

  const [rowPerPage, setRowPerPage] = useState<number>(5);

  const [selectedJob, setSelectedJob] = useState<any>(null);

  const { isLoading, list } = useSelector((state: AppState) => state.jobsSaved);

  useEffect(() => {
    dispatch(getJobsSaved());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteJobSaved(selectedJob?.id));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  if (isLoading) {
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

  if (list.length === 0) {
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
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              ?.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
              .map((job: any, idx: number) => {
                return (
                  <TableRow key={idx}>
                    <TableCell sx={{ width: '90%' }}>
                      <Stack direction='row' spacing={2} alignItems='center'>
                        <Avatar
                          alt='logo'
                          src={job?.job?.company?.logo}
                          variant='rounded'
                          sx={{
                            width: 80,
                            height: 80,
                          }}
                        />
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
                            color='#434343'
                            component={RouterLink}
                            to={`/job/${job?.job?.company?.id}`}
                            sx={{ fontSize: '16px', fontWeight: 600 }}
                          >
                            {job?.job?.company?.name}
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
                      <Tooltip title='Remove' placement='top'>
                        <IconButton
                          onClick={() => {
                            setSelectedJob(job?.job);
                            setOpen(true);
                          }}
                        >
                          <DeleteIcon sx={{ color: '#ff4d4f' }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={list.length}
          rowsPerPage={rowPerPage}
          page={page}
          onPageChange={(_, value: any) => setPage(value)}
          onRowsPerPageChange={(e: any) => setRowPerPage(e.target.value)}
        />
      </TableContainer>
      <DeleteDialog
        isOpen={open}
        content={`Are you sure remove "${selectedJob?.title}" from the list?`}
        onCancel={handleCancel}
        onDoAction={handleDelete}
      />
    </Card>
  );
};

export default JobSaved;
