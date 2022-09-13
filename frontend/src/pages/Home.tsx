import React from 'react';
import { Container } from '@mui/material';

import TopCompany from '../sections/home/TopCompany';
import NewJobs from '../sections/home/NewJobs';
import Hero from '../layouts/JobSeeker/Hero';

type Props = {};

const Home: React.FC = (props: Props) => {
  return (
    <>
      <Hero />
      <Container>
        <TopCompany />
        <NewJobs />
      </Container>
    </>
  );
};

export default Home;
