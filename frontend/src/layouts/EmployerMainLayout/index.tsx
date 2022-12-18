import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Footer from '../common/Footer';
import Header from '../common/Header/Header';

type Props = {};

const EmployerMainLayout = (props: Props) => {
  return (
    <>
      <Header />
      <Box sx={{ py: 13 }}>
        <Container>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default EmployerMainLayout;
