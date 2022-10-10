import React from 'react';
import { Stack, Typography, Box } from '@mui/material';

import Image from '../../../components/Image';

import FSoftLogo from '../../../assets/images/FSoft_logo.png';

type Props = {};

const SidebarCompanyAvatar = (props: Props) => {
  return (
    <Stack spacing={2}>
      <Typography variant='h3' align='center' gutterBottom>
        FPT Software
      </Typography>
      <Image
        src={`${FSoftLogo}`}
        alt={`logo`}
        sx={{
          margin: 'auto !important',
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '1px solid #f2f4f5',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItem: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h5'>Following</Typography>
        <Typography variant='h5'>69</Typography>
      </Box>
    </Stack>
  );
};

export default SidebarCompanyAvatar;
