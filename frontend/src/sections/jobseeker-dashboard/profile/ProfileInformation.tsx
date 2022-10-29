import { useState } from 'react';
import { Controller } from 'react-hook-form';

import {
  Card,
  Stack,
  Radio,
  Collapse,
  MenuItem,
  FormLabel,
  TextField,
  RadioGroup,
  Typography,
  FormControl,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { Nationalities } from '../../../utils/defaultValues';
import { Gender } from '../../../models/gender';
import { Marital } from '../../../models/marital';

type Props = {
  control: any;
  setValue: any;
  getValues: any;
};

const genderOptions = [
  { label: 'Male', id: 1 },
  { label: 'Female', id: 2 },
];

const maritalOptions = [
  { label: 'Single', id: 1 },
  { label: 'Married', id: 2 },
];

const ProfileInformation = ({ control, setValue, getValues }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  const { locations } = useSelector((state: AppState) => state.location);

  const { currentUser } = useSelector((state: AppState) => state.auth);

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
          Profile
        </Typography>
        {open ? (
          <ExpandMoreIcon sx={{ color: '#FA541C' }} />
        ) : (
          <ExpandLessIcon sx={{ color: '#FA541C' }} />
        )}
      </Stack>
      <Collapse in={open}>
        <Stack spacing={4} sx={{ mt: 3 }}>
          <Stack direction='row' spacing={4}>
            <Controller
              name='fullname'
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <TextField
                    {...field}
                    label='Full name *'
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                );
              }}
            />
            <Controller
              name='phone'
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <TextField
                    {...field}
                    label='Phone *'
                    type='number'
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                );
              }}
            />
          </Stack>
          <Stack direction='row' spacing={4}>
            <Controller
              name='birthday'
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <DesktopDatePicker
                    {...field}
                    label='Birthday *'
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
            <Controller
              name='email'
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <TextField
                    {...field}
                    disabled
                    label='Email *'
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                );
              }}
            />
          </Stack>
          <Stack direction='row' spacing={4}>
            <Controller
              name='gender'
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <FormControl fullWidth>
                    <FormLabel>Gender *</FormLabel>
                    <RadioGroup {...field} row>
                      {genderOptions.map((gender: Gender) => {
                        return (
                          <FormControlLabel
                            control={<Radio />}
                            key={gender.id}
                            value={gender.id}
                            label={gender.label}
                          />
                        );
                      })}
                    </RadioGroup>
                    <FormHelperText error>{error?.message}</FormHelperText>
                  </FormControl>
                );
              }}
            />
            <Controller
              name='marital'
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <FormControl fullWidth>
                    <FormLabel>Marital status *</FormLabel>
                    <RadioGroup {...field} row>
                      {maritalOptions.map((marital: Marital) => {
                        return (
                          <FormControlLabel
                            control={<Radio />}
                            key={marital.id}
                            value={marital.id}
                            label={marital.label}
                          />
                        );
                      })}
                    </RadioGroup>
                    <FormHelperText error={!!error}>
                      {error?.message}
                    </FormHelperText>
                  </FormControl>
                );
              }}
            />
          </Stack>
          <Stack direction='row' spacing={4}>
            <Controller
              name='nationality'
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Autocomplete
                    {...field}
                    id='nationality'
                    fullWidth
                    options={Nationalities}
                    getOptionLabel={(country) => country.name || ''}
                    renderOption={(props, country) => (
                      <MenuItem {...props}>{country.name}</MenuItem>
                    )}
                    onChange={(_, options) => {
                      setValue('nationality', options);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Nationality *'
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                );
              }}
            />
            <Controller
              name='city'
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Autocomplete
                    {...field}
                    fullWidth
                    freeSolo
                    options={locations}
                    getOptionLabel={(location) => location.name || ''}
                    renderOption={(props, location) => (
                      <MenuItem {...props} key={location.id}>
                        {location.name}
                      </MenuItem>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='City *'
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                    onChange={(_, options) => {
                      setValue('city', options);
                    }}
                  />
                );
              }}
            />
          </Stack>
          <Controller
            name='address'
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  {...field}
                  label='Address *'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              );
            }}
          />
        </Stack>
      </Collapse>
    </Card>
  );
};

export default ProfileInformation;
