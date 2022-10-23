import React, { useState } from 'react';

import { Card, Typography, Stack, TextField, Collapse } from '@mui/material';

import { Controller } from 'react-hook-form';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
        <Typography variant='h3' color='primary'>
          Education
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
              name='edu_school'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='School' fullWidth />
              )}
            />
            <Controller
              name='edu_certify'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='edu_certify' fullWidth />
              )}
            />
          </Stack>
          <Stack direction='row' spacing={4}>
            <Controller
              name='edu_date_start'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='edu_date_start' fullWidth />
              )}
            />
            <Controller
              name='edu_date_end'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='edu_date_end' fullWidth />
              )}
            />
          </Stack>
          <Stack direction='row' spacing={4}>
            <Controller
              name='edu_current_end'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='edu_current_end' fullWidth />
              )}
            />
            <Controller
              name='edu_description'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='edu_description' fullWidth />
              )}
            />
          </Stack>
        </Stack>
      </Collapse>
    </Card>
  );
};

export default EducationInformation;
