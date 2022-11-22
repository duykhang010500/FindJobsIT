import React, { useState } from 'react';

import { Card, Typography, Stack, TextField, Collapse } from '@mui/material';

import { Controller } from 'react-hook-form';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Editor from '../../../components/Editor';

type Props = {
  control: any;
};

const EducationInformation = ({ control }: Props) => {
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
        <Typography variant='h3' color='#172642'>
          Education
        </Typography>
        {open ? (
          <ExpandMoreIcon sx={{ color: '#172642' }} />
        ) : (
          <ExpandLessIcon sx={{ color: '#172642' }} />
        )}
      </Stack>
      <Collapse in={open}>
        <Stack spacing={4} sx={{ mt: 3 }}>
          <Stack direction='row' spacing={4}>
            <Controller
              name='edu_school'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label='School/Major *'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name='edu_certify'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label='Certificate/Diploma *'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction='row' spacing={4}>
            <Controller
              name='edu_date_start'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DesktopDatePicker
                  {...field}
                  label='Time start *'
                  inputFormat='DD/MM/YYYY'
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name='edu_date_end'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DesktopDatePicker
                  {...field}
                  label='Time end'
                  inputFormat='DD/MM/YYYY'
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
              Education detail *
            </Typography>
            <Controller
              name='edu_description'
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

export default EducationInformation;
