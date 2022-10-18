import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  Card,
  Stack,
  Alert,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { AppState } from '../../../store/reducer';
import { jobSeekerRegister } from '../../../store/auth/action';

type Props = {};

type FormValues = {
  email: string;
  fullname: string;
  password: string;
  password_confirmation: string;
};

const JobSeekerRegisterForm = (props: Props) => {
  const { isLoading, error } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    email: '',
    fullname: '',
    password: '',
    password_confirmation: '',
  };

  const schema = yup.object({
    email: yup
      .string()
      .email('Email must be valid email address')
      .required('Email is required'),
    fullname: yup.string().required('Full name is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password at least 6 character'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Confirm password does not match')
      .required('Confirm password is required'),
  });

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    dispatch(jobSeekerRegister(formValues, navigate));
  };

  return (
    <Card sx={{ p: 10 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Typography variant='h2' align='center'>
            Register
          </Typography>
          {error && <Alert severity='error'>{Object.values(error)}</Alert>}
          <Controller
            control={control}
            name='email'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Email'
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            control={control}
            name='fullname'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Full name'
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Password'
                type='password'
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            control={control}
            name='password_confirmation'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Confirm Password'
                type='password'
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <LoadingButton
            type='submit'
            variant='contained'
            size='large'
            loading={isLoading}
          >
            Register
          </LoadingButton>
        </Stack>
        <Typography variant='body2' sx={{ mt: 2 }}>
          Already have account?{' '}
          <Link
            component={RouterLink}
            to='/login'
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          >
            Login now
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default JobSeekerRegisterForm;
