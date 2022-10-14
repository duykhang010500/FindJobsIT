import React from 'react';
import { Container } from '@mui/material';

import TopCompany from '../sections/home/jobseeker/TopCompany';
import NewJobs from '../sections/home/jobseeker/NewJobs';
import Hero from '../layouts/JobSeeker/Hero';

type Props = {};

const Home: React.FC = (props: Props) => {
  return (
    <>
      <Hero />
      <TopCompany />
      <Container>
        <NewJobs />
      </Container>
    </>
  );
};

export default Home;
