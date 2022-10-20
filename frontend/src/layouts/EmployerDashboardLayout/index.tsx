import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Grid, Card } from '@mui/material';

import Sidebar from './Sidebar';
import Footer from '../common/Footer';
import Header from '../common/Header/Header';

type Props = {};

const EmployerDashboardLayout = (props: Props) => {
  return (
    <Fragment>
      <Header />
      <Container sx={{ mt: 15 }}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Sidebar />
          </Grid>
          <Grid item md={8}>
            <Card sx={{ p: 3 }}>
              <Outlet />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default EmployerDashboardLayout;
