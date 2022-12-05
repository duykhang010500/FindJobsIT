import React from 'react';

import { Typography, Box, Card } from '@mui/material';

import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';

type Props = {};

const DetailCompanyOfficesAddress = (props: Props) => {
  return (
    <Box>
      <Typography
        variant='h3'
        gutterBottom
        fontWeight={600}
        textAlign='center'
        textTransform='uppercase'
        sx={{ color: '#001d66' }}
      >
        Office locations
      </Typography>
      <Card sx={{ backgroundColor: '#fff', p: 3, borderRadius: 2, mt: 3 }}>
        <Typography>
          <PlaceRoundedIcon
            sx={{ color: '#ff4d4f', verticalAlign: 'middle', mr: 2 }}
          />
          So 1 vo van ngan
        </Typography>
      </Card>
    </Box>
  );
};

export default DetailCompanyOfficesAddress;
