import React from 'react';

import { Box, Typography } from '@mui/material';
import DetailCompanyListJobs from './DetailCompanyListJobs';

type Props = {};

const DetailCompanyJobs = (props: Props) => {
  return (
    <Box>
      <Typography
        variant='h3'
        gutterBottom
        fontWeight={600}
        textAlign='center'
        textTransform='uppercase'
        sx={{ color: '#001d66' }}
      >
        Jobs
      </Typography>
      <DetailCompanyListJobs />
    </Box>
  );
};

export default DetailCompanyJobs;
