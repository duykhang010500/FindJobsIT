import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { CSVLink } from 'react-csv';

import {
  Link,
  Table,
  Stack,
  Dialog,
  Button,
  Tooltip,
  MenuItem,
  TableRow,
  TableCell,
  TextField,
  TableBody,
  TableHead,
  IconButton,
  Typography,
  Breadcrumbs,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormHelperText,
  TableContainer,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';

import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  employerGetCandidateByJob,
  employerSendMail,
  updateStatus,
} from '../../../store/candidates/action';

import { AppState } from '../../../store/reducer';

import Editor from '../../../components/Editor';

type Props = {};

const EmployerCandidatesByJob = (props: Props) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [data, setData] = useState<any>([]);

  const [openDialogMail, setOpenDialogMail] = useState<boolean>(false);

  const [selectedCandidate, setSelectedCandidate] = useState<null | any>(null);

  const { activeServices } = useSelector((state: AppState) => state.services);

  const { isLoading, candidates } = useSelector(
    (state: AppState) => state.candidates
  );

  const { isSendMail } = useSelector((state: AppState) => state.candidates);

  const canSendMail = activeServices.findIndex((item: any) => item.id === 14);

  useEffect(() => {
    dispatch(employerGetCandidateByJob(Number(id)));
  }, [dispatch, id]);

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

  // const headers = [
  //   { label: 'First Name', key: 'firstname' },
  //   { label: 'Last Name', key: 'lastname' },
  //   { label: 'Email', key: 'email' },
  // ];

  useEffect(() => {
    setData(formatData(candidates));
  }, [candidates]);

  const formatData = (arr: any) => {
    let newArr: any = [];
    arr?.forEach((item: any, index: number) => {
      newArr.push({
        STT: `${index + 1}`,
        Date_Apply: `${dayjs(item.created_at).format('DD/MM/YYYY')}`,
        Job_Title: `${item.job.title}`,
        Full_Name: `${item.member.fullname}`,
        Email: `${item.member.email}`,
        Phone: `${item.member.phone}`,
        Experience: `${
          item.resume.yearofexperience > 0
            ? item.resume.yearofexperience + ' ' + 'year'
            : 'No experience'
        }`,
        Degree: `${item.resume.degree}`,
      });
    });
    console.log('arr format: ', newArr);

    return newArr;
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(validate),
  });

  const handleUpdateStatus = (id: any, status: any) => {
    dispatch(updateStatus(id, { status }));
  };

  const handleExportCSV = () => {
    console.log('Export!');
  };

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <Breadcrumbs>
        <Link>Dashboard</Link>
        <Typography>
          {(candidates && candidates[0]?.job?.title) || 'Job'}
        </Typography>
        <Typography>Candidates</Typography>
      </Breadcrumbs>

      <Button
        variant='contained'
        startIcon={<UploadRoundedIcon />}
        sx={{ mt: 3 }}
        // onClick={handleExportCSV}
      >
        <CSVLink
          data={data}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          Export
        </CSVLink>
      </Button>

      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Candidate</TableCell>
              <TableCell>Applied at</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>ACtions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates?.map((candidate: any) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.id}</TableCell>
                <TableCell>{candidate.member.fullname}</TableCell>
                <TableCell>
                  {dayjs(candidate.created_at).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  <TextField
                    select
                    label=''
                    size='small'
                    defaultValue={candidate.status ? candidate.status : 'New'}
                    onChange={(e) =>
                      handleUpdateStatus(candidate?.id, e.target.value)
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
                            setSelectedCandidate(candidate);
                            console.log(candidate);
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
                          navigate(`/employer/hr/candidates/${candidate.id}`)
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
    </div>
  );
};

export default EmployerCandidatesByJob;
