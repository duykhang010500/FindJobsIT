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

type Props = {};

const DetailCompanyHeading = (props: Props) => {
  return (
    <Box sx={{ marginTop: '-100px' }}>
      <Card sx={{ p: 3 }}>
        <Grid container alignItems='center'>
          <Grid item md={2}>
            <Avatar sx={{ width: 100, height: 100 }} />
          </Grid>
          <Grid item md={8}>
            <Typography
              variant='h3'
              textTransform='uppercase'
              gutterBottom
              fontWeight={600}
              sx={{ color: '#001d66' }}
            >
              FPT
            </Typography>
            <Typography gutterBottom>
              <PlaceRoundedIcon
                sx={{ verticalAlign: 'middle', mr: 2, color: '#ff4d4f' }}
              />
              ho chi minh
            </Typography>
            <Typography gutterBottom>
              <LanguageRoundedIcon
                sx={{ verticalAlign: 'middle', mr: 2, color: '#69b1ff' }}
              />
              ho chi minh
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Button variant='contained' startIcon={<BookmarkRoundedIcon />}>
              Follow
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default DetailCompanyHeading;
