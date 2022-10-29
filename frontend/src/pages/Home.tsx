import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Container } from '@mui/material';

import Hero from '../layouts/JobSeeker/Hero';
import NewJobs from '../sections/home/jobseeker/NewJobs';
import TopCompany from '../sections/home/jobseeker/TopCompany';

import { getJobs } from '../store/jobs/actions';
import { useSelector } from 'react-redux';
import { AppState } from '../store/reducer';

type Props = {};

const Home: React.FC = (props: Props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isLoading } = useSelector((state: AppState) => state.jobs);

  useEffect(() => {
    if (!pathname.includes('/employer')) {
      dispatch(getJobs());
    }
  }, [dispatch]);

  return (
    <>
      <Hero />
      <TopCompany />
      <Container>{isLoading ? <></> : <NewJobs />}</Container>
    </>
  );
};

export default Home;
