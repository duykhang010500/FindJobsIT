import React from 'react';
import { Box, Card, Grid, Typography, styled } from '@mui/material';

import { FaUser } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import StatisticsMap from './StatisticsMap';

type Props = {};

const CardStyle = styled(Card)({
  padding: '20px 40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: 'none',
  border: '2px solid #f2f4f5',
});

const IconWrapperStyle = styled(Box)({
  width: 64,
  height: 64,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
});

const Statistics = (props: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={6}>
        <CardStyle>
          <Box>
            <Typography variant='h1' gutterBottom sx={{ color: '#40a9ff' }}>
              99
            </Typography>
            <Typography variant='h5' color='#8c8c8c'>
              Candidates
            </Typography>
          </Box>
          <IconWrapperStyle
            sx={{
              backgroundColor: '#e6f7ff',
            }}
          >
            <FaUser
              style={{
                height: 30,
                width: 30,
                color: '#40a9ff',
              }}
            />
          </IconWrapperStyle>
        </CardStyle>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <CardStyle>
          <Box>
            <Typography variant='h1' gutterBottom sx={{ color: '#ffc53d' }}>
              99
            </Typography>
            <Typography variant='h5' color='#8c8c8c'>
              Jobs
            </Typography>
          </Box>
          <IconWrapperStyle
            sx={{
              backgroundColor: '#fff1b8',
            }}
          >
            <MdWork
              style={{
                height: 30,
                width: 30,
                color: '#ffc53d',
              }}
            />
          </IconWrapperStyle>
        </CardStyle>
      </Grid>
      <Grid item xs={12}>
        <StatisticsMap />
      </Grid>
    </Grid>
  );
};

export default Statistics;
