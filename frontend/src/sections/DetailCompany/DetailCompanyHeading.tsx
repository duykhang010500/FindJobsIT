import React from 'react';

import {
  Box,
  Typography,
  Avatar,
  Stack,
  Card,
  Grid,
  Button,
} from '@mui/material';

import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';

type Props = {};

const DetailCompanyHeading = (props: Props) => {
  const { company } = useSelector((state: AppState) => state.companies);

  return (
    <Box sx={{ marginTop: '-100px' }}>
      <Card sx={{ p: 3 }}>
        <Grid container alignItems='center'>
          <Grid item md={2}>
            <Avatar sx={{ width: 100, height: 100 }} src={company?.logo} />
          </Grid>
          <Grid item md={8}>
            <Typography
              variant='h3'
              textTransform='uppercase'
              gutterBottom
              fontWeight={600}
              sx={{ color: '#001d66' }}
            >
              {company?.name}
            </Typography>
            <Typography gutterBottom>
              <PlaceRoundedIcon
                sx={{ verticalAlign: 'middle', mr: 2, color: '#ff4d4f' }}
              />
              {company?.location_name}
            </Typography>
            <Typography gutterBottom>
              <LanguageRoundedIcon
                sx={{ verticalAlign: 'middle', mr: 2, color: '#69b1ff' }}
              />
              {company?.website}
            </Typography>
          </Grid>
          <Grid item md={2}>
            {/* <Button variant='contained' startIcon={<BookmarkRoundedIcon />}>
              Follow
            </Button> */}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default DetailCompanyHeading;
