import { useState } from 'react';
import { Controller } from 'react-hook-form';

import {
  styled,
  Box,
  Card,
  Alert,
  Radio,
  Stack,
  Switch,
  Avatar,
  Tooltip,
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
import Image from '../../../components/Image';

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

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

const AvatarUploadWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  margin: 'auto',
  padding: '5px',
  width: '144px',
  height: '144px',
  borderRadius: '50%',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.12)',
  '& > div': {
    width: '100%',
    height: '100%',
  },
});

const UploadButton = styled('label')({
  zIndex: 2,
  top: -5,
  right: 2,
  width: 35,
  height: 35,
  borderRadius: '100%',
  backgroundColor: '#fff',
  position: 'absolute',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.12)',
});

const ProfileInformation = ({ control, setValue, getValues }: Props) => {
  const [avt, setAvt] = useState<any>();

  const [errorAvt, setErrorAvt] = useState<string>('');

  const [open, setOpen] = useState<boolean>(true);

  const { locations } = useSelector((state: AppState) => state.location);

  const { currentUser } = useSelector((state: AppState) => state.auth);

  const handleChangeAvatar = (e: any) => {
    const supportMineType = ['jpeg', 'png', 'jpg'];

    const file = e.target.files[0];

    if (!supportMineType.includes(file.type.split('/')[1])) {
      setErrorAvt('Incorrect file type!');
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      setErrorAvt('Image must be < 1MB!');
      return;
    }
    setAvt(file);

    setValue('avatar', e.target.files[0]);
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
        <Typography variant='h3' color='#172642'>
          Profile
        </Typography>
        {open ? (
          <ExpandMoreIcon sx={{ color: '#172642' }} />
        ) : (
          <ExpandLessIcon sx={{ color: '#172642' }} />
        )}
      </Stack>
      <Collapse in={open}>
        <Stack spacing={4} sx={{ mt: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <AvatarUploadWrapper>
              <input
                id='upload'
                type='file'
                style={{ display: 'none' }}
                onChange={handleChangeAvatar}
              />
              <Tooltip title='Upload avatar' placement='top'>
                <UploadButton htmlFor='upload' onClick={() => setErrorAvt('')}>
                  <ModeEditOutlineIcon sx={{ fontSize: '17px' }} />
                </UploadButton>
              </Tooltip>
              {currentUser?.avatar !== 'none' && !avt ? (
                <Avatar src={currentUser?.avatar || 'none'} />
              ) : avt ? (
                <Image
                  alt='avt'
                  src={URL.createObjectURL(avt)}
                  sx={{ borderRadius: '50%' }}
                />
              ) : (
                <Avatar />
              )}
            </AvatarUploadWrapper>
            <Typography
              variant='subtitle2'
              sx={{ color: 'silver', textAlign: 'center', marginTop: '10px' }}
            >
              Allowed *.jpg, *.png, *.jpge
              <br />
              {`File size < 1MB`}
            </Typography>
            <FormControlLabel
              sx={{
                color: '#595959',
              }}
              control={
                <Controller
                  control={control}
                  name='resume_status'
                  render={({ field }) => (
                    <Switch {...field} checked={field.value ? true : false} />
                  )}
                />
              }
              label='Public profile'
            />
          </Box>
          {errorAvt && <Alert severity='error'>{errorAvt}</Alert>}

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
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
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
