import React, { useEffect } from 'react';

import {
  Container,
  TextField,
  Box,
  InputAdornment,
  Pagination,
  Button,
  Stack,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useDispatch } from 'react-redux';
import { getCompanies } from '../store/companies/action';
import CompanyList from '../sections/companies-page/CompanyList';

type Props = {};

const Companies = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, []);
  return (
    <Box sx={{ py: 15 }}>
      <Container>
        <TextField
          label='Company name'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
        <CompanyList />
        <Stack direction='row' justifyContent='center' mt={5}>
          <LoadingButton variant='contained'>Load more</LoadingButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Companies;
