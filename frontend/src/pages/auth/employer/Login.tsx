import React from 'react';
import { Container, Grid } from '@mui/material';
import Banner from '../../../sections/auth/employer/Banner';
import LoginForm from '../../../sections/auth/employer/LoginForm';

type Props = {};

const Login = (props: Props) => {
  return (
    <Container sx={{ mt: 1 }}>
      <Grid container direction='row' spacing={3} alignItems='center'>
        <Grid item md={6} display={{ xs: 'none', md: 'block' }}>
          <Banner />
        </Grid>
        <Grid item xs={12} md={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
