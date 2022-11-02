import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Table,
  Stack,
  Avatar,
  Tooltip,
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

import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
  getListCandidatesForEmployer,
  updateStatus,
} from '../../../store/candidates/action';

import { AppState } from '../../../store/reducer';

type Props = {};

const EmployerCandidatesList = (props: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, list } = useSelector(
    (state: AppState) => state.candidates
  );

  useEffect(() => {
    dispatch(getListCandidatesForEmployer());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  const handleUpdateStatus = (id: any, status: any) => {
    dispatch(updateStatus(id, { status }));
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
                <TableCell sx={{ width: '50%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      variant='square'
                      sx={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '8px',
                      }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography
                        variant='h4'
                        gutterBottom
                        sx={{ color: '#262626', textDecoration: 'none' }}
                        fontWeight={500}
                        component={RouterLink}
                        to={`/employer/hr/candidates/${item.id}`}
                      >
                        {item?.member?.fullname}
                      </Typography>
                      <Typography
                        variant='body2'
                        textTransform='uppercase'
                        // fontWeight={500}
                        sx={{ color: '#595959' }}
                      >
                        {item?.job?.title}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align='center'>
                  {dayjs(item?.created_at).format('DD/MM/YYYY h:mm A')}
                </TableCell>
                <TableCell>
                  <TextField
                    select
                    label=''
                    size='small'
                    defaultValue={item.status ? item.status : 'New'}
                    onChange={(e) =>
                      handleUpdateStatus(item?.id, e.target.value)
                    }
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
                    {/* <IconButton>
                      <EmailIcon />
                    </IconButton> */}
                    <Tooltip placement='top' title='View detail'>
                      <IconButton>
                        <VisibilityIcon
                          onClick={() =>
                            navigate(`/employer/hr/candidates/${item.id}`)
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[20, 40, 60]}
        component='div'
        count={40}
        rowsPerPage={20}
        page={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        sx={{ mt: 2 }}
      />
    </TableContainer>
  );
};

export default EmployerCandidatesList;
