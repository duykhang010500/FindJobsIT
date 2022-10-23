import { useState } from 'react';

import { Card, Typography, Stack, TextField, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Controller } from 'react-hook-form';

type Props = {
  control: any;
};

const CareerInformation = ({ control }: Props) => {
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
                <TextField {...field} label='Current level' fullWidth />
              )}
            />
            <Controller
              name='level'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='number' label='Level' fullWidth />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='industries'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Industries' fullWidth />
              )}
            />
            <Controller
              name='location'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='number'
                  label='Location'
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='salary_unit'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Salary unit' fullWidth />
              )}
            />
            <Controller
              name='salary_from'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='number'
                  label='Salary from'
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='salary_to'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Salary to' fullWidth />
              )}
            />
            <Controller
              name='current_degree'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Current degree' fullWidth />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='working_type'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Working type' fullWidth />
              )}
            />
            <Controller
              name='languages'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Languages' fullWidth />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='summary'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Summary' fullWidth />
              )}
            />
            <Controller
              name='rexp_title'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Rexp title' fullWidth />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='rexp_company'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='rexp_company' fullWidth />
              )}
            />
            <Controller
              name='rexp_date_start'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='rexp_date_start' fullWidth />
              )}
            />
          </Stack>
          <Stack spacing={4} direction='row'>
            <Controller
              name='rexp_date_end'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='rexp_date_end' fullWidth />
              )}
            />
            <Controller
              name='yearoferexp_descriptionxperience'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='rexp_description' fullWidth />
              )}
            />
          </Stack>
        </Stack>
      </Collapse>
    </Card>
  );
};

export default CareerInformation;
