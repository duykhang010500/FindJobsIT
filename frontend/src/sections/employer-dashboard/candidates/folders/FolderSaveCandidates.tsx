import React, { useEffect, useMemo } from 'react';

import {
  Alert,
  Stack,
  Dialog,
  Button,
  MenuItem,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { useForm, Controller } from 'react-hook-form';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { useDispatch } from 'react-redux';
import { getFolders } from '../../../../store/folders/action';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store/reducer';
import { Folder } from '../../../../store/folders/types';
import { useNavigate, useParams } from 'react-router-dom';
import { closeModal } from '../../../../store/location/actions';
import {
  closeSaveCandidateModal,
  saveCandidate,
} from '../../../../store/candidates/action';

type Props = {};

const FolderSaveCandidates = (props: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { folders } = useSelector((state: AppState) => state.folders);

  const defaultValues = useMemo(
    () => ({
      // employer_folder_id: 37,
    }),
    []
  );

  const { control, handleSubmit } = useForm({});

  const { isOpenSaveModal } = useSelector(
    (state: AppState) => state.candidates
  );

  const { id } = useParams();

  const onSubmit = (formValues: any) => {
    console.log('Form values: ', formValues);
    dispatch(saveCandidate(Number(id), formValues));
  };

  return (
    <Dialog
      fullWidth
      open={isOpenSaveModal}
      onClose={() => dispatch(closeSaveCandidateModal())}
    >
      <DialogTitle>
        <Typography variant='h4'>Save candidate</Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {folders.length > 0 ? (
            <Controller
              control={control}
              name='employer_folder_id'
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label='Folder *'
                  placeholder='Select folder'
                >
                  {folders.map((folder: Folder) => (
                    <MenuItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          ) : (
            <Stack spacing={2}>
              <Alert severity='warning'>
                Create folder to save your candidates
              </Alert>
              <Button
                variant='contained'
                onClick={() => {
                  navigate('/employer/hr/folders');
                  dispatch(closeSaveCandidateModal());
                }}
              >
                Create now
              </Button>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Button
              variant='outlined'
              onClick={() => dispatch(closeSaveCandidateModal())}
            >
              Close
            </Button>
            <Button
              type='submit'
              startIcon={<SaveRoundedIcon />}
              variant='contained'
              disabled={folders.length === 0}
            >
              Save
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FolderSaveCandidates;
