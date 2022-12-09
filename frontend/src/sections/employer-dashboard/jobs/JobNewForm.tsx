import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Stack,
  Radio,
  Alert,
  MenuItem,
  FormLabel,
  TextField,
  Typography,
  RadioGroup,
  FormControl,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
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

import {
  degreeTypes,
  jobLevel,
  jobTypes,
  skills,
} from '../../../utils/defaultValues';
import { LoadingButton } from '@mui/lab';
import { convertArrStringToString } from '../../../utils/convert';

type Props = {
  isEdit?: boolean;
  job?: any;
  readonly?: boolean;
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

const JobNewForm = ({ isEdit = false, job, readonly }: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isOpen = pathname.includes('active');
  const isClose = pathname.includes('closed');
  const isPending = pathname.includes('pending');
  const isRejected = pathname.includes('rejected');
  const isDraft = pathname.includes('draft');

  const [isSaveDraft, setIsSaveDraft] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showSalary, setShowSalary] = useState<any>('Negotiate');

  const [showExperience, setShowExperience] = useState<any>('Not require');

  const { currentUser } = useSelector((state: AppState) => state.auth);

  const { locations } = useSelector((state: AppState) => state.location);

  const { industries } = useSelector((state: AppState) => state.industries);

  const { error } = useSelector((state: AppState) => state.jobs);

  //validate
  const newJobSchema = yup.object({
    title: yup
      .string()
      .max(80, 'Title is upto 80 character')
      .required('Title is required'),
    job_type: yup.string().required('Job type is required'),
    level: yup.string().required('Level is required'),
    industries: yup
      .array()
      .min(1, 'Please choose at least 1 industry')
      .max(3, 'Industries accept up to 3 choices'),
    degree: yup.string().min(1, 'Please choose at least 1 degree'),
    locations: yup
      .array()
      .min(1, 'Please choose at least 1 location')
      .max(3, 'Location accept up to 3 choices'),
    job_description: yup.string().required('Job description is required'),
    job_requirement: yup.string().required('Job requirement is required'),

    exp: yup.string().when('exp_from', {
      is: (value: any) => value && value === 0,
      then: yup.number().min(2, '> 2 gium em'),
    }),

    exp_from: yup
      .number()
      .min(0)
      .max(999, 'Experience accept up to 3 numeric characters'),
    exp_to: yup
      .number()
      .min(0)
      .when('exp', {
        is: (value: any) => value === 'Year',
        then: yup
          .number()
          .moreThan(
            yup.ref('exp_from'),
            'Experience to must be greater than experience from'
          ),
      })
      .max(999, 'Experience accept up to 3 numeric characters'),

    salary: yup.string(),
    salary_from: yup
      .number()
      .positive()
      .min(0)
      .max(999999999, 'Salary accept up to 9 numeric characters'),
    salary_to: yup
      .number()
      .positive()
      .min(0)
      .max(999999999, 'Salary accept up to 9 numeric characters')
      .when('salary', {
        is: (value: any) => value !== 'Negotiate',
        then: yup
          .number()
          .moreThan(
            yup.ref('salary_from'),
            'Salary to must be greater than salary from'
          ),
      }),
    gender: yup.number(),
    age_from: yup
      .number()
      .integer()
      .required('Age from is required')
      .positive('Age from must be positive number')
      .min(15, 'Age from must be between 15 and 60')
      .max(60, 'Age from must be less than 60'),

    age_to: yup
      .number()
      .required('Age to is required')
      .min(15, 'Age to must be 15 year old or older')
      .max(60, 'Age to must be less than 60')
      .moreThan(yup.ref('age_from'), 'Age to must be greater than age from'),
    unskill_job: yup.array().min(1, 'Skill is require'),
    job_benefits: yup.string().required('Benefits is require'),
    end_date: yup
      .date()
      .min(new Date(), 'End date must be after today')
      .nullable()
      .transform((curr, orig) => (orig === '' ? null : curr))
      .required('End date is required'),
    company_name: yup.string().required('Company name is required'),
    contact_name: yup.string().required('Contact name is required'),
    contact_emails: yup.string().required('Contact email is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: job?.title || '',
      job_type: job?.job_type || '',
      level: job?.level || '',
      industries: job?.industries || [],
      degree: job?.degree || '',
      locations: job?.locations || [],
      exp: job?.exp || 'Not require',
      exp_from: job?.exp_from || 0,
      exp_to: job?.exp_to || 0,
      salary: job?.salary || 'Negotiate',
      salary_from: job?.salary_from || 0,
      salary_to: job?.salary_to || 0,
      gender: job?.gender || '0',
      age_from: job?.age_from || 0,
      age_to: job?.age_to || 0,
      unskill_job: job?.unskill_job.split(', ') || [],
      job_benefits: job?.job_benefits || '',
      end_date: job?.end_date || '',
      job_description: job?.job_description || '',
      job_requirement: job?.job_requirement || '',
      company_name:
        job?.company_name || currentUser?.info?.info_company?.name || '',
      contact_name: job?.contact_name || currentUser?.info?.fullname || '',
      contact_emails: job?.contact_emails || currentUser?.info?.email || '',
      status: job?.status,
    }),
    [job, currentUser]
  );

  const { control, handleSubmit, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(newJobSchema),
  });

  useEffect(() => {
    reset(defaultValues);
    setShowExperience(isEdit ? job?.exp : 'Not require');
    setShowSalary(isEdit ? job?.salary : 'Negotiate');
  }, [reset, job, defaultValues, isEdit]);

  const onSubmit = async (data: any) => {
    if (isSaveDraft) {
      setIsLoading(true);
      const newFormValues = {
        ...data,
        industries: convertArrayObjToString(data.industries),
        locations: convertArrayObjToString(data.locations),
        end_date: dayjs(data.end_date).format('YYYY/MM/DD'),
        unskill_job: convertArrStringToString(data.unskill_job),
        status: 0,
      };
      console.log('save draft', newFormValues);
      await dispatch(createJob(newFormValues, navigate));

      // if (isEdit) {
      //   await dispatch(updateJob(job.id, newFormValues, navigate));
      // } else {
      // }
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const newFormValues = {
        ...data,
        industries: convertArrayObjToString(data.industries),
        locations: convertArrayObjToString(data.locations),
        end_date: dayjs(data.end_date).format('YYYY/MM/DD'),
        unskill_job: convertArrStringToString(data.unskill_job),
        // status: isOpen && 1,
        status: 2,
      };

      if (isEdit) {
        console.log('edit: ', newFormValues);
        await dispatch(updateJob(job.id, newFormValues, navigate));
      } else {
        await dispatch(createJob(newFormValues, navigate));
        console.log('create new: ', newFormValues);
      }
      setIsLoading(false);
    }
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
                label='Job title *'
                error={!!error}
                helperText={error?.message}
                inputProps={{
                  readOnly: readonly ? true : false,
                }}
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
                label='Job Type *'
                select
                error={!!error}
                helperText={error?.message}
                inputProps={{
                  readOnly: readonly ? true : false,
                }}
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
                label='Level *'
                select
                error={!!error}
                helperText={error?.message}
                inputProps={{
                  readOnly: readonly ? true : false,
                }}
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
                readOnly={readonly ? true : false}
                id='industry'
                multiple
                options={industries}
                getOptionLabel={(industry: any) => industry.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size='small'
                    label='Industry *'
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
                label='Education *'
                size='small'
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  readOnly: readonly,
                }}
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
                readOnly={readonly}
                id='location'
                multiple
                options={locations}
                getOptionLabel={(location: any) => location.name.trim()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size='small'
                    label='Location *'
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
                InputProps={{ readOnly: readonly }}
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
                type='number'
                label='From'
                error={!!error}
                helperText={error?.message}
                disabled={showExperience === 'Not require'}
                InputProps={{ readOnly: readonly }}
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
                type='number'
                label='To'
                error={!!error}
                helperText={error?.message}
                disabled={showExperience === 'Not require'}
                InputProps={{ readOnly: readonly }}
              />
            )}
          />

          <Controller
            name='gender'
            control={control}
            render={({ field }) => {
              return (
                <FormControl fullWidth disabled={readonly}>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value='0'
                      control={<Radio />}
                      label='No required'
                    />
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
                  if (e.target.value === 'Negotiate') {
                    setValue('salary_to', 0);
                    setValue('salary_from', 0);
                  }
                  setShowSalary(e.target.value);
                  setValue('salary', e.target.value);
                }}
                InputProps={{ readOnly: readonly }}
              >
                <MenuItem value='Negotiate'>Negotiate</MenuItem>
                <MenuItem value='VND'>VND</MenuItem>
                <MenuItem value='USD'>USD</MenuItem>
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
                InputProps={{ readOnly: readonly }}
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
                InputProps={{ readOnly: readonly }}
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
                label='Age from *'
                type='number'
                error={!!error}
                helperText={error?.message}
                InputProps={{ readOnly: readonly }}
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
                label='Age to *'
                type='number'
                error={!!error}
                helperText={error?.message}
                InputProps={{ readOnly: readonly }}
              />
            )}
          />
          <Controller
            control={control}
            name='unskill_job'
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                readOnly={readonly}
                multiple
                freeSolo
                options={skills}
                onChange={(_, values) => field.onChange(values)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='SKill *'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name='end_date'
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <DesktopDatePicker
                  readOnly={readonly}
                  {...field}
                  label='End date *'
                  inputFormat='DD/MM/YYYY'
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
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
              Job Benefits *
            </Typography>
            <Controller
              name='job_benefits'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Editor
                  isReadOnly={readonly}
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
              Job description *
            </Typography>
            <Controller
              name='job_description'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Editor
                  isReadOnly={readonly}
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
              Job requirement *
            </Typography>
            <Controller
              name='job_requirement'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Editor
                  isReadOnly={readonly}
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
                label='Company name *'
                helperText={error?.message}
                InputProps={{
                  readOnly: readonly,
                }}
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
                label='Contact name *'
                helperText={error?.message}
                InputProps={{
                  readOnly: readonly,
                }}
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
                label='Contact email *'
                helperText={error?.message}
                InputProps={{
                  readOnly: readonly,
                }}
              />
            )}
          />
          {!readonly && (
            <Stack direction='row' spacing={2}>
              <LoadingButton
                type='submit'
                size='large'
                variant='contained'
                loading={isLoading}
                startIcon={<SaveIcon />}
                onClick={() => setIsSaveDraft(false)}
              >
                Save
              </LoadingButton>
              {!isEdit && (
                <LoadingButton
                  type='submit'
                  size='large'
                  color='info'
                  variant='outlined'
                  loading={isLoading}
                  onClick={() => setIsSaveDraft(true)}
                >
                  Save Draft
                </LoadingButton>
              )}
            </Stack>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default JobNewForm;
