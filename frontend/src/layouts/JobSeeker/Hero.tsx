import React from 'react';
import { Box } from '@mui/material';
import SearchBar from '../../components/SearchBar';

type Props = {};

const Hero = (props: Props) => {
  return (
    <Box
      sx={{
        position: 'relative',
        padding: '300px 0',
        width: '100%',
        backgroundImage: `url(https://images.vietnamworks.com//logo/hero_vnw_empower_growth_banner_v2.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SearchBar />
    </Box>
  );
};

export default Hero;
