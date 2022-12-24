import { useSelector } from 'react-redux';
import {
  Box,
  styled,
  Grid,
  Pagination,
  Stack,
  Container,
  Skeleton,
} from '@mui/material';

import JobCard from '../../../../components/JobCard';
import { AppState } from '../../../../store/reducer';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getJobs } from '../../../../store/jobs/actions';
import { truncate } from 'lodash';

type Props = {};

const JobListWrapper = styled(Box)({
  marginTop: '50px',
});

const JobList = (props: Props) => {
  const { jobs, isLoading } = useSelector((state: AppState) => state.jobs);

  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getJobs(page));
  }, [page, dispatch]);

  console.log('Re-render');

  if (isLoading) {
    return (
      <JobListWrapper>
        <Container>
          <Grid container spacing={4}>
            {[...Array(9)].map((_, index: any) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  {/* <JobCard job={job} /> */}
                  <Stack spacing={1}>
                    <Stack alignItems={'center'} direction={'row'} spacing={2}>
                      <Skeleton variant='circular' width={40} height={40} />
                      <Skeleton
                        variant='text'
                        sx={{ fontSize: '1rem', width: '100%' }}
                      />
                    </Stack>
                    <Skeleton variant='rounded' width={'100%'} height={60} />
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
          <Stack alignItems='center' sx={{ margin: '30px 0px' }}>
            <Pagination
              count={jobs?.totalPages}
              color='primary'
              onChange={(_, page) => setPage(page)}
              page={jobs?.currentPage}
            />
          </Stack>
        </Container>
      </JobListWrapper>
    );
  }

  return (
    <JobListWrapper>
      <Container>
        <Grid container spacing={4}>
          {jobs?.items?.map((job: any, index: any) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <JobCard job={job} />
              </Grid>
            );
          })}
        </Grid>
        <Stack alignItems='center' sx={{ margin: '30px 0px' }}>
          <Pagination
            count={jobs?.totalPages}
            color='primary'
            onChange={(_, page) => setPage(page)}
            page={jobs?.currentPage}
          />
        </Stack>
      </Container>
    </JobListWrapper>
  );
};

export default JobList;
