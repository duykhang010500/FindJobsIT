import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Typography,
  Avatar,
  Grid,
  Box,
  Stack,
  Skeleton,
  Card,
} from '@mui/material';
import { getCompany } from '../store/companies/action';
import DetailCompanyHeading from '../sections/DetailCompany/DetailCompanyHeading';
import DetailCompanyJobs from '../sections/DetailCompany/DetailCompanyJobs/DetailCompanyJobs';
import DetailCompanyOffices from '../sections/DetailCompany/DetailCompanyOffices/DetailCompanyOffices';
import DetailCompanyContent from '../sections/DetailCompany/DetailCompanyContent';
import DetailCompanyCoverPicture from '../sections/DetailCompany/DetailCompanyCoverPicture';
import DetailCompanyImages from '../sections/DetailCompany/DetailCompanyImages';
import { AppState } from '../store/reducer';

type Props = {};

const DetailCompany = (props: Props) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: AppState) => state.companies);

  useEffect(() => {
    dispatch(getCompany(Number(id)));
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <Box sx={{ py: 9 }}>
        <Container>
          <Skeleton variant='rounded' width={'100%'} height={1000} />
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 9 }}>
      <DetailCompanyCoverPicture />
      <Container>
        <Stack spacing={8}>
          <DetailCompanyHeading />
          <DetailCompanyJobs />
          <DetailCompanyOffices />
          <DetailCompanyContent />
          <DetailCompanyImages />
        </Stack>
      </Container>
    </Box>
  );
};

export default DetailCompany;
