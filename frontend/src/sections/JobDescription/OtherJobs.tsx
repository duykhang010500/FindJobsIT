import { Grid } from '@mui/material';

import JobCard from '../../components/JobCard';
import { jobsData } from '../../mock/jobsData';
type Props = {};

const OtherJobs = (props: Props) => {
  return (
    <Grid container spacing={2}>
      {/* {jobsData.map((job, index) => {
        return (
          <Grid item xs={12} sm={6} key={index}>
            <JobCard job={job} isSmall={true} />
          </Grid>
        );
      })} */}
    </Grid>
  );
};

export default OtherJobs;
