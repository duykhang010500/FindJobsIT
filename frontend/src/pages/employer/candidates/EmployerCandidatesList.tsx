import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Table,
  Stack,
  Avatar,
  TableRow,
  MenuItem,
  TableBody,
  TextField,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import {
  getListCandidatesForEmployer,
  updateStatus,
} from '../../../store/candidates/action';
import { AppState } from '../../../store/reducer';
import StatusBadge from '../../../components/StatusBadge';

type Props = {};

const EmployerCandidatesList = (props: Props) => {
  const dispatch = useDispatch();

  const { isLoading, list } = useSelector(
    (state: AppState) => state.candidates
  );
  useEffect(() => {
    dispatch(getListCandidatesForEmployer());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  const handleUpdateStatus = () => {
    // dispatch(updateStatus());
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Candidates</TableCell>
            <TableCell align='center'>Applied at</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant='body2'>
                        {item.member.fullname}
                      </Typography>
                      <Typography variant='caption'>
                        {item.member.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align='center'>
                  {dayjs(item?.created_at).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  <TextField
                    select
                    label=''
                    size='small'
                    defaultValue={item.status ? item.status : 'New'}
                  >
                    <MenuItem value='New'>New</MenuItem>
                    <MenuItem value='Short listed'>Short listed</MenuItem>
                    <MenuItem value='Interview'>Interview</MenuItem>
                    <MenuItem value='Offered'>Offered</MenuItem>
                    <MenuItem value='Hire'>Hire</MenuItem>
                  </TextField>
                </TableCell>
                <TableCell>
                  <Stack direction='row' spacing={0}>
                    <IconButton>
                      <SaveAsRoundedIcon />
                    </IconButton>
                    <IconButton>
                      <VisibilityIcon
                        onClick={() => {
                          window.open(item?.resume_file, '_blank');
                        }}
                      />
                    </IconButton>
                  </Stack>
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
        rowsPerPage={5}
        page={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </TableContainer>
  );
};

export default EmployerCandidatesList;
