import React from 'react';

import { Grid } from '@mui/material';
import DetailCompanyOfficesAddress from './DetailCompanyOfficesAddress';

type Props = {};

const DetailCompanyOffices = (props: Props) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={4}>
        <DetailCompanyOfficesAddress />
      </Grid>
      <Grid item md={8}></Grid>
    </Grid>
  );
};

export default DetailCompanyOffices;
