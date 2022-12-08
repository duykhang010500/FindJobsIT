import React from 'react';

import { Box, Typography, Grid, Card } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';

type Props = {};

const DetailCompanyContent = (props: Props) => {
  const { company } = useSelector((state: AppState) => state.companies);
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
        Introduce
      </Typography>
      <Card sx={{ p: 3, mt: 4 }}>
        <Typography>{company?.content}</Typography>
      </Card>
    </Box>
  );
};

export default DetailCompanyContent;
