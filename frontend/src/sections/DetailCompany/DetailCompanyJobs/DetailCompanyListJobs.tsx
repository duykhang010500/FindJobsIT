import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

type Props = {};

const DetailCompanyListJobs = (props: Props) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography>List</Typography>
      {/* <Button
        variant='outlined'
        sx={{ mx: 'auto', mt: 3, display: 'flex' }}
        endIcon={<MoreHorizRoundedIcon />}
      >
        View more
      </Button> */}
    </Box>
  );
};

export default DetailCompanyListJobs;
