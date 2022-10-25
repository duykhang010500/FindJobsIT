import { useState } from 'react';
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

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { Controller } from 'react-hook-form';
import { AppState } from '../../../store/reducer';
import { degreeTypes, jobLevel, jobTypes } from '../../../utils/defaultValues';
import Editor from '../../../components/Editor';

type Props = {
  control: any;
  setValue: any;
};

const CareerInformation = ({ control, setValue }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  const [showSalary, setShowSalary] = useState<boolean>(true);

  const { industries } = useSelector((state: AppState) => state.industries);

  const { locations } = useSelector((state: AppState) => state.location);

  const handleChangeTypeSalary = (e: any) => {
    setValue('salary_unit', e.target.value);
    if (e.target.value === 'VND') {
      setShowSalary(false);
    } else {
      setShowSalary(true);
      setValue('salary_from', 0);
      setValue('salary_to', 0);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        onClick={() => setOpen(!open)}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant='h3' color='primary'>
          Career information
        </Typography>
        {open ? (
          <ExpandMoreIcon sx={{ color: '#FA541C' }} />
        ) : (
          <ExpandLessIcon sx={{ color: '#FA541C' }} />
        )}
      </Stack>
      <Collapse in={open}>
        <Stack spacing={4} sx={{ mt: 3 }}>
          <Stack spacing={4} direction='row'>
            <Controller
              name='current_position'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Current Position' fullWidth />
              )}
            />
            <Controller
              name='resume_title'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Job title' fullWidth />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='current_company'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Current company' fullWidth />
              )}
            />
            <Controller
              name='yearofexperience'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='number'
                  label='Year of experience'
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='current_level'
              control={control}
              render={({ field }) => (
                <TextField {...field} select label='Current level' fullWidth>
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
              render={({ field }) => (
                <TextField {...field} select label='Level' fullWidth>
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
                      label='Industries'
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
                      label='Locations'
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
          </Stack>
          <Controller
            name='salary_unit'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label='Salary unit'
                fullWidth
                onChange={handleChangeTypeSalary}
              >
                <MenuItem value={'Negotiate'}>Negotiate</MenuItem>
                <MenuItem value={'VND'}>VND</MenuItem>
              </TextField>
            )}
          />
          <Stack spacing={4} direction='row'>
            <Controller
              name='salary_from'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='number'
                  label='Salary from'
                  fullWidth
                  disabled={showSalary}
                />
              )}
            />
            <Controller
              name='salary_to'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Salary to'
                  type='number'
                  fullWidth
                  disabled={showSalary}
                />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='current_degree'
              control={control}
              render={({ field }) => (
                <TextField {...field} select label='Current degree' fullWidth>
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
              render={({ field }) => (
                <TextField {...field} select label='Working type' fullWidth>
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
            {/* <Controller
              name='languages'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Languages' fullWidth />
              )}
            /> */}
          </Stack>
          <Controller
            name='summary'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Career objective'
                fullWidth
                multiline
                minRows={5}
              />
            )}
          />
          <Stack spacing={4} direction='row'>
            <Controller
              name='rexp_title'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Position title' fullWidth />
              )}
            />
            <Controller
              name='rexp_company'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Companies' fullWidth />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='rexp_date_start'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DesktopDatePicker
                  {...field}
                  label='Date start'
                  inputFormat='MM/DD/YYYY'
                  renderInput={(params) => (
                    <TextField fullWidth {...params} error={!!error} />
                  )}
                />
              )}
            />
            <Controller
              name='rexp_date_end'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DesktopDatePicker
                  {...field}
                  label='Date end'
                  inputFormat='MM/DD/YYYY'
                  renderInput={(params) => (
                    <TextField fullWidth {...params} error={!!error} />
                  )}
                />
              )}
            />
          </Stack>
          <div>
            <Typography
              variant='h5'
              gutterBottom
              sx={{ color: 'rgb(99, 115, 129)' }}
            >
              Experience
            </Typography>
            <Controller
              name='rexp_description'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Editor
                  id='exp_desc'
                  value={field.value}
                  onChange={field.onChange}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </div>
        </Stack>
      </Collapse>
    </Card>
  );
};

export default CareerInformation;
