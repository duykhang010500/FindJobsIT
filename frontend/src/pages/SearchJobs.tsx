import React from 'react';

import { Container, Grid, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import { useSelector } from 'react-redux';
import { AppState } from '../store/reducer';
import JobCard from '../components/JobCard';
import JobCardSkeleton from '../components/Skeleton/JobCardSkeleton';

type Props = {};

const SearchJobs = (props: Props) => {
  const { jobsSearch, isLoading } = useSelector(
    (state: AppState) => state.jobs
  );

  return (
    <Container sx={{ mt: 15 }}>
      <SearchBar />
      {isLoading ? (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {[...Array(3)].map((_, idx: number) => (
            <Grid item md={4}>
              <JobCardSkeleton key={idx} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Typography variant='h4' sx={{ mt: 3 }}>
            {jobsSearch.length} Jobs founded
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {jobsSearch.map((job: any) => {
              return (
                <Grid key={job.id} item xs={12} md={4}>
                  <JobCard job={job} />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default SearchJobs;
