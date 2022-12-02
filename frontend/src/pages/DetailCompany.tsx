import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Container, Typography, Avatar, Grid, Box, Stack } from '@mui/material';
import { getCompany } from '../store/companies/action';
import DetailCompanyHeading from '../sections/DetailCompany/DetailCompanyHeading';
import DetailCompanyJobs from '../sections/DetailCompany/DetailCompanyJobs/DetailCompanyJobs';
import DetailCompanyOffices from '../sections/DetailCompany/DetailCompanyOffices/DetailCompanyOffices';
import DetailCompanyContent from '../sections/DetailCompany/DetailCompanyContent';
import DetailCompanyCoverPicture from '../sections/DetailCompany/DetailCompanyCoverPicture';

type Props = {};

const DetailCompany = (props: Props) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompany(Number(id)));
  }, [id, dispatch]);

  return (
    <Box sx={{ mt: 9 }}>
      <DetailCompanyCoverPicture />
      <Container>
        <Stack spacing={8}>
          <DetailCompanyHeading />
          <DetailCompanyJobs />
          {/* <DetailCompanyOffices /> */}
          <DetailCompanyContent />
        </Stack>
      </Container>
    </Box>
  );
};

export default DetailCompany;
