import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import JobCard from '../../components/JobCard';
import { jobsData } from '../../mock/jobsData';
import { AppState } from '../../store/reducer';
type Props = {};

const OtherJobs = (props: Props) => {
  const { otherJobs } = useSelector((state: AppState) => state.jobs);
  return (
    <Grid container spacing={2}>
      {otherJobs.map((job: any, index: number) => {
        return (
          <Grid item xs={12} sm={6} key={index}>
            <JobCard job={job} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default OtherJobs;
