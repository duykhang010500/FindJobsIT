import React from 'react';

import {
  Grid,
  Typography,
  Container,
  Box,
  styled,
  Stack,
  Link,
} from '@mui/material';

import BgFooter from '../../assets/images/footer-bg.png';

import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

type Props = {};

const FooterWrapper = styled(Box)({
  marginTop: '40px',
  padding: '30px 0px 30px 0px',
  backgroundImage: `url(${BgFooter})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const Footer: React.FC<Props> = () => {
  return (
    <FooterWrapper>
      <Container>
        <Grid container spacing={3} justifyContent='space-between'>
          <Grid item xs={6} md={3} justifyContent='space-around'>
            <Typography variant='h4' gutterBottom fontWeight={700}>
              About Us
            </Typography>
            <Stack direction='column' spacing={0.6}>
              <Typography
                variant='body2'
                gutterBottom
                component={Link}
                href='/'
              >
                Home
              </Typography>
              <Typography
                variant='body2'
                gutterBottom
                component={Link}
                href='/'
              >
                Contact Us
              </Typography>
              <Typography
                variant='body2'
                gutterBottom
                component={Link}
                href='/'
              >
                All Jobs
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant='h4' gutterBottom fontWeight={700}>
              Term and condition
            </Typography>
            <Stack direction='column' spacing={0.6}>
              <Typography
                variant='body2'
                gutterBottom
                component={Link}
                href='/'
              >
                Operating Regulation
              </Typography>
              <Typography
                variant='body2'
                gutterBottom
                component={Link}
                href='/'
              >
                Complaint Handling
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant='h4' gutterBottom fontWeight={700}>
              For Employers
            </Typography>
            <Stack direction='column' spacing={0.6}>
              <Typography
                variant='body2'
                gutterBottom
                component={Link}
                href='/'
              >
                Post a job
              </Typography>
              <Typography
                variant='body2'
                gutterBottom
                component={Link}
                href='/'
              >
                Interview
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant='h4' gutterBottom fontWeight={700}>
              Social
            </Typography>
            <Stack direction={'row'} spacing={2}>
              <FacebookIcon fontSize='large' sx={{ color: '#4267B2' }} />
              <YouTubeIcon fontSize='large' sx={{ color: '#FF0000' }} />
              <TwitterIcon fontSize='large' sx={{ color: '#1DA1F2' }} />
            </Stack>
          </Grid>
        </Grid>

        <Typography variant='h4' textAlign='center' fontWeight={700}>
          &copy; {new Date().getFullYear()} HCMUTE
        </Typography>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
