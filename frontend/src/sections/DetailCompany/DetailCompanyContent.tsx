import React from 'react';

import { Box, Typography, Grid, Card } from '@mui/material';

type Props = {};

const DetailCompanyContent = (props: Props) => {
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
        Introduce
      </Typography>
      <Card sx={{ p: 3, mt: 4 }}>
        <Typography>Gioi thieu ne</Typography>
      </Card>
    </Box>
  );
};

export default DetailCompanyContent;
