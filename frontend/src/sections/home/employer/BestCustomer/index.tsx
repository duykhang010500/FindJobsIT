import React from 'react';
import { Box, Typography } from '@mui/material';
import BestCustomerSlide from './BestCustomerSlide';

type Props = {};

const BestCustomer = (props: Props) => {
  return (
    <div data-aos='fade-left'>
      <Box sx={{ mt: 5 }}>
        <Box sx={{ padding: 1, borderLeft: '5px solid #ff4d4f' }}>
          <Typography variant='h3' textTransform='uppercase' color='primary'>
            Top companies on platform
          </Typography>
        </Box>
        <BestCustomerSlide />
      </Box>
    </div>
  );
};
export default BestCustomer;
