import React from 'react';
import {
  Box,
  Stack,
  TextField,
  Button,
  MenuItem,
  Autocomplete,
  Typography,
  FormHelperText,
} from '@mui/material';

import { useDispatch } from 'react-redux';

import Editor from '../../../components/Editor';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import SaveIcon from '@mui/icons-material/Save';
import { createJob } from '../../../store/jobs/actions';

type Props = {};

const industriesData = [
  { label: 'Software', id: 1 },
  { label: 'Hardware', id: 2 },
];

const educationData = [
  { label: 'Bachelor Degree', id: 1 },
  { label: 'PHD', id: 2 },
];

const locationData = [
  { label: 'Hồ Chí Minh', id: 1 },
  { label: 'Hà Nội', id: 2 },
];

interface IDegree {
  label: string;
  id: number;
}

const getDegreeIdByName = (arr: IDegree[]) => {
  let newArr: number[] = [];
  arr.forEach((item) => {
    newArr.push(item.id);
  });
  return newArr;
};

interface IIndustry {
  label: string;
  id: number;
}

const getIndustriesIdByName = (arr: IIndustry[]) => {
  let newArr: number[] = [];
  arr.forEach((item) => {
    newArr.push(item.id);
  });
  return newArr;
};

interface ILocation {
  label: string;
  id: number;
}

const getLocationsIdByName = (arr: ILocation[]) => {
  let newArr: number[] = [];
  arr.forEach((item) => {
    newArr.push(item.id);
  });
  return newArr;
};

const JobNewForm = (props: Props) => {
  const dispatch = useDispatch();

  //validate
  const newJobSchema = yup.object({
    title: yup.string().required('Title is required'),
    job_type: yup.string().required('Job type is required'),
    level_id: yup.string().required('Level is required'),
    industries: yup.array().min(1, 'Please choose at least 1 industry'),
    degree_id: yup.array().min(1, 'Please choose at least 1 degree'),
    location: yup.array().min(1, 'please choose at least 1 location'),
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
      degree_id: [],
      location: [],
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
    const newForm = {
      ...data,
      degree_id: getDegreeIdByName(data.degree_id),
      industries: getIndustriesIdByName(data.industries),
      locations: getLocationsIdByName(data.location),
    };
    dispatch(createJob(newForm));
  };

  return (
    <Box sx={{ mt: 6 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
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
                <MenuItem value={1}>Fulltime</MenuItem>
                <MenuItem value={2}>Part time</MenuItem>
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
                <MenuItem value={1}>Intern</MenuItem>
                <MenuItem value={2}> Manager</MenuItem>
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
                options={industriesData}
                getOptionLabel={(industry) => industry.label}
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
              <Autocomplete
                {...field}
                id='education'
                multiple
                options={educationData}
                getOptionLabel={(edu) => edu.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size='small'
                    label='Education'
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
            name='location'
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                id='location'
                multiple
                options={locationData}
                getOptionLabel={(location) => location.label}
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
            <Typography variant='h5' gutterBottom>
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
                label='Company name'
                error={!!error}
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
                label='Contact name'
                error={!!error}
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
                label='Contact email'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Stack direction='row' spacing={2}>
            <Button
              type='submit'
              variant='contained'
              size='large'
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
            <Button variant='outlined' size='large'>
              Save Draft
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default JobNewForm;
