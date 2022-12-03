import React from 'react';

import { Container, Skeleton, Stack, Card, Grid } from '@mui/material';

type Props = {};

const DetailJobSkeleton = (props: Props) => {
  return (
    <Container sx={{ p: 12 }}>
      <Stack spacing={3}>
        <Skeleton
          variant='text'
          animation='pulse'
          sx={{ fontSize: '3rem', width: 250, height: 60 }}
        />
        <Skeleton
          variant='rounded'
          animation='pulse'
          sx={{
            width: '100%',
            height: 200,
          }}
        />
      </Stack>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item md={8}>
          <Skeleton
            animation='pulse'
            variant='rounded'
            sx={{
              width: '100%',
              height: 300,
            }}
          />
        </Grid>
        <Grid item md={4}>
          <Skeleton
            animation='pulse'
            variant='rounded'
            sx={{
              width: '100%',
              height: 300,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailJobSkeleton;
