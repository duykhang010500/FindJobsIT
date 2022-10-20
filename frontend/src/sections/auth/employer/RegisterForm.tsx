import { useState } from 'react';

import {
  Box,
  Card,
  Alert,
  Stack,
  MenuItem,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AppState } from '../../../store/reducer';
import { registerEmployer } from '../../../store/auth/action';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IIndustry } from '../../../store/industries/types';

const companySize = [
  '0 - 9',
  '10 - 49',
  '50 - 99',
  '100 - 499',
  '500 - 999',
  'Over 1000',
];

const RegisterForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { isLoading, error } = useSelector((state: AppState) => state.auth);

  const { industries } = useSelector((state: AppState) => state.industries);

  const { locations } = useSelector((state: AppState) => state.location);

  const registerSchema = yup.object({
    firstName: yup.string().required('Fisrt name required'),
    lastName: yup.string().required('Last name required'),
    email: yup
      .string()
      .email('Email must be a valid address')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must have at least 6 character')
      .required('Password is required'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Confirm password does not match'),
    name: yup.string().required('Company name is required'),
    industry_id: yup.string().required('Industry is required'),
    location: yup.string().required('Location is required'),
    company_size: yup.string().required('Company size is required'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password_confirmation: '',
      name: '',
      industry_id: '',
      location: '',
      company_size: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: any) => {
    let fullname = data.firstName + ' ' + data.lastName;
    delete data.firstName;
    delete data.lastName;
    let newForm = { ...data, fullname };
    dispatch(registerEmployer(newForm, navigate));
  };

  return (
    <Card sx={{ p: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Typography variant='h3' color='primary' textTransform='uppercase'>
            Create account for HR
          </Typography>
          {error && (
            <Alert severity='error'>{error[Object.keys(error)[0]]}</Alert>
          )}
          <Box p={1} sx={{ backgroundColor: '#f2f4f5', borderRadius: 1 }}>
            <Typography variant='h5' textAlign='center'>
              Account
            </Typography>
          </Box>
          <Stack direction='row' spacing={2}>
            <Controller
              name='firstName'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={`First name`}
                  fullWidth
                  size='small'
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name='lastName'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={`Last name`}
                  size='small'
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Controller
            name='email'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label={`Email`}
                size='small'
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
                type={showPassword ? 'text' : 'password'}
                size='small'
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <RemoveRedEyeIcon />
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
            name='password_confirmation'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label={`Confirm password`}
                type={showConfirmPassword ? 'text' : 'password'}
                size='small'
                error={!!error}
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
                          <RemoveRedEyeIcon />
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

          <Box p={1} sx={{ backgroundColor: '#f2f4f5', borderRadius: 1 }}>
            <Typography variant='h5' textAlign='center'>
              Company Info
            </Typography>
          </Box>
          <Controller
            name='name'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label={`Company name`}
                size='small'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name='industry_id'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                select
                size='small'
                label='Industry'
                error={!!error}
                helperText={error?.message}
              >
                {industries.map((industry: IIndustry) => {
                  return (
                    <MenuItem key={industry.id} value={industry.id}>
                      {industry.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />

          <Controller
            name='location'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                select
                size='small'
                label='Location'
                error={!!error}
                helperText={error?.message}
              >
                {locations.map((location: any) => {
                  return (
                    <MenuItem key={location.id} value={location.name}>
                      {location.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />

          <Controller
            name='company_size'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                select
                size='small'
                label='Company size'
                error={!!error}
                helperText={error?.message}
              >
                {companySize.map((item: any) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />

          <LoadingButton
            variant='contained'
            size='large'
            loading={isLoading}
            type='submit'
          >{`Register`}</LoadingButton>
        </Stack>
      </form>
    </Card>
  );
};

export default RegisterForm;
