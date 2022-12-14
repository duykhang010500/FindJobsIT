import React from 'react';

import {
  Card,
  Grid,
  Stack,
  Button,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

import { Controller } from 'react-hook-form';

import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import {
  degreeTypes,
  jobLevel,
  languages,
  Nationalities,
  resumeUpdateStatus,
  salaryUnits,
} from '../../../utils/defaultValues';

type Props = {
  control: any;
  reset: any;
  getValues: any;
  setValue: any;
};

const SearchSidebar = (props: Props) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <Controller
            name='degree'
            control={props.control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label='Degree'
                fullWidth
                size='small'
              >
                <MenuItem value=' '>All</MenuItem>
                {degreeTypes.map((item: any) => {
                  return (
                    <MenuItem key={item.id} value={item.label}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />
        </Grid>
        <Grid item md={3}>
          <Controller
            name='level'
            control={props.control}
            render={({ field }) => (
              <TextField {...field} select label='Level' fullWidth size='small'>
                <MenuItem value=' '>All</MenuItem>
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
        </Grid>
        <Grid item md={3}>
          <Controller
            name='language'
            control={props.control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label='Language'
                fullWidth
                size='small'
              >
                <MenuItem value=' '>All</MenuItem>
                {languages.map((item: any) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />
        </Grid>
        <Grid item md={3}>
          <Controller
            name='nationality'
            control={props.control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label='Nationality'
                fullWidth
                size='small'
                defaultValue={'Vietnam'}
              >
                <MenuItem value=' '>All</MenuItem>
                {Nationalities.map((item: any) => {
                  return (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />
        </Grid>
        <Grid item md={3}>
          <Controller
            name='resume_update'
            control={props.control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label='Resume update'
                fullWidth
                size='small'
              >
                <MenuItem value=' '>All</MenuItem>
                {resumeUpdateStatus.map((item: any) => {
                  return (
                    <MenuItem key={item.id} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />
        </Grid>
        <Grid item md={3}>
          <Controller
            name='salary_unit'
            control={props.control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label='Salary unit'
                fullWidth
                size='small'
                defaultValue={'VND'}
              >
                <MenuItem value=' '>All</MenuItem>
                {salaryUnits.map((item: any) => {
                  return (
                    <MenuItem key={item.id} value={item.value}>
                      {item.value}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />
        </Grid>
        <Grid item md={3}>
          <Controller
            name='salary_from'
            control={props.control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type='number'
                fullWidth
                label='Salary from'
                size='small'
                InputLabelProps={{
                  shrink: true,
                }}
                value={
                  props.getValues('salary_from') === 0
                    ? ''
                    : props.getValues('salary_from')
                }
                onChange={(e: any) =>
                  props.setValue('salary_from', e.target.value)
                }
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item md={3}>
          <Controller
            name='salary_to'
            control={props.control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type='number'
                fullWidth
                label='Salary to'
                size='small'
                error={!!error}
                helperText={error?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                value={
                  props.getValues('salary_to') === 0
                    ? ''
                    : props.getValues('salary_to')
                }
                onChange={(e: any) =>
                  props.setValue('salary_to', e.target.value)
                }
              />
            )}
          />
        </Grid>
        <Grid item md={3}>
          <Controller
            name='exp_from'
            control={props.control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type='number'
                fullWidth
                label='Experience from'
                size='small'
                error={!!error}
                helperText={error?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                value={
                  props.getValues('exp_from') === 0
                    ? ''
                    : props.getValues('exp_from')
                }
                onChange={(e: any) =>
                  props.setValue('exp_from', e.target.value)
                }
              />
            )}
          />
        </Grid>
        <Grid item md={3}>
          <Controller
            name='exp_to'
            control={props.control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type='number'
                fullWidth
                label='Experience to'
                size='small'
                error={!!error}
                helperText={error?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                value={
                  props.getValues('exp_to') === 0
                    ? ''
                    : props.getValues('exp_to')
                }
                onChange={(e: any) => props.setValue('exp_to', e.target.value)}
              />
            )}
          />
        </Grid>
        <Grid item md={3}>
          <Controller
            name='age_from'
            control={props.control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type='number'
                fullWidth
                label='Age from'
                size='small'
                error={!!error}
                helperText={error?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                value={
                  props.getValues('age_from') === 0
                    ? ''
                    : props.getValues('age_from')
                }
                onChange={(e: any) =>
                  props.setValue('age_from', e.target.value)
                }
              />
            )}
          />
        </Grid>
        <Grid item md={3}>
          <Controller
            name='age_to'
            control={props.control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type='number'
                fullWidth
                label='Age to'
                size='small'
                error={!!error}
                helperText={error?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                value={
                  props.getValues('age_to') === 0
                    ? ''
                    : props.getValues('age_to')
                }
                onChange={(e: any) => props.setValue('age_to', e.target.value)}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SearchSidebar;
