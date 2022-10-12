import React from 'react';
import { IconButton, Avatar } from '@mui/material';

type Props = {};

const HeaderAccount = (props: Props) => {
  return (
    <IconButton>
      <Avatar
        sx={{
          height: 30,
          width: 30,
        }}
      />
    </IconButton>
  );
};

export default HeaderAccount;
