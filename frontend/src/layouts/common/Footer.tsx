import React from 'react';

import {
  Grid,
  Typography,
  Container,
  Box,
  styled,
  Divider,
  Stack,
  Link,
} from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

type Props = {};

const FooterWrapper = styled(Box)({
  marginTop: '40px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  padding: '30px 0px 20px 0px',
  borderRadius: '20px 20px 0 0',
});

const Footer: React.FC<Props> = () => {
  return (
    <FooterWrapper>
      <Container>
        <Grid container spacing={3} justifyContent='space-between'>
          <Grid item xs={6} md={3} justifyContent='space-around'>
            <Typography variant='body1' gutterBottom fontWeight={700}>
              About Us
            </Typography>
            <Stack direction='column' spacing={0.6}>
              <Typography
                variant='subtitle2'
                gutterBottom
                component={Link}
                href='/'
              >
                Home
              </Typography>
              <Typography
                variant='subtitle2'
                gutterBottom
                component={Link}
                href='/'
              >
                Contact Us
              </Typography>
              <Typography
                variant='subtitle2'
                gutterBottom
                component={Link}
                href='/'
              >
                All Jobs
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant='body1' gutterBottom fontWeight={700}>
              Term and condition
            </Typography>
            <Stack direction='column' spacing={0.6}>
              <Typography
                variant='subtitle2'
                gutterBottom
                component={Link}
                href='/'
              >
                Operating Regulation
              </Typography>
              <Typography
                variant='subtitle2'
                gutterBottom
                component={Link}
                href='/'
              >
                Complaint Handling
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant='body1' gutterBottom fontWeight={700}>
              For Employers
            </Typography>
            <Stack direction='column' spacing={0.6}>
              <Typography
                variant='subtitle2'
                gutterBottom
                component={Link}
                href='/'
              >
                Post a job
              </Typography>
              <Typography
                variant='subtitle2'
                gutterBottom
                component={Link}
                href='/'
              >
                Interview
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant='body1' gutterBottom fontWeight={700}>
              Social
            </Typography>
            <Stack direction={'row'} spacing={2}>
              <FacebookIcon fontSize='large' sx={{ color: '#4267B2' }} />
              <YouTubeIcon fontSize='large' sx={{ color: '#FF0000' }} />
              <TwitterIcon fontSize='large' sx={{ color: '#1DA1F2' }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{ margin: '20px 0px' }} />
      <Typography variant='body1' textAlign='center' fontWeight={700}>
        &copy; {new Date().getFullYear()} HCMUTE
      </Typography>
    </FooterWrapper>
  );
};

export default Footer;
