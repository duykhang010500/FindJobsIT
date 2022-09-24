import { Box, styled } from '@mui/material';

import React from 'react';

type Props = {};

const JobCardWrapper = styled(Box)({});

const JobCardImg = styled('img')({
  display: 'block',
});

const JobCard = () => {
  return <JobCardWrapper></JobCardWrapper>;
};

const OtherJobs = (props: Props) => {
  return <div>OtherJobs</div>;
};

export default OtherJobs;
