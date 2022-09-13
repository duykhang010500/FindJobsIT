import React from 'react';
import { Typography, Box, styled } from '@mui/material';
import CompanyList from './CompanyList';

type Props = {};

const TopCompanyWrapper = styled(Box)({
  marginTop: '20px',
  textAlign: 'center',
});

const TopCompany: React.FC = (props: Props) => {
  return (
    <TopCompanyWrapper>
      <Typography gutterBottom variant='h4' fontWeight={700}>
        Top company
      </Typography>
      <CompanyList />
    </TopCompanyWrapper>
  );
};

export default TopCompany;
