import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Card,
  Stack,
  MenuItem,
  Collapse,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { GiStairsGoal } from 'react-icons/gi';

import { Controller } from 'react-hook-form';
import { AppState } from '../../../store/reducer';
import {
  degreeTypes,
  jobLevel,
  jobTypes,
  languages,
} from '../../../utils/defaultValues';

import { GiAchievement } from 'react-icons/gi';

type Props = {
  control: any;
  setValue: any;
  getValues: any;
};

const CareerInformation = ({ control, setValue, getValues }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  const [showSalary, setShowSalary] = useState<boolean>(true);

  const { industries } = useSelector((state: AppState) => state.industries);

  const { locations } = useSelector((state: AppState) => state.location);

  const handleChangeTypeSalary = (e: any) => {
    setValue('salary_unit', e.target.value);
    if (e.target.value === 'VND' || e.target.value === 'USD') {
      setShowSalary(false);
    } else {
      // console.log('Vo day!');
      setShowSalary(true);
      setValue('salary_from', 0);
      setValue('salary_to', 0);
    }
  };

  useEffect(() => {
    console.log('Get values: ', getValues('salary_unit'));
    if (getValues('salary_unit') == 'Negotiate') {
      setShowSalary(true);
      console.log('Chạy vô đây');
    } else {
      setShowSalary(false);
      // setValue('salary_from', 0);
      // setValue('salary_to', 0);
    }
  }, [getValues('salary_unit')]);

  return (
    <Card sx={{ p: 3 }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        onClick={() => setOpen(!open)}
        sx={{ cursor: 'pointer' }}
      >
        <Stack direction='row' alignItems='center'>
          <GiStairsGoal
            style={{ marginRight: '20px', fontSize: '50px', color: '#69b1ff' }}
          />
          <Typography variant='h3' color='#172642' fontWeight={700}>
            Career Information <span style={{ color: 'red' }}>*</span>
          </Typography>
        </Stack>
        {open ? (
          <ExpandMoreIcon sx={{ color: '#172642' }} />
        ) : (
          <ExpandLessIcon sx={{ color: '#172642' }} />
        )}
      </Stack>
      <Collapse in={open}>
        <Stack spacing={4} sx={{ mt: 3 }}>
          <Stack spacing={4} direction='row'>
            <Controller
              name='current_position'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label='Current Position'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name='resume_title'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label='Job title *'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='current_company'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label='Current company'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name='yearofexperience'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type='number'
                  label='Year of experience'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='current_level'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  label='Current level *'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                >
                  {jobLevel.map((level: any) => {
                    return (
                      <MenuItem key={level.id} value={level.label}>
                        {level.label}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
            <Controller
              name='level'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  label='Expected level *'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                >
                  {jobLevel.map((level: any) => {
                    return (
                      <MenuItem key={level.id} value={level.label}>
                        {level.label}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='industries'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  multiple
                  fullWidth
                  options={industries}
                  getOptionLabel={(option) => option.name || ''}
                  // onChange={(_, options) => setValue('industries', options)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Industries *'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  onChange={(_, data) => {
                    field.onChange(data);
                    return data;
                  }}
                />
              )}
            />
            <Controller
              name='locations'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  id='location'
                  multiple
                  fullWidth
                  options={locations}
                  getOptionLabel={(option) => option.name.trim() || ''}
                  // onChange={(_, options) => setValue('locations', options)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Locations *'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  onChange={(_, data) => {
                    field.onChange(data);
                    return data;
                  }}
                />
              )}
            />
          </Stack>
          <Controller
            name='salary_unit'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                select
                label='Salary unit'
                fullWidth
                onChange={handleChangeTypeSalary}
                error={!!error}
                helperText={error?.message}
              >
                <MenuItem value={'Negotiate'}>Negotiate</MenuItem>
                <MenuItem value={'VND'}>VND</MenuItem>
                <MenuItem value={'USD'}>USD</MenuItem>
              </TextField>
            )}
          />
          <Stack spacing={4} direction='row'>
            <Controller
              name='salary_from'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type='number'
                  label='Salary from'
                  fullWidth
                  disabled={showSalary}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name='salary_to'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label='Salary to'
                  type='number'
                  fullWidth
                  disabled={showSalary}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='degree'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  label='Highest degree level *'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                >
                  {degreeTypes.map((degree: any) => (
                    <MenuItem key={degree.id} value={degree.label}>
                      {degree.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='working_type'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  label='Working type *'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                >
                  {jobTypes.map((item: any) => {
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
              name='languages'
              control={control}
              render={({ field, fieldState: { error } }) => (
                // <TextField
                //   {...field}
                //   label='Language'
                //   select
                //   fullWidth
                //   error={!!error}
                //   helperText={error?.message}
                // >
                //   {languages.map((item: any) => (
                //     <MenuItem key={item.id} value={item.value}>
                //       {item.value}
                //     </MenuItem>
                //   ))}
                // </TextField>

                // <Autocomplete
                //   {...field}
                //   id='location'
                //   multiple
                //   fullWidth
                //   options={locations}
                //   getOptionLabel={(option) => option.name.trim() || ''}
                //   // onChange={(_, options) => setValue('locations', options)}
                //   renderInput={(params) => (
                //     <TextField
                //       {...params}
                //       label='Locations *'
                //       error={!!error}
                //       helperText={error?.message}
                //     />
                //   )}
                //   isOptionEqualToValue={(option, value) =>
                //     option.name === value.name
                //   }
                //   onChange={(_, data) => {
                //     field.onChange(data);
                //     return data;
                //   }}
                // />
                <Autocomplete
                  {...field}
                  multiple
                  fullWidth
                  freeSolo
                  options={languages}
                  // getOptionLabel={(option) => option.value || ''}
                  onChange={(_, values) => field.onChange(values)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Languages *'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
          </Stack>
          <Controller
            name='summary'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Career objective *'
                fullWidth
                multiline
                minRows={5}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Collapse>
    </Card>
  );
};

export default CareerInformation;
