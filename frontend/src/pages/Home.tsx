import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container } from '@mui/material';

import NewJobs from '../sections/home/jobseeker/NewJobs';
import Hero from '../layouts/JobSeeker/Hero';
import TopCompany from '../sections/home/jobseeker/TopCompany';

import { getJobs } from '../store/jobs/actions';

type Props = {};

const Home: React.FC = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

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
