import React from 'react';
import { Typography, Box, styled, Stack } from '@mui/material';

import CompanyList from './CompanyList';

type Props = {};

const TopCompanyWrapper = styled(Box)({
  marginTop: '40px',
  padding: '25px',
  textAlign: 'center',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
});

const TopCompany: React.FC = (props: Props) => {
  return (
    <TopCompanyWrapper>
      <Stack direction='row' justifyContent='space-between'>
        <Typography
          sx={{ marginBottom: 3, textTransform: 'uppercase' }}
          variant='h4'
          fontWeight={700}
          color='rgb(255,153,0)'
        >
          Top company
        </Typography>
      </Stack>
      <CompanyList />
    </TopCompanyWrapper>
  );
};

export default TopCompany;
