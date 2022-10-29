import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Stack, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginAdmin } from '../../../store/auth/action';
import { AppState } from '../../../store/reducer';

type Props = {};

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email(`Email must have valid email address`)
    .required(`Email is required`),
  password: yup.string().required('Password is required'),
});

const LoginForm = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: AppState) => state.auth);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    dispatch(loginAdmin(formData, navigate));
  };

  return (
    <Box
      sx={{
        minWidth: 500,
        padding: '60px 50px',
        backgroundColor: 'white',
        borderRadius: 2,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Typography variant='h3' align='center'>
            Welcome Administrator!
          </Typography>
          <Controller
            name='email'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label={`Email *`}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type='password'
                label={`Password *`}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <LoadingButton
            type='submit'
            loading={isLoading}
            variant='contained'
            size='large'
          >
            {`Login`}
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
