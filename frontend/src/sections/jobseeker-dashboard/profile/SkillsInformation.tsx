import { useState } from 'react';
import { Controller } from 'react-hook-form';

import {
  Card,
  Stack,
  Collapse,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { skills } from '../../../utils/defaultValues';

type Props = {
  control: any;
};

const SkillsInformation = ({ control }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Card sx={{ p: 3 }}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ cursor: 'pointer', ...(open && { mb: 2 }) }}
        onClick={() => setOpen(!open)}
      >
        <Typography variant='h4'>Skills</Typography>
        {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Stack>
      <Collapse in={open}>
        <Controller
          control={control}
          name='skills'
          render={({ field, fieldState: { error } }) => {
            return (
              <Autocomplete
                {...field}
                freeSolo
                multiple
                options={skills}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Skill *'
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
                onChange={(_, value) => field.onChange(value)}
              />
            );
          }}
        />
      </Collapse>
    </Card>
  );
};

export default SkillsInformation;
