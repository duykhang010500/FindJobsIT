import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../common/Footer';
import Header from '../common/Header/Header';

import { Box, Container } from '@mui/material';

type Props = {};

const JobSeekerLayout = (props: Props) => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default JobSeekerLayout;
