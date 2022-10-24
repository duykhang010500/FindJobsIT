import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
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
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
} from '@mui/material';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Editor from '../../../components/Editor';

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { createJob, updateJob } from '../../../store/jobs/actions';

import { degreeTypes, jobLevel, jobTypes } from '../../../utils/defaultValues';
import { LoadingButton } from '@mui/lab';

type Props = {
  isEdit?: boolean;
  job?: any;
};

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

const JobNewForm = ({ isEdit = false, job }: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { locations } = useSelector((state: AppState) => state.location);

  const { industries } = useSelector((state: AppState) => state.industries);

  const { isLoading, error } = useSelector((state: AppState) => state.jobs);

  //validate
  const newJobSchema = yup.object({
    title: yup.string().required('Title is required'),
    job_type: yup.string().required('Job type is required'),
    level: yup.string().required('Level is required'),
    industries: yup.array().min(1, 'Please choose at least 1 industry'),
    degree: yup.string().min(1, 'Please choose at least 1 degree'),
    locations: yup.array().min(1, 'please choose at least 1 location'),
    job_description: yup.string().required('Job description is required'),
    job_requirement: yup.string().required('Job requirement is required'),
    exp: yup.string(),
    exp_from: yup.string(),
    exp_to: yup.string(),
    salary: yup.string(),
    salary_from: yup.string(),
    salary_to: yup.string(),
    gender: yup.number(),
    age_from: yup.number().required('Age from is required'),
    age_to: yup.number().required('Age to is required'),
    unskill_job: yup.string().required('Skill is require'),
    job_benefits: yup.string().required('Benefits is require'),
    // end_date: yup.string(),
    company_name: yup.string().required('Company name is required'),
    contact_name: yup.string().required('Contact name is required'),
    contact_emails: yup.string().required('Contact email is required'),
  });

  const defaultValues = {
    title: job?.title || '',
    job_type: job?.job_type || '',
    level: job?.level || '',
    industries: job?.industries || [],
    degree: job?.degree || '',
    locations: job?.locations || [],
    exp: job?.exp || 'Not require',
    exp_from: job?.exp_from || '',
    exp_to: job?.exp_to || '',
    salary: job?.salary || 'Negotiate',
    salary_from: job?.salary_from || '',
    salary_to: job?.salary_to || '',
    gender: job?.gender || 1,
    age_from: job?.age_from || '',
    age_to: job?.age_to || '',
    unskill_job: job?.unskill_job || '',
    job_benefits: job?.job_benefits || '',
    end_date: job?.end_date || '',
    job_description: job?.job_description || '',
    job_requirement: job?.job_requirement || '',
    company_name: job?.company_name || '',
    contact_name: job?.contact_name || '',
    contact_emails: job?.contact_emails || '',
    status: 1,
  };

  const { control, handleSubmit, getValues, setValue, reset } = useForm({
    defaultValues,
    resolver: yupResolver(newJobSchema),
  });

  const [showSalary, setShowSalary] = useState<any>('Negotiate');
  const [showExperience, setShowExperience] = useState<any>('Not require');

  const onSubmit = (data: any) => {
    const newFormValues = {
      ...data,
      industries: convertArrayObjToString(data.industries),
      locations: convertArrayObjToString(data.locations),
      end_date: dayjs(data.end_date).format('YYYY/MM/DD'),
    };

    if (isEdit) {
      dispatch(updateJob(job.id, newFormValues));
    } else {
      dispatch(createJob(newFormValues, navigate));
    }
  };

  useEffect(() => {
    reset(defaultValues);
  }, [reset, job]);

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
            name='level'
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
                    <MenuItem key={item.id} value={item.label}>
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
            name='degree'
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
                    <MenuItem key={degree.id} value={degree.label}>
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
          <Controller
            control={control}
            name='exp'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                select
                size='small'
                label='Experience'
                error={!!error}
                helperText={error?.message}
                onChange={(e) => {
                  setShowExperience(e.target.value);
                  setValue('exp', e.target.value);
                }}
              >
                <MenuItem value='Not require'>Not require</MenuItem>
                <MenuItem value='Year'>Year</MenuItem>
              </TextField>
            )}
          />
          <Controller
            control={control}
            name='exp_from'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                label='From'
                error={!!error}
                helperText={error?.message}
                disabled={showExperience === 'Not require'}
              />
            )}
          />
          <Controller
            control={control}
            name='exp_to'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                label='To'
                error={!!error}
                helperText={error?.message}
                disabled={showExperience === 'Not require'}
              />
            )}
          />

          <Controller
            name='gender'
            control={control}
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value='1'
                      control={<Radio />}
                      label='Male'
                    />
                    <FormControlLabel
                      value='2'
                      control={<Radio />}
                      label='Female'
                    />
                  </RadioGroup>
                </FormControl>
              );
            }}
          />

          <Controller
            control={control}
            name='salary'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                select
                label='Salary'
                error={!!error}
                helperText={error?.message}
                onChange={(e) => {
                  setShowSalary(e.target.value);
                  setValue('salary', e.target.value);
                }}
              >
                <MenuItem value='Negotiate'>Negotiate</MenuItem>
                <MenuItem value='VND'>VND</MenuItem>
              </TextField>
            )}
          />
          <Controller
            control={control}
            name='salary_from'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                label='From'
                type='number'
                error={!!error}
                helperText={error?.message}
                disabled={showSalary === 'Negotiate'}
              />
            )}
          />
          <Controller
            control={control}
            name='salary_to'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                label='To'
                type='number'
                error={!!error}
                helperText={error?.message}
                disabled={showSalary === 'Negotiate'}
              />
            )}
          />

          <Controller
            control={control}
            name='age_from'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                label='Age from'
                type='number'
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
                label='Age to'
                type='number'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='unskill_job'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size='small'
                label='Skill'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name='end_date'
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <DesktopDatePicker
                  {...field}
                  label='End date'
                  inputFormat='DD/MM/YYYY'
                  renderInput={(props) => (
                    <TextField {...props} fullWidth error={!!error} />
                  )}
                />
              );
            }}
          />
          <div>
            <Typography
              variant='h5'
              gutterBottom
              sx={{ color: 'rgb(99, 115, 129)' }}
            >
              Job Benefits
            </Typography>
            <Controller
              name='job_benefits'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Editor
                  id='job_benefits'
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
                  id='job_requirement'
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
