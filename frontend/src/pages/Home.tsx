import React from 'react';
import { Container } from '@mui/material';

import SearchBar from '../components/SearchBar';
// import Hero from '../layouts/JobSeeker/Hero';

type Props = {};

const Home: React.FC = (props: Props) => {
  return (
    <Container sx={{ paddingTop: 15 }}>
      <SearchBar />
      {/* <Hero /> */}
    </Container>
  );
};

export default Home;
