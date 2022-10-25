import { useSelector } from 'react-redux';
import { Box, styled, Grid, Pagination, Stack } from '@mui/material';

import JobCard from '../../../../components/JobCard';
import { jobsData } from '../../../../mock/jobsData';
import { AppState } from '../../../../store/reducer';

type Props = {};

const JobListWrapper = styled(Box)({
  marginTop: 20,
  marginBottom: 20,
});

const JobList = (props: Props) => {
  const { jobs } = useSelector((state: AppState) => state.jobs);

  return (
    <JobListWrapper>
      <Grid container spacing={4}>
        {jobs.map((job: any, index: any) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <JobCard job={job} />
            </Grid>
          );
        })}
      </Grid>
      <Stack alignItems='center' sx={{ margin: '30px 0px' }}>
        <Pagination count={10} color='primary' />
      </Stack>
    </JobListWrapper>
  );
};

export default JobList;
