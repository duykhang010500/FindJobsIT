import { useState } from 'react';

import {
  Card,
  Stack,
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Typography,
  Collapse,
  MenuItem,
} from '@mui/material';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { Controller } from 'react-hook-form';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type Props = {
  control: any;
};

const genderOptions = [
  { label: 'Male', value: 1 },
  { label: 'Female', value: 2 },
];

const ProfileInformation = ({ control }: Props) => {
  const [open, setOpen] = useState<boolean>(true);
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
              name='firstname'
              control={control}
              render={({ field }) => {
                return <TextField {...field} label='First name' fullWidth />;
              }}
            />
            <Controller
              name='lastname'
              control={control}
              render={({ field }) => {
                return <TextField {...field} label='Last name' fullWidth />;
              }}
            />
          </Stack>
          <Stack direction='row' spacing={4}>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => {
                return <TextField {...field} label='Phone' fullWidth />;
              }}
            />
            <Controller
              name='birthday'
              control={control}
              render={({ field }) => {
                return (
                  <DesktopDatePicker
                    {...field}
                    label='Birthday'
                    inputFormat='MM/DD/YYYY'
                    renderInput={(props) => <TextField {...props} fullWidth />}
                  />
                );
              }}
            />
          </Stack>
          <Stack direction='row' spacing={4}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => {
                return <TextField {...field} label='Email' fullWidth />;
              }}
            />
            <Controller
              name='birthday'
              control={control}
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup {...field} row>
                      <FormControlLabel
                        value='female'
                        control={<Radio />}
                        label='Male'
                      />
                      <FormControlLabel
                        value='male'
                        control={<Radio />}
                        label='Male'
                      />
                    </RadioGroup>
                  </FormControl>
                );
              }}
            />
          </Stack>
          <Stack direction='row' spacing={4}>
            <Controller
              name='gender'
              control={control}
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <FormLabel>Marital status</FormLabel>
                    <RadioGroup {...field} row>
                      <FormControlLabel
                        value='Single'
                        control={<Radio />}
                        label='single'
                      />
                      <FormControlLabel
                        value='married'
                        control={<Radio />}
                        label='Married'
                      />
                    </RadioGroup>
                  </FormControl>
                );
              }}
            />
          </Stack>
          <Stack direction='row' spacing={4}>
            <Controller
              name='nationality'
              control={control}
              render={({ field }) => {
                return (
                  <TextField {...field} select label='Nationality' fullWidth>
                    <MenuItem></MenuItem>
                  </TextField>
                );
              }}
            />
            <Controller
              name='city'
              control={control}
              render={({ field }) => {
                return (
                  <TextField {...field} select label='City' fullWidth>
                    <MenuItem></MenuItem>
                  </TextField>
                );
              }}
            />
          </Stack>
          <Controller
            name='address'
            control={control}
            render={({ field }) => {
              return <TextField {...field} label='Address' fullWidth />;
            }}
          />
        </Stack>
      </Collapse>
    </Card>
  );
};

export default ProfileInformation;
