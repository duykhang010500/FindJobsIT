import React from 'react';

import { Box, Button, Typography, Grid } from '@mui/material';

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { StarTwoTone } from '@mui/icons-material';
import JobCard from '../../../components/JobCard';

type Props = {};

const DetailCompanyListJobs = (props: Props) => {
  const { company } = useSelector((state: AppState) => state.companies);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {company?.jobs?.slice(0, 6)?.map((job: any, index: number) => {
          if (job?.status === 1) {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <JobCard job={job} />
              </Grid>
            );
          }
        })}
      </Grid>
      {/* <Button variant='outlined' sx={{ mx: 'auto', mt: 3, display: 'flex' }}>
        View more
      </Button> */}
    </Box>
  );
};

export default DetailCompanyListJobs;
