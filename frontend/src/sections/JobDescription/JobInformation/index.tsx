import { Stack } from '@mui/material';

import JobBenefit from './JobBenefit';
import JobDescription from './JobDescription';
import JobOverview from './JobOverview';
import JobRequirement from './JobRequirement';

type Props = {};

const JobInformation = (props: Props) => {
  return (
    <Stack spacing={3}>
      <JobOverview />
      <JobBenefit />
      <JobDescription />
      <JobRequirement />
    </Stack>
  );
};

export default JobInformation;
