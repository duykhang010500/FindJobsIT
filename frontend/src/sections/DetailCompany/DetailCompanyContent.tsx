import React from 'react';

import { Box, Typography, Grid } from '@mui/material';

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
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Typography>Cover image</Typography>
        </Grid>
        <Grid item md={6}>
          <Typography>This is best company</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailCompanyContent;
