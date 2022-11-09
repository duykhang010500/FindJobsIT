import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Link,
  Table,
  Stack,
  Tooltip,
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

import Image from '../../../components/Image';

import DeleteIcon from '@mui/icons-material/Delete';

import { AppState } from '../../../store/reducer';
import { deleteJobSaved, getJobsSaved } from '../../../store/jobsSaved/action';

type Props = {};

const JobSaved = (props: Props) => {
  const dispatch = useDispatch();

  const { isLoading, list } = useSelector((state: AppState) => state.jobsSaved);

  useEffect(() => {
    dispatch(getJobsSaved());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <Skeleton variant='rounded' width={'100%'} height={60} />
        <Skeleton variant='rounded' width={'100%'} height={60} />
        <Skeleton variant='rounded' width={'100%'} height={60} />
        <Skeleton variant='rounded' width={'100%'} height={60} />
      </Stack>
    );
  }

  const handleDelete = (id: any) => {
    console.log(id);
    dispatch(deleteJobSaved(id));
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Job</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list?.map((job: any) => {
            return (
              <TableRow>
                <TableCell sx={{ width: '90%' }}>
                  <Stack direction='row' spacing={2}>
                    <Image
                      alt='logo'
                      src={job?.job?.company?.logo}
                      sx={{
                        width: 80,
                        height: 80,
                        border: '1px solid #d9d9d9',
                        padding: '4px',
                        borderRadius: '8px',
                      }}
                    />
                    <Stack>
                      <Link
                        color='#1890ff'
                        component={RouterLink}
                        to={`/job/${job?.job_id}`}
                        sx={{ fontSize: '18px', fontWeight: 500, mb: 1 }}
                      >
                        {job?.job?.title}
                      </Link>
                      <Typography typography='h5' gutterBottom>
                        {job?.job?.company?.name}
                      </Typography>
                      <Typography typography='body1'>
                        {job?.job?.salary !== 'Negotiate' ? (
                          <>{`${job?.job?.salary_from} - ${job?.job?.salary_to} ${job?.job?.salary}`}</>
                        ) : (
                          <>{job?.job?.salary}</>
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Tooltip title='Remove' placement='top'>
                    <IconButton onClick={() => handleDelete(job?.job_id)}>
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
        count={10}
        rowsPerPage={10}
        page={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </TableContainer>
  );
};

export default JobSaved;
