import {
  Stack,
  Typography,
  Box,
  Card,
  TextField,
  Autocomplete,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { registerEmployer } from '../../../store/auth/action';
import { AppState } from '../../../store/reducer';

const industriesData = [
  { title: 'Software', id: 12 },
  { title: 'Hardware', id: 11 },
];

const locationsData = [
  { title: 'Hồ Chí Minh', id: 1 },
  { title: 'Hà Nội', id: 2 },
];

const companySize = ['50', '500', '100'];

const getIndustryIdByName = (name: string) => {
  return industriesData.find((industry) => industry.title === name)?.id;
};

const RegisterForm = () => {
  // eslint-disable-next-line
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: AppState) => state.auth);

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
      .min(6, 'Confirm password must have at least 6 character')
      .oneOf([yup.ref('password')], 'Confirm password do not match')
      .required('Confirm Password is required'),
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
    let company_size = +data.company_size;
    let industry_id = getIndustryIdByName(data.industry_id);
    delete data.firstName;
    delete data.lastName;
    let newForm = { ...data, fullname, company_size, industry_id };

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
                size='small'
                error={!!error}
                helperText={error?.message}
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
                size='small'
                error={!!error}
                helperText={error?.message}
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
              <Autocomplete
                {...field}
                disablePortal
                id='combo-box-industry'
                options={industriesData.map((industry) => industry.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Industry'
                    size='small'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
                onChange={(_, data) => field.onChange(data)}
              />
            )}
          />

          <Controller
            name='location'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                disablePortal
                id='combo-box-location'
                onChange={(e, value) => field.onChange(value)}
                options={locationsData.map((location) => location.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Location'
                    size='small'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            )}
          />

          <Controller
            name='company_size'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                disablePortal
                onChange={(e, value) => field.onChange(value)}
                id='combo-box-demo'
                options={companySize}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Company size'
                    size='small'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
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
