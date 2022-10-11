import { useState } from 'react';

import {
  Card,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AppState } from '../../../store/reducer';
import { loginEmployer } from '../../../store/auth/action';
import { useNavigate } from 'react-router-dom';

type Props = {};

const LoginForm = (props: Props) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: AppState) => state.auth);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginSchema = yup.object({
    email: yup
      .string()
      .email('Email is valid email address')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  type FormValues = {
    email: string;
    password: string;
  };

  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (formData: FormValues) => {
    dispatch(loginEmployer(formData, navigate));
  };

  return (
    <Card sx={{ p: 10 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Typography variant='h2' gutterBottom>{`Welcome back!`}</Typography>
          {error && (
            <Alert severity='error'>{error[Object.keys(error)[0]]}</Alert>
          )}
          <Controller
            name='email'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label={`Email`}
                name='email'
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
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
                name='password'
                type={showPassword ? 'text' : 'password'}
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <VpnKeyOutlinedIcon />
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

          <LoadingButton
            type='submit'
            size='large'
            variant='contained'
            loading={isLoading}
          >
            {`Login`}
          </LoadingButton>
        </Stack>
      </form>
    </Card>
  );
};

export default LoginForm;
