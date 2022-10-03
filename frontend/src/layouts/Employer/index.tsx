import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

import Footer from '../common/Footer';
import Header from '../common/Header/Header';
import Sidebar from './Sidebar';

type Props = {};

const EmployerLayout = (props: Props) => {
  return (
    <Fragment>
      <Header />
      <Container sx={{ mt: 15 }}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Sidebar />
          </Grid>
          <Grid item md={8}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default EmployerLayout;
