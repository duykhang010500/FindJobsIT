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

import { Controller } from 'react-hook-form';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

import Editor from '../../../components/Editor';

type Props = {
  control: any;
  fields: any;
  remove: any;
  append: any;
};

const EducationInformation = ({ control, fields, append, remove }: Props) => {
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
          <SchoolOutlinedIcon
            style={{ marginRight: '20px', fontSize: '50px', color: '#69b1ff' }}
          />
          <Typography variant='h3' color='#172642' fontWeight={700}>
            Education Information <span style={{ color: 'red' }}>*</span>
          </Typography>
        </Stack>
        {open ? (
          <ExpandMoreIcon sx={{ color: '#172642' }} />
        ) : (
          <ExpandLessIcon sx={{ color: '#172642' }} />
        )}
      </Stack>
      <Collapse in={open}>
        {fields.map((edu: any, index: number) => (
          <div key={edu.id}>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'right' }}>
              {fields.length > 1 && (
                <Tooltip placement='left' title='Remove'>
                  <IconButton onClick={() => remove(index)}>
                    <DeleteIcon sx={{ color: '#ff4d4f' }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            <Stack spacing={4} sx={{ mt: 3 }}>
              <Stack direction='row' spacing={4}>
                <Controller
                  name={`educations[${index}].edu_school`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='School *'
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
                <Controller
                  name={`educations[${index}].edu_certify`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Degree/Certificate *'
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Stack>
              <Stack direction='row' spacing={4}>
                <Controller
                  name={`educations[${index}].edu_date_start`}
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
                  name={`educations[${index}].edu_date_end`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DesktopDatePicker
                      {...field}
                      label='Time end'
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
                  sx={{ color: 'rgb(99, 115, 129)' }}
                >
                  Education detail *
                </Typography>
                <Controller
                  name={`educations[${index}].edu_description`}
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
            <Divider sx={{ my: 3 }} />
          </div>
        ))}
        <Stack>
          <Button
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={() =>
              append({
                edu_school: '',
                edu_certify: '',
                edu_date_start: '',
                edu_date_end: null,
                edu_description: '',
                edu_current_end: null,
              })
            }
          >
            Add Education
          </Button>
        </Stack>
      </Collapse>
    </Card>
  );
};

export default EducationInformation;
