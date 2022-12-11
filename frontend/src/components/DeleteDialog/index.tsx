import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from '@mui/material';

import Typography from '@mui/material/Typography';
import NotListedLocationRoundedIcon from '@mui/icons-material/NotListedLocationRounded';

type Props = {
  title?: string;
  isOpen: boolean;
  content: React.ReactNode;
  onCancel: () => void;
  onDoAction: () => void;
};

const DeleteDialog = ({
  isOpen,
  title,
  content,
  onCancel,
  onDoAction,
}: Props) => {
  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth>
      <DialogTitle>
        <Typography variant='h3' component={'span'}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack alignItems='center' spacing={2}>
          <NotListedLocationRoundedIcon
            sx={{
              width: 100,
              height: 100,
              color: '#ff4d4f',
              backgroundColor: '#fff1f0',
              borderRadius: '50%',
              padding: 1,
            }}
          />
          <Typography variant='h4'>{content}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onCancel}>
          Cancel
        </Button>
        <Button variant='contained' onClick={onDoAction}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
