import React, { useState } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import {
  Grid,
  Typography,
  Box,
  TextField,
  Stack,
  Card,
  InputAdornment,
  IconButton,
  Container,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Image from '../../../components/Image';

import ResetImage from '../../../assets/images/reset_password.png';
import { AppState } from '../../../store/reducer';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  employerResetPassword,
  jobSeekerResetPassword,
} from '../../../store/auth/action';

type Props = {};

const ResetPassword = (props: Props) => {
  const { pathname } = useLocation();

  const isEmployer = pathname.includes('/employer');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const token = urlParams.get('token');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { isLoading, error } = useSelector((state: AppState) => state.auth);

  const defaultValues = {
    password: '',
    password_confirmation: '',
  };

  const validate = yup.object({
    password: yup
      .string()
      .min(6, 'Password at least 6 character')
      .max(30, 'Password allow maximum 30 character')
      .required('Please enter password'),
    password_confirmation: yup
      .string()
      .min(6, 'Confirm at least 6 character')
      .oneOf([yup.ref('password'), null], 'Confirm password does not match')
      .required('Please enter password'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(validate),
    mode: 'onChange',
  });

  const onSubmit = async (values: any) => {
    try {
      if (isEmployer) {
        await dispatch(employerResetPassword(token, values));
        navigate('/employer/login');
      } else {
        console.log('Job seeker reset!');
        await dispatch(jobSeekerResetPassword(token, values));
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      sx={{
        ...(!isEmployer && {
          mt: 15,
        }),
      }}
    >
      <Grid container alignItems='center' spacing={3}>
        <Grid item xs={12} md={6}>
          <Image alt='image-reset' src={ResetImage} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 8 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Typography variant='h2' textAlign='center'>
                  Reset password
                </Typography>
                <Controller
                  control={control}
                  name='password'
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <TextField
                        {...field}
                        label='Password *'
                        type={showPassword ? 'text' : 'password'}
                        error={!!error}
                        helperText={error?.message}
                        InputProps={{
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
                    );
                  }}
                />
                <Controller
                  control={control}
                  name='password_confirmation'
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <TextField
                        {...field}
                        label='Confirm password *'
                        error={!!error}
                        type={showConfirmPassword ? 'text' : 'password'}
                        helperText={error?.message}
                        InputProps={{
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
                    );
                  }}
                />
                <LoadingButton
                  type='submit'
                  variant='contained'
                  size='large'
                  loading={isLoading}
                >
                  Save
                </LoadingButton>
              </Stack>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResetPassword;
