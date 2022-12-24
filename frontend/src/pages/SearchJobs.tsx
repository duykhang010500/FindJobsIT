import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  Stack,
  Link,
  Breadcrumbs,
} from '@mui/material';

import JobCard from '../components/JobCard';
// import SearchBar from '../components/SearchBar';
import JobCardSkeleton from '../components/Skeleton/JobCardSkeleton';

import { AppState } from '../store/reducer';

import { useSearchBar } from '../components/SearchBar/useSearchBar';

type Props = {};

const SearchJobs = (props: Props) => {
  // const { jobsSearch, isLoading } = useSelector(
  //   (state: AppState) => state.jobs
  // );

  const { search, renderButtonLoadMore } = useSearchBar();

  const { jobsSearch, isLoading } = useSelector(
    (state: AppState) => state.jobs
  );

  // return <p>Search</p>;
  // return <SearchBar />;

  return (
    <Container sx={{ p: 15 }}>
      <Card
        sx={{ my: 2, p: 2, backgroundColor: '#fff', display: 'inline-block' }}
      >
        <Breadcrumbs
          sx={{ '&.MuiTypography-root': { fontWeight: 600 } }}
          separator='›'
          aria-label='breadcrumb'
        >
          <Link component={RouterLink} to={`/`}>
            Home
          </Link>
          <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
            Jobs
          </Typography>
        </Breadcrumbs>
      </Card>
      <Card sx={{ p: 5 }}>{search()}</Card>
      {isLoading ? (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {[...Array(9)].map((_, idx: number) => (
            <Grid item md={4} key={idx}>
              <JobCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Stack direction='row' justifyContent='center'>
            <Card
              sx={{
                backgroundColor: '#fff',
                p: 2,
                my: 3,
                display: 'inline-block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Typography variant='h4'>
                <Typography
                  variant='h3'
                  component='span'
                  fontWeight={700}
                  sx={{ color: '#ff4d4f', mr: 1 }}
                >
                  {jobsSearch?.totalItems}
                </Typography>
                Jobs founded
              </Typography>
            </Card>
          </Stack>
          <Grid container spacing={3}>
            {jobsSearch?.items?.map((job: any) => {
              return (
                <Grid key={job.id} item xs={12} md={4}>
                  <JobCard job={job} />
                </Grid>
              );
            })}
          </Grid>
          {/* <p>siuu</p> */}
          <Stack justifyContent={'center'} direction='row' mt={2}>
            {renderButtonLoadMore()}
          </Stack>
        </>
      )}
    </Container>
  );
};

export default SearchJobs;
