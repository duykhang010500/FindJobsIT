import { useSelector, useDispatch } from 'react-redux';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Link,
  Card,
  Stack,
  Alert,
  TextField,
  IconButton,
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
import PersonIcon from '@mui/icons-material/Person';
import { jobSeekerRegister } from '../../../store/auth/action';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

type Props = {};

type FormValues = {
  email: string;
  fullname: string;
  password: string;
  password_confirmation: string;
};

const JobSeekerRegisterForm = (props: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: AppState) => state.auth);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

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
      .max(40, 'Email allow 40 character')
      .required('Email is required'),
    fullname: yup
      .string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid full name')
      .max(40, 'Full name alow maximum 40 character')
      .required('Full name is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password at least 6 character')
      .max(40, 'Password allow maximum 40 character'),
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
    <Card sx={{ p: 6 }}>
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
                label='Email *'
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
                label='Full name *'
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
                label='Password *'
                type={showPassword ? 'text' : 'password'}
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
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
                label='Confirm Password *'
                type={showConfirmPassword ? 'text' : 'password'}
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
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
