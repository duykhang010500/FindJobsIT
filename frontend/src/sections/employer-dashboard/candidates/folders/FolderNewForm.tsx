import React, { useEffect, useMemo } from 'react';

import {
  Stack,
  Dialog,
  Button,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../store/reducer';
import {
  closeForm,
  createFolder,
  updateFolder,
} from '../../../../store/folders/action';
import { Folder } from '../../../../store/folders/types';

type Props = {};

const FolderNewForm = (props: Props) => {
  const dispatch = useDispatch();

  const { isOpen, selectedFolder } = useSelector(
    (state: AppState) => state.folders
  );

  const validate = yup.object({
    name: yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: selectedFolder?.name || '',
      is_private: 0,
    }),
    [selectedFolder]
  );

  const { control, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validate),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [selectedFolder, reset]);

  const onSubmit = (formValues: Folder) => {
    console.log('Form values: ', formValues);
    if (selectedFolder) {
      dispatch(updateFolder(Number(selectedFolder.id), formValues));
    } else {
      dispatch(createFolder(formValues));
      reset();
    }
  };

  const handleClose = () => {
    dispatch(closeForm());
    reset();
  };

  return (
    <Dialog open={isOpen} fullWidth onClose={handleClose}>
      <DialogTitle>
        <Typography variant='h4' component='span'>
          Create new folder
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            <Controller
              control={control}
              name='name'
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Folder name *'
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>
            Close
          </Button>

          <Button
            type='submit'
            variant='contained'
            startIcon={<SaveRoundedIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FolderNewForm;
