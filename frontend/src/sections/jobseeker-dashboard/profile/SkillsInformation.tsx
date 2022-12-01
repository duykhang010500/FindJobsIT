import { useState } from 'react';
import { Controller } from 'react-hook-form';

import {
  Card,
  Stack,
  Button,
  Rating,
  Tooltip,
  Collapse,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { GiSkills } from 'react-icons/gi';

import { skills } from '../../../utils/defaultValues';

type Props = {
  control: any;
  fields: any;
  append: any;
  remove: any;
};

const SkillsInformation = ({ control, fields, append, remove }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Card sx={{ p: 3 }}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      >
        <Stack direction='row' alignItems='center'>
          <GiSkills
            style={{ marginRight: '20px', fontSize: '50px', color: '#69b1ff' }}
          />
          <Typography variant='h3' color='#172642' fontWeight={700}>
            Skills <span style={{ color: 'red' }}>*</span>
          </Typography>
        </Stack>
        {open ? (
          <ExpandMoreIcon sx={{ color: '#172642' }} />
        ) : (
          <ExpandLessIcon sx={{ color: '#172642' }} />
        )}
      </Stack>
      <Collapse in={open}>
        <Stack spacing={3} sx={{ mt: 5 }}>
          {fields.map((skill: any, index: number) => (
            <Stack
              direction='row'
              spacing={3}
              alignItems='center'
              key={skill.id}
            >
              <Controller
                control={control}
                name={`skills[${index}].name`}
                defaultValue={skill.name}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <Autocomplete
                      {...field}
                      freeSolo
                      fullWidth
                      options={skills}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Name *'
                          error={Boolean(error)}
                          helperText={error?.message}
                        />
                      )}
                      onChange={(_, value) => field.onChange(value)}
                    />
                  );
                }}
              />

              <Controller
                control={control}
                name={`skills[${index}].skills_level`}
                defaultValue={Number(skill.skills_level)}
                render={({ field }) => <Rating {...field} />}
              />
              {fields.length > 1 && (
                <IconButton onClick={() => remove(index)}>
                  <DeleteIcon sx={{ color: '#ff4d4f' }} />
                </IconButton>
              )}
            </Stack>
          ))}

          <Button
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={() => append({ name: '', skills_level: 1 })}
          >
            Add skill
          </Button>
        </Stack>
      </Collapse>
    </Card>
  );
};

export default SkillsInformation;
