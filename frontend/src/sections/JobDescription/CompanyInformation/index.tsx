import { Divider } from '@mui/material';
import React, { Fragment } from 'react';
import CompanyDescription from './CompanyDescription';
import CompanyOverview from './CompanyOverview';

type Props = {};

const CompanyInfo = (props: Props) => {
  return (
    <Fragment>
      <CompanyOverview />
      <Divider sx={{ mt: 5, mb: 5 }} />
      <CompanyDescription />
    </Fragment>
  );
};

export default CompanyInfo;
