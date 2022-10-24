import React from 'react';

import { Container, Grid } from '@mui/material';
import SearchBar from '../components/SearchBar';
import { useSelector } from 'react-redux';
import { AppState } from '../store/reducer';
import JobCard from '../components/JobCard';

type Props = {};

const SearchJobs = (props: Props) => {
  const { jobsSearch } = useSelector((state: AppState) => state.jobs);

  return (
    <Container sx={{ mt: 15 }}>
      <SearchBar />
      <Grid container spacing={3} sx={{ mt: 5 }}>
        {jobsSearch.map((job: any) => {
          return (
            <Grid key={job.id} item xs={12} md={4}>
              <JobCard job={job} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default SearchJobs;
