import React from 'react';

import { Box, Typography } from '@mui/material';

import { AiOutlineInbox } from 'react-icons/ai';

type Props = {};

const Nodata = (props: Props) => {
  return (
    <Box
      sx={{
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <AiOutlineInbox style={{ fontSize: 50, color: '#bfbfbf' }} />
      <Typography variant='body1' sx={{ color: '#bfbfbf' }}>
        No data
      </Typography>
    </Box>
  );
};

export default Nodata;
