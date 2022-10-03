import React from 'react';
import { Container, Grid } from '@mui/material';

import RegisterForm from '../../../sections/auth/employer/RegisterForm';
import Banner from '../../../sections/auth/employer/Banner';

type Props = {};

const Register = (props: Props) => {
  return (
    <Container sx={{ mt: 15 }}>
      <Grid container spacing={3} alignItems='flex-start'>
        <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Banner />
        </Grid>
        <Grid item xs={12} md={6}>
          <RegisterForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
