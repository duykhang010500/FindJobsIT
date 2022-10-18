import { Container, Grid } from '@mui/material';
import Image from '../../../components/Image';
import HiringImage from '../../../assets/images/Hiring.svg';
import JobSeekerRegisterForm from '../../../sections/auth/jobseeker/JobSeekerRegisterForm';

type Props = {};

const JobSeekerRegister = (props: Props) => {
  return (
    <Container sx={{ mt: 15 }}>
      <Grid container spacing={3} alignItems='center'>
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Image src={HiringImage} alt='img-left' />
        </Grid>
        <Grid item xs={12} md={6}>
          <JobSeekerRegisterForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobSeekerRegister;
