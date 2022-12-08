import React from 'react';

import { Box, Grid } from '@mui/material';
import CompanyCard from './CompanyCard';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';

type Props = {};

const CompanyList = (props: Props) => {
  const { list } = useSelector((state: AppState) => state.companies);
  return (
    <Box sx={{ mt: 5 }}>
      <Grid container spacing={4}>
        {}
        {list?.map((item: any, idx: number) => (
          <Grid item md={4} key={idx}>
            <CompanyCard
              id={item.id}
              name={item.name}
              industry_name={item.industry_name}
              logo={item.logo}
              banner={item.banners}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CompanyList;
