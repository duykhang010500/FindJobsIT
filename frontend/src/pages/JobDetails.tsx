import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { FC, Fragment, useState, useEffect, SyntheticEvent } from 'react';

import {
  Box,
  Tab,
  Card,
  Grid,
  Link,
  Container,
  Typography,
  Breadcrumbs,
} from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

import OtherJob from '../sections/JobDescription/OtherJobs';
import JobInformation from '../sections/JobDescription/JobInformation';
import JobLocationMap from '../sections/JobDescription/JobLocationMap';
import CompanyInfo from '../sections/JobDescription/CompanyInformation';
import JobDescriptionHeader from '../sections/JobDescription/JobDescriptionHeader';

import { AppState } from '../store/reducer';
import {
  getJob,
  getJobs,
  getJobsApplied,
  getOtherJobs,
} from '../store/jobs/actions';
import DetailJobSkeleton from '../sections/JobDescription/DetailJobSkeleton';
import { getMyCV } from '../store/cv/actions';
import { getJobsSaved } from '../store/jobsSaved/action';

type Props = {};

const JobDescription: FC<Props> = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [hasDetail, setHasDetail] = useState<boolean>(false);

  const [tabActive, setTabActive] = useState('1');

  const { isLoading, job } = useSelector((state: AppState) => state.jobs);

  useEffect(() => {
    dispatch(getJob(id));
    dispatch(getJobs(1));
    dispatch(getJobsSaved());
    dispatch(getJobsApplied());
    dispatch(getOtherJobs(Number(id)));
    dispatch(getMyCV());
  }, [dispatch, id]);

  if (isLoading) {
    return <DetailJobSkeleton />;
  }

  if (!job) {
    return (
      <Container sx={{ mt: 15 }}>
        <p>Page not found</p>
      </Container>
    );
  }

  const handleChangeTab = (e: SyntheticEvent, newValue: string) => {
    setTabActive(newValue);
  };

  return (
    <Fragment>
      <Container sx={{ p: 12 }}>
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
            <Link component={RouterLink} to={`/jobs`}>
              Jobs
            </Link>
            <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
              {job?.title}
            </Typography>
          </Breadcrumbs>
        </Card>
        <JobDescriptionHeader />
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={12} md={8}>
            <Card>
              <TabContext value={tabActive}>
                <TabList
                  variant='scrollable'
                  scrollButtons={false}
                  onChange={handleChangeTab}
                  sx={{
                    mb: 5,
                    '&.MuiTabs-root': {
                      background: '#f4f6f8',
                      marginBottom: 2,
                    },
                  }}
                >
                  <Tab label='Job Description' value='1' />
                  <Tab label='Company Information' value='2' />
                  <Tab label='Other Jobs' value='3' />
                </TabList>
                <TabPanel value='1'>
                  <JobInformation />
                </TabPanel>
                <TabPanel value='2'>
                  <CompanyInfo />
                </TabPanel>
                <TabPanel value='3'>
                  <OtherJob />
                </TabPanel>
              </TabContext>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <JobLocationMap />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default JobDescription;
