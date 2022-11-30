import React from 'react';

import { Typography, styled, Container, Box } from '@mui/material';
import CategoriesList from './CategoriesList';

type Props = {};

const TopCategoriesWrapper = styled(Box)({
  marginTop: '50px',
  backgroundColor: '#fff',
});

const TopCategories = (props: Props) => {
  return (
    <TopCategoriesWrapper>
      <Container>
        <Typography
          variant='h2'
          fontWeight={700}
          align='center'
          textTransform='uppercase'
          color='rgb(255,153,0)'
        >
          top categories
        </Typography>
        <CategoriesList />
      </Container>
    </TopCategoriesWrapper>
  );
};

export default TopCategories;
