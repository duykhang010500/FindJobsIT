import { Grid, Container } from '@mui/material';

import Image from '../../../components/Image';
import JobSeekerLoginForm from '../../../sections/auth/jobseeker/JobSeekerLoginForm';

import HiringImage from '../../../assets/images/Hiring.svg';

type Props = {};

const JobSeekerLogin = (props: Props) => {
  return (
    <Container sx={{ py: 15 }}>
      <Grid container spacing={3} alignItems='center'>
        <Grid item xs={12} md={6} display={{ xs: 'none', md: 'block' }}>
          <Image src={HiringImage} alt='img-left' />
        </Grid>
        <Grid item xs={12} md={6}>
          <JobSeekerLoginForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobSeekerLogin;
