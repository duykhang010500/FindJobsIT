import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Table,
  Stack,
  Avatar,
  Button,
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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  FormHelperText,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
  employerSendMail,
  getListCandidatesForEmployer,
  updateStatus,
} from '../../../store/candidates/action';

import { AppState } from '../../../store/reducer';
import { TrySharp } from '@mui/icons-material';
import { employerGetOrderedServices } from '../../../store/services/actions';
import Editor from '../../../components/Editor';

type Props = {};

const EmployerCandidatesList = (props: Props) => {
  const [openDialogMail, setOpenDialogMail] = useState<boolean>(false);

  const [selectedCandidate, setSelectedCandidate] = useState<null | any>(null);

  const { activeServices } = useSelector((state: AppState) => state.services);

  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const canSendMail = activeServices.findIndex((item: any) => item.id === 14);

  const validate = yup.object({
    title: yup
      .string()
      .max(40, 'Title allow maximum 40 character')
      .required('Title is required'),
    content: yup
      .string()
      .max(200, 'Content allow maximum 200 character')
      .required('Content is required'),
  });

  const defaultValues = {
    title: '',
    content: '',
  };

  const onSubmit = (values: any) => {
    let apply_id = selectedCandidate?.id;
    const formData = {
      ...values,
      apply_id,
      email: selectedCandidate?.member?.email,
    };
    console.log(formData);
    dispatch(employerSendMail(formData));
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(validate),
  });

  const { isLoading, list, isSendMail } = useSelector(
    (state: AppState) => state.candidates
  );

  useEffect(() => {
    dispatch(employerGetOrderedServices());
    dispatch(getListCandidatesForEmployer());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  const handleUpdateStatus = (id: any, status: any) => {
    dispatch(updateStatus(id, { status }));
  };

  return (
    <>
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
                  <TableCell sx={{ width: '40%' }}>
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
                      <Tooltip
                        placement='top'
                        title={
                          canSendMail < 0
                            ? 'Please buy this service!'
                            : 'Send mail'
                        }
                      >
                        <div>
                          <IconButton
                            disabled={canSendMail < 0}
                            onClick={() => {
                              setSelectedCandidate(item);
                              console.log(item);
                              setOpenDialogMail(true);
                            }}
                          >
                            <EmailIcon />
                          </IconButton>
                        </div>
                      </Tooltip>
                      <Tooltip placement='top' title='View detail'>
                        <IconButton
                          onClick={() =>
                            navigate(`/employer/hr/candidates/${item.id}`)
                          }
                        >
                          <VisibilityIcon />
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
      <Dialog
        open={openDialogMail}
        onClose={() => {
          setOpenDialogMail(false);
          reset();
        }}
      >
        <DialogTitle>
          <Typography variant='h4' component='span'>
            Send mail
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ width: '500px', padding: '20px !important' }}>
            <Stack spacing={3}>
              <TextField
                disabled
                size='small'
                label='Receiver *'
                value={selectedCandidate?.member?.fullname}
              />
              <TextField
                disabled
                size='small'
                label='Email *'
                value={selectedCandidate?.member?.email}
              />
              <Controller
                control={control}
                name='title'
                render={({ field, fieldState: { error } }) => {
                  return (
                    <TextField
                      {...field}
                      label='Title *'
                      error={!!error}
                      helperText={error?.message}
                    />
                  );
                }}
              />
              <div>
                <FormHelperText sx={{ mb: 1 }}>
                  <Typography variant='caption'>Content *</Typography>
                </FormHelperText>
                <Controller
                  control={control}
                  name='content'
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <Editor
                        id='content'
                        error={!!error}
                        value={field.value}
                        onChange={field.onChange}
                        helperText={error?.message}
                      />
                    );
                  }}
                />
              </div>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              onClick={() => {
                setOpenDialogMail(false);
                reset();
              }}
            >
              Close
            </Button>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={isSendMail}
            >
              Send
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EmployerCandidatesList;
