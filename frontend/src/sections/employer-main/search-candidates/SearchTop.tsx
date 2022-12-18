import React from 'react';

import { Grid, TextField, Autocomplete, Button } from '@mui/material';

import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';

type Props = {
  control: any;
};

const SearchTop = (props: Props) => {
  const { locations } = useSelector((state: AppState) => state.location);

  const { industries } = useSelector((state: AppState) => state.industries);

  return (
    <Grid container spacing={2} justifyContent='space-between' sx={{ mb: 5 }}>
      <Grid item xs={12} md={3}>
        <Controller
          control={props.control}
          name='keywords'
          render={({ field }) => {
            return <TextField {...field} fullWidth label='Key word' />;
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Controller
          control={props.control}
          name='locations'
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              {...field}
              id='locations'
              multiple
              options={locations}
              getOptionLabel={(location: any) => location.name.trim()}
              renderInput={(params) => (
                <TextField
                  {...params}
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
      </Grid>
      <Grid item xs={12} md={3}>
        <Controller
          control={props.control}
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
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          type='submit'
          fullWidth
          size='large'
          variant='contained'
          sx={{ height: '53px' }}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchTop;
