import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Stack, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    console.log(formData);
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
                label={`Email`}
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
                label={`Password`}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <LoadingButton
            type='submit'
            loading={false}
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
