import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Box, styled } from '@mui/material';

import StarIcon from '../../../../assets/images/star.png';

import CompanyList from './CompanyList';
import Image from '../../../../components/Image';

type Props = {};

const TopCompanyWrapper = styled(Box)({
  padding: '30px',
  marginTop: '50px',
  backgroundColor: '#fff',
});

const TopCompany: React.FC = (props: Props) => {
  return (
    <TopCompanyWrapper>
      <Typography
        variant='h2'
        align='center'
        textTransform='uppercase'
        sx={{ color: '#273167' }}
      >
        Top companies
      </Typography>
      <CompanyList />
    </TopCompanyWrapper>
  );
};

export default TopCompany;
