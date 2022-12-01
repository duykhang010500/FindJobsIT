import { useState } from 'react';

import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  Tooltip,
  Collapse,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';

import { Controller } from 'react-hook-form';

import Editor from '../../../components/Editor';

import { GiAchievement } from 'react-icons/gi';

type Props = {
  control: any;
  // setValue: any;
  fields: any;
  remove: any;
  append: any;
};

const ExperienceInformation = ({ control, fields, remove, append }: Props) => {
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
        <Stack direction='row' alignItems='center'>
          <GiAchievement
            style={{ marginRight: '20px', fontSize: '50px', color: '#69b1ff' }}
          />
          <Typography variant='h3' color='#172642' fontWeight={700}>
            Experience
          </Typography>
        </Stack>
        {open ? (
          <ExpandMoreIcon sx={{ color: '#172642' }} />
        ) : (
          <ExpandLessIcon sx={{ color: '#172642' }} />
        )}
      </Stack>
      <Collapse in={open}>
        {fields.map((exp: any, index: number) => (
          <Stack spacing={4} key={exp.id}>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'right' }}>
              {fields.length > 1 && (
                <Tooltip placement='left' title='Remove'>
                  <IconButton onClick={() => remove(index)}>
                    <DeleteIcon sx={{ color: '#ff4d4f' }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            <Stack spacing={4} direction='row'>
              <Controller
                name={`experiences[${index}].rexp_title`}
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
                name={`experiences[${index}].rexp_company`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label='Company *'
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
            <Stack spacing={4} direction='row'>
              <Controller
                name={`experiences[${index}].rexp_date_start`}
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
                name={`experiences[${index}].rexp_date_end`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DesktopDatePicker
                    {...field}
                    label='Date end'
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
            </Stack>
            <div>
              <Typography
                variant='h5'
                gutterBottom
                sx={{ color: 'rgb(99, 115, 129)', ml: 1.4 }}
              >
                Description *
              </Typography>
              <Controller
                name={`experiences[${index}].rexp_description`}
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
            <Divider />
          </Stack>
        ))}

        <Stack sx={{ mt: 3 }}>
          <Button
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={() =>
              append({
                rexp_title: '',
                rexp_company: '',
                rexp_date_start: '',
                rexp_date_end: null,
                rexp_description: '',
                rexp_current_end: null,
              })
            }
          >
            Add experience
          </Button>
        </Stack>
      </Collapse>
    </Card>
  );
};

export default ExperienceInformation;
