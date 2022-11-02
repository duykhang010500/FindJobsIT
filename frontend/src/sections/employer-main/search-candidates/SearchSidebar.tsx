import React from 'react';

import {
  Card,
  Typography,
  TextField,
  MenuItem,
  Stack,
  Button,
} from '@mui/material';
import { Controller } from 'react-hook-form';
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
};

const SearchSidebar = (props: Props) => {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant='h4' sx={{ mb: 3 }}>
        Filter
      </Typography>
      <Stack spacing={3}>
        <Controller
          name='degree'
          control={props.control}
          render={({ field }) => (
            <TextField {...field} select label='Degree' fullWidth size='small'>
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
        <Controller
          name='level'
          control={props.control}
          render={({ field }) => (
            <TextField {...field} select label='Level' fullWidth size='small'>
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
              {languages.map((item: any) => {
                return (
                  <MenuItem key={item.id} value={item.value}>
                    {item.value}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        />
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
        <Controller
          name='salary_from'
          control={props.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type='number'
              label='Salary from'
              size='small'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name='salary_to'
          control={props.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type='number'
              label='Salary to'
              size='small'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name='exp_from'
          control={props.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type='number'
              label='Experience from'
              size='small'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name='exp_to'
          control={props.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type='number'
              label='Experience to'
              size='small'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name='age_from'
          control={props.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type='number'
              label='Age from'
              size='small'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name='age_to'
          control={props.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type='number'
              label='Age to'
              size='small'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Stack direction='row' spacing={2}>
          <Button variant='outlined' fullWidth onClick={props.reset}>
            Clear
          </Button>
          <Button variant='contained' fullWidth type='submit'>
            Search
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SearchSidebar;
