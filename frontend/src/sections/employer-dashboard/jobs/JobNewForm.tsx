import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Stack,
  Alert,
  MenuItem,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
} from '@mui/material';

import Editor from '../../../components/Editor';

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { createJob } from '../../../store/jobs/actions';

import { degreeTypes, jobLevel, jobTypes } from '../../../utils/defaultValues';
import { LoadingButton } from '@mui/lab';

type Props = {};

const convertArrayObjToString = (arr: any[]) => {
  let str = '';
  arr.forEach((item: any, index) => {
    if (index === 0) {
      str += `${item.id}`;
    } else {
      str += `,${item.id}`;
    }
  });
  return str;
};

const JobNewForm = (props: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { locations } = useSelector((state: AppState) => state.location);

  const { industries } = useSelector((state: AppState) => state.industries);

  const { isLoading, error } = useSelector((state: AppState) => state.jobs);

  //validate
  const newJobSchema = yup.object({
    title: yup.string().required('Title is required'),
    job_type: yup.string().required('Job type is required'),
    level_id: yup.string().required('Level is required'),
    industries: yup.array().min(1, 'Please choose at least 1 industry'),
    degree_id: yup.string().min(1, 'Please choose at least 1 degree'),
    locations: yup.array().min(1, 'please choose at least 1 location'),
    job_description: yup.string().required('Job description is required'),
    job_requirement: yup.string().required('Job requirement is required'),
    // age_from: yup.number().min(0).required('Age from is required'),
    // age_to: yup.number().required('Age to is required'),
    company_name: yup.string().required('Company name is required'),
    contact_name: yup.string().required('Contact name is required'),
    contact_emails: yup.string().required('Contact email is required'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      job_type: '',
      level_id: '',
      industries: [],
      degree_id: '',
      locations: [],
      job_description: '',
      job_requirement: '',
      // age_from: undefined,
      // age_to: undefined,
      company_name: '',
      contact_name: '',
      contact_emails: '',
      status: 1,
    },
    resolver: yupResolver(newJobSchema),
  });

  const onSubmit = (data: any) => {
    const newFormValues = {
      ...data,
      industries: convertArrayObjToString(data.industries),
      locations: convertArrayObjToString(data.locations),
    };

    console.log(newFormValues);

    dispatch(createJob(newFormValues, navigate));
  };

  return (
    <Box sx={{ mt: 6 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {error && <Alert severity='error'>{Object.values(error)}</Alert>}
          <Controller
            control={control}
            name='title'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                label='Job title'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='job_type'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                label='Job Type'
                select
                error={!!error}
                helperText={error?.message}
              >
                {jobTypes.map((item: any) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />
          <Controller
            control={control}
            name='level_id'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                label='Level'
                select
                error={!!error}
                helperText={error?.message}
              >
                {jobLevel.map((item: any) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />
          <Controller
            control={control}
            name='industries'
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                id='industry'
                multiple
                options={industries}
                getOptionLabel={(industry: any) => industry.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size='small'
                    label='Industry'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
                onChange={(_, data) => {
                  field.onChange(data);
                  return data;
                }}
              />
            )}
          />

          <Controller
            control={control}
            name='degree_id'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                select
                label='Education'
                size='small'
                error={!!error}
                helperText={error?.message}
              >
                {degreeTypes.map((degree) => {
                  return (
                    <MenuItem key={degree.id} value={degree.id}>
                      {degree.label}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name='locations'
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                id='location'
                multiple
                options={locations}
                getOptionLabel={(location: any) => location.name.trim()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size='small'
                    label='Location'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
                onChange={(_, data) => {
                  field.onChange(data);
                  return data;
                }}
              />
            )}
          />
          {/* <div>
            <Typography
              variant='h5'
              gutterBottom
              sx={{ color: 'rgb(99, 115, 129)' }}
            >
              Age
            </Typography>
            <Stack direction='row' spacing={3}>
              <Controller
                control={control}
                name='age_from'
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    size='small'
                    label='From'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name='age_to'
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    size='small'
                    label='To'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </div> */}
          <div>
            <Typography
              variant='h5'
              gutterBottom
              sx={{ color: 'rgb(99, 115, 129)' }}
            >
              Job description
            </Typography>
            <Controller
              name='job_description'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Editor
                  id='job_description'
                  value={field.value}
                  onChange={field.onChange}
                  error={!!error}
                  helperText={
                    <FormHelperText error>{error?.message}</FormHelperText>
                  }
                />
              )}
            />
          </div>
          <div>
            <Typography
              variant='h5'
              gutterBottom
              sx={{ color: 'rgb(99, 115, 129)' }}
            >
              Job requirement
            </Typography>
            <Controller
              name='job_requirement'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Editor
                  id='jjob_requirement'
                  value={field.value}
                  onChange={field.onChange}
                  error={!!error}
                  helperText={
                    <FormHelperText error>{error?.message}</FormHelperText>
                  }
                />
              )}
            />
          </div>
          <Box p={1} sx={{ backgroundColor: '#f2f4f5', borderRadius: 1 }}>
            <Typography
              variant='h5'
              sx={{ color: 'rgb(99, 115, 129)' }}
              textAlign='center'
            >
              Contact Information
            </Typography>
          </Box>
          <Controller
            control={control}
            name='company_name'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                error={!!error}
                label='Company name'
                helperText={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='contact_name'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                error={!!error}
                label='Contact name'
                helperText={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='contact_emails'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                error={!!error}
                label='Contact email'
                helperText={error?.message}
              />
            )}
          />

          <Stack direction='row' spacing={2}>
            <LoadingButton
              type='submit'
              size='large'
              variant='contained'
              loading={isLoading}
              startIcon={<SaveIcon />}
            >
              Save
            </LoadingButton>
            <LoadingButton size='large' variant='outlined' loading={isLoading}>
              Save Draft
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default JobNewForm;
