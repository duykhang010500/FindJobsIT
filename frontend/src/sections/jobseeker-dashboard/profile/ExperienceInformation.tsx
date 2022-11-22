import { useState } from 'react';

import { Card, Stack, Collapse, TextField, Typography } from '@mui/material';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { Controller } from 'react-hook-form';

import Editor from '../../../components/Editor';

type Props = {
  control: any;
  // setValue: any;
};

const ExperienceInformation = ({ control }: Props) => {
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
          Experience information
        </Typography>
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
              name='rexp_title'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label='Position title *'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name='rexp_company'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label='Companies *'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
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
                  label='Date start *'
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
              name='rexp_date_end'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DesktopDatePicker
                  {...field}
                  label='Date end'
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
              Experience *
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

export default ExperienceInformation;
