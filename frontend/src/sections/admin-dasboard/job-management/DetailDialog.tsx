import React from 'react';

import { DialogTitle, DialogContent, DialogActions } from '@mui/material';

type Props = {
  job: any;
  onClose: () => void;
};

const DetailDialog = ({ job, onClose }: Props) => {
  return (
    <div>
      <DialogTitle>Detail</DialogTitle>
      <DialogContent>cc</DialogContent>
    </div>
  );
};

export default DetailDialog;
