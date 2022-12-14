import React from 'react';
import { Box } from '@mui/material';
// import SearchBar from '../../components/SearchBar';

import { useSearchBar } from '../../components/SearchBar/useSearchBar';

type Props = {};

const Hero = (props: Props) => {
  const data = useSearchBar();

  // const search = data.Search;
  console.log('Data: ', data);

  const search = data.search;

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
        '&::before': {
          position: 'absolute',
          content: '" "',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          opacity: 0.2,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          padding: 5,
          backgroundColor: '#fff',
          borderRadius: '8px',
          position: 'absolute',
          marginTop: 25,
          width: '80vw',
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
        }}
        flexDirection='column'
      >
        <Box sx={{ zIndex: 2, position: 'relative' }}>{search()}</Box>
      </Box>
    </Box>
  );
};

export default Hero;
