import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Grid, Card, Box } from '@mui/material';

import Sidebar from './Sidebar';
import Footer from '../common/Footer';
import Header from '../common/Header/Header';

type Props = {};

const EmployerDashboardLayout = (props: Props) => {
  return (
    <Box sx={{ backgroundColor: '#f8f9ff' }}>
      <Header />
      <Container sx={{ pt: 13 }} disableGutters>
        <Grid container spacing={2}>
          <Grid item md={3.5}>
            <Sidebar />
          </Grid>
          <Grid item md={8.5}>
            <Card sx={{ p: 3 }}>
              <Outlet />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default EmployerDashboardLayout;
