import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Grid, Card, Box } from '@mui/material';
import JobSeekerDashboardSidebar from './JobSeekerDashboardSidebar';

type Props = {};

const JobSeekerDashboardLayout = (props: Props) => {
  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      <Container sx={{ mt: 11 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, position: 'sticky', top: '86px' }}>
              <JobSeekerDashboardSidebar />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default JobSeekerDashboardLayout;
