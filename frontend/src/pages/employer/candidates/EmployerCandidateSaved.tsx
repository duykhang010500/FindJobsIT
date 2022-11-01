import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  TablePagination,
  Stack,
  Link,
  IconButton,
  Tooltip,
} from '@mui/material';

import { AppState } from '../../../store/reducer';

import Image from '../../../components/Image';

type Props = {};

const EmployerCandidateSaved = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const handleDelete = (id: any) => {};

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Candidate</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {list?.map((job: any) => {
            return (
              <TableRow>
                <TableCell sx={{ width: '90%' }}>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Image
                      alt='logo'
                      src={job?.company?.logo}
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
                        sx={{ fontSize: '18px', fontWeight: 500 }}
                      >
                        {job?.job?.title}
                      </Link>
                      <Typography typography='h5'>
                        {job?.company?.name}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Tooltip title='Remove' placement='top'>
                    <IconButton onClick={() => handleDelete(job?.id)}>
                      <DeleteIcon sx={{ color: '#ff4d4f' }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })} */}
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

export default EmployerCandidateSaved;
