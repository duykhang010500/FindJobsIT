import React from 'react';

import {
  Grid,
  Typography,
  Container,
  Box,
  styled,
  Divider,
  Stack,
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
            <Typography variant='subtitle2' gutterBottom>
              Home
            </Typography>
            <Typography variant='subtitle2' gutterBottom>
              Contact Us
            </Typography>
            <Typography variant='subtitle2' gutterBottom>
              All Jobs
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant='body1' gutterBottom fontWeight={700}>
              Term and condition
            </Typography>
            <Typography variant='subtitle2' gutterBottom>
              Operating Regulation
            </Typography>
            <Typography variant='subtitle2' gutterBottom>
              Complaint Handling
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant='body1' gutterBottom fontWeight={700}>
              For Employers
            </Typography>
            <Typography variant='subtitle2' gutterBottom>
              Post a job
            </Typography>
            <Typography variant='subtitle2' gutterBottom>
              Interview
            </Typography>
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
