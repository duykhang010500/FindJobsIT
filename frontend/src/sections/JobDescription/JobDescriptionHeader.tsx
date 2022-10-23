import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import {
  Grid,
  Card,
  Link,
  Stack,
  Button,
  styled,
  Typography,
} from '@mui/material';

import UpdateIcon from '@mui/icons-material/Update';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { AppState } from '../../store/reducer';
import ApplyForm from './ApplyForm';

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
  const { job } = useSelector((state: AppState) => state.jobs);

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            src={`${job?.company?.logo}`}
            alt='logo'
            sx={{
              width: '120px',
              height: '120px',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #d9d9d9',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={9} md={6}>
          <Stack spacing={1}>
            <Typography variant='h2' fontWeight={600} color='primary' noWrap>
              {job?.title}
            </Typography>
            <Link component={RouterLink} to={`/`}>
              <Typography variant='h4'>{job?.company.name}</Typography>
            </Link>
            <Typography variant='body2' color='rgb(99, 115, 129)'>
              <UpdateIcon sx={{ verticalAlign: 'middle' }} /> Expiration date:
              None
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Stack
            sx={{
              padding: {
                xs: '0px 30px',

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
              onClick={handleOpen}
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
      <ApplyForm job={job} open={open} close={handleClose} />
    </RootStyle>
  );
};

export default JobDescriptionHeader;
