import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '@mui/material';

import Hero from '../layouts/JobSeeker/Hero';
import NewJobs from '../sections/home/jobseeker/NewJobs';
import TopCompany from '../sections/home/jobseeker/TopCompany';
import TopCategories from '../sections/home/jobseeker/TopCategories';

import { AppState } from '../store/reducer';
import { getJobs } from '../store/jobs/actions';
import { getCompanies } from '../store/companies/action';

type Props = {};

const Home: React.FC = (props: Props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isLoading } = useSelector((state: AppState) => state.jobs);

  useEffect(() => {
    if (!pathname.includes('/employer')) {
      // dispatch(getJobs(1));
      dispatch(getCompanies());
    }
  }, [dispatch]);

  return (
    <>
      <Hero />
      <TopCompany />
      <TopCategories />
      {/* {isLoading ? <></> : <NewJobs />} */}
      <NewJobs />
    </>
  );
};

export default Home;
