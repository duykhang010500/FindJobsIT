import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Box, styled, Stack, Link, Container } from '@mui/material';

import CompanyList from './CompanyList';

type Props = {};

const TopCompanyWrapper = styled(Box)({
  marginTop: '50px',
  textAlign: 'center',
  backgroundColor: '#eaf3fa',
  paddingTop: '30px',
});

const TopCompany: React.FC = (props: Props) => {
  return (
    <TopCompanyWrapper>
      <Container>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ marginTop: 3, marginBottom: 3 }}
        >
          <Typography
            variant='h2'
            fontWeight={700}
            // color='rgb(255,153,0)'
            sx={{
              textAlign: 'center',
              textTransform: 'uppercase',
              WebkitBackgroundClip: 'text !important',
              WebkitTextFillColor: 'transparent !important',
              background: 'linear-gradient(to right, #009FFF  , #ec2F4B)',
            }}
          >
            Top company
          </Typography>
          <Link variant='h5' component={RouterLink} to={`/companies`}>
            See all
          </Link>
        </Stack>
      </Container>
      <CompanyList />
    </TopCompanyWrapper>
  );
};

export default TopCompany;
