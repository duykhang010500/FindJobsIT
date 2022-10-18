import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
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
import { AppState } from '../../../store/reducer';
import { jobSeekerLogin } from '../../../store/auth/action';

type Props = {};

type FormValues = {
  email: string;
  password: string;
};

const JobSeekerLoginForm = (props: Props) => {
  const { isLoading, error } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultValues = {
    email: '',
    password: '',
  };

  const schema = yup.object({
    email: yup
      .string()
      .required('Email is required')
      .email('Email must be valid email address'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 character'),
  });

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    dispatch(jobSeekerLogin(formValues, navigate));
  };

  return (
    <Card sx={{ p: 10 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Typography variant='h2' align='center'>
            Login
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
          <LoadingButton
            type='submit'
            variant='contained'
            size='large'
            loading={isLoading}
          >
            Login
          </LoadingButton>
        </Stack>
        <Typography variant='body2' sx={{ mt: 2 }}>
          Don't have account?{' '}
          <Link
            component={RouterLink}
            to='/register'
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          >
            Register now
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default JobSeekerLoginForm;