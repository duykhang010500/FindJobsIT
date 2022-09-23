import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  styled,
  Grid,
  Stack,
  Typography,
  Button,
  Card,
  Link,
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import UpdateIcon from '@mui/icons-material/Update';

type Props = {};

const RootStyle = styled(Card)({
  // marginTop: '150px',
  padding: '30px 10px',
  borderRadius: '8px',
  boxShadow:
    'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
});

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const JobDescriptionHeader = (props: Props) => {
  return (
    <RootStyle>
      <Grid
        container
        alignItems='center'
        spacing={3}
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      >
        <Grid item xs={12} sm={3} md={3}>
          <Img
            src='https://cdn.topcv.vn/80/company_logos/fpt-software-6073b38a10cb4.jpg'
            alt='logo'
          />
        </Grid>
        <Grid item xs={12} sm={9} md={6}>
          <Stack spacing={1}>
            <Typography variant='h5' fontWeight={600} color='primary' noWrap>
              Front-end developer
            </Typography>
            <Link component={RouterLink} to={`/`}>
              <Typography variant='h6'>FPT Software</Typography>
            </Link>
            <Typography variant='body2' color='rgb(99, 115, 129)'>
              <UpdateIcon sx={{ verticalAlign: 'middle' }} /> Expiration date:
              1/1/2000
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Stack
            sx={{
              padding: {
                xs: '0px 30px',
                // sm: '0px 100px',
                md: '0px',
                lg: '0px 50px',
              },
            }}
            direction='column'
            spacing={2.5}
          >
            <Button
              size='large'
              variant='contained'
              startIcon={<IntegrationInstructionsIcon />}
            >
              Apply now
            </Button>
            <Button
              variant='outlined'
              size='large'
              startIcon={<FavoriteBorderIcon />}
            >
              Save Job
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </RootStyle>
  );
};

export default JobDescriptionHeader;
