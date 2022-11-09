import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  Box,
  Link,
  Card,
  Alert,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import { AppState } from '../../../store/reducer';
import {
  employerForgotPassword,
  jobSeekerForgotPassword,
} from '../../../store/auth/action';
import { useLocation, useParams } from 'react-router-dom';

type Props = {};

const BoxStyled = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Wrapper = styled(Card)({
  padding: '30px',
  maxWidth: '450px',
  textAlign: 'center',
});

const ForgotPassword = (props: Props) => {
  const { pathname } = useLocation();

  const isEmployer = pathname.includes('/employer');

  const dispatch = useDispatch();

  const [sendEmailSuccess, setSendEmailSuccess] = useState<boolean>(false);

  const { isLoading, error } = useSelector((state: AppState) => state.auth);

  const defaultValues = {
    email: '',
  };

  const validateForgotForm = yup.object({
    email: yup
      .string()
      .email('Please enter valid email address!')
      .required('Please enter email!'),
  });

  const { control, handleSubmit, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validateForgotForm),
  });

  const onSubmit = async (values: any) => {
    try {
      if (isEmployer) {
        await dispatch(employerForgotPassword(values));
        setSendEmailSuccess(true);
      } else {
        console.log('Job seeker forgot!');
        await dispatch(jobSeekerForgotPassword(values));
        setSendEmailSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BoxStyled
      sx={{
        ...(!isEmployer && {
          mt: 15,
        }),
      }}
    >
      <Wrapper>
        {sendEmailSuccess ? (
          <Stack spacing={2}>
            <Alert severity='success'>
              <Typography variant='body2'>
                Check mail
                <Typography fontWeight={600} component='span'>
                  &nbsp; {getValues('email')} &nbsp;
                </Typography>
                for reset password link
              </Typography>
            </Alert>
            <Link href='/employer/login'>Back to login</Link>
          </Stack>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Typography variant='h2'>You forgot your password?</Typography>
              <Typography variant='body1'>
                Please input the email, we will send you link to reset your
                password
              </Typography>
              <Controller
                name='email'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error}
                    label='Email *'
                    helperText={error?.message}
                  />
                )}
              />
              <LoadingButton
                size='large'
                type='submit'
                variant='contained'
                loading={isLoading}
              >
                Send mail
              </LoadingButton>
              <Link href='/employer/login'>Back to login</Link>
            </Stack>
          </form>
        )}
      </Wrapper>
    </BoxStyled>
  );
};

export default ForgotPassword;
