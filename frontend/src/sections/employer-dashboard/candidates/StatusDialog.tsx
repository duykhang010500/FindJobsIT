import React, { useEffect, useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { useDispatch } from 'react-redux';
import {
  closeStatusDialog,
  updateStatus,
} from '../../../store/candidates/action';

type Props = {};

const StatusDialog = (props: Props) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState<any>('');

  const [defaultStatus, setDefaultStatus] = useState<string>('');

  const { isOpenStatusDialog, selectedCandidate } = useSelector(
    (state: AppState) => state.candidates
  );

  const handleChangeStatus = (status: string) => {
    console.log('Change status: ', status);
    setStatus(status);
  };

  const handleUpdateStatus = () => {
    dispatch(updateStatus(selectedCandidate?.id, { status }));
  };

  useEffect(() => {
    setDefaultStatus(selectedCandidate?.status);
  }, selectedCandidate);

  return (
    <Dialog
      fullWidth
      open={isOpenStatusDialog}
      onClose={() => {
        dispatch(closeStatusDialog());
      }}
    >
      <DialogTitle>
        <Typography variant='h4' component='span'>
          Update candidate status
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          select
          label='Status'
          size='medium'
          fullWidth
          sx={{ mt: 2 }}
          defaultValue={selectedCandidate?.status || 'New'}
          onChange={(e: any) => handleChangeStatus(e.target.value)}
        >
          <MenuItem value='New'>New</MenuItem>
          <MenuItem value='Short listed'>Short listed</MenuItem>
          <MenuItem value='Interview'>Interview</MenuItem>
          <MenuItem value='Offer'>Offered</MenuItem>
          <MenuItem value='Hire'>Hire</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={() => dispatch(closeStatusDialog())}
        >
          Close
        </Button>
        <LoadingButton
          variant='contained'
          startIcon={<SaveIcon />}
          onClick={handleUpdateStatus}
        >
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default StatusDialog;
