import { FC, Fragment, SyntheticEvent, useState } from 'react';
import {
  Card,
  Tab,
  Container,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import JobDescriptionHeader from '../sections/JobDescription/JobDescriptionHeader';
import JobInformation from '../sections/JobDescription/JobInformation';
import CompanyInfo from '../sections/JobDescription/CompanyInformation';
import OtherJob from '../sections/JobDescription/OtherJobs';
import JobLocationMap from '../sections/JobDescription/JobLocationMap';
import SearchBar from '../components/SearchBar';

type Props = {};

const JobDescription: FC<Props> = () => {
  const [tabActive, setTabActive] = useState('1');

  const handleChangeTab = (e: SyntheticEvent, newValue: string) => {
    setTabActive(newValue);
  };

  return (
    <Fragment>
      <Container sx={{ mt: 15 }}>
        <SearchBar />
        <Breadcrumbs
          sx={{ mb: 5, mt: 5, '&.MuiTypography-root': { fontWeight: 600 } }}
          separator='›'
          aria-label='breadcrumb'
        >
          <Link component={RouterLink} to={`/`} color='primary'>
            Home
          </Link>
          <Link component={RouterLink} to={`/`} color='primary'>
            Job
          </Link>
          <Typography>Front-end developer</Typography>
        </Breadcrumbs>
        <JobDescriptionHeader />
        <Grid container spacing={4} sx={{ mt: 3 }}>
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
