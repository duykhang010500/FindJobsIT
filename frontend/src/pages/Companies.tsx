import React, { useEffect, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

import {
  Box,
  Grid,
  Card,
  Link,
  Stack,
  Button,
  Skeleton,
  Container,
  TextField,
  Typography,
  Pagination,
  Breadcrumbs,
  InputAdornment,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useDispatch } from 'react-redux';
import { getCompanies } from '../store/companies/action';
import CompanyList from '../sections/companies-page/CompanyList';
import { AppState } from '../store/reducer';
import JobCardSkeleton from '../components/Skeleton/JobCardSkeleton';

type Props = {};

const Companies = (props: Props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [companies, setCompanies] = useState<any>([]);

  const [str, setStr] = useState('');

  const { list } = useSelector((state: AppState) => state.companies);

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    setCompanies(list);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [list]);

  const handleChange = (e: any) => {
    setIsLoading(true);
    setStr(e.target.value);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    setCompanies(getFilterCompanies(str, list));
  }, [str]);

  const getFilterCompanies = (str: string, companies: any) => {
    return companies.filter((comp: any) =>
      comp.name.toLowerCase().includes(str.toLocaleLowerCase())
    );
  };

  return (
    <Box sx={{ py: 15 }}>
      <Container>
        <Card
          sx={{ my: 2, p: 2, backgroundColor: '#fff', display: 'inline-block' }}
        >
          <Breadcrumbs
            sx={{ '&.MuiTypography-root': { fontWeight: 600 } }}
            separator='›'
            aria-label='breadcrumb'
          >
            <Link component={RouterLink} to={`/`}>
              Home
            </Link>

            <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
              Companies
            </Typography>
          </Breadcrumbs>
        </Card>
        <TextField
          label='Company name'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e: any) => handleChange(e)}
          sx={{ display: 'block', mt: 2 }}

          // value={str}
        />
        {isLoading ? (
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {[...Array(3)].map((_, idx: number) => (
              <Grid item md={4}>
                <JobCardSkeleton key={idx} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <CompanyList list={companies} />
        )}

        {/* <Stack direction='row' justifyContent='center' mt={5}>
          <LoadingButton variant='contained'>Load more</LoadingButton>
        </Stack> */}
      </Container>
    </Box>
  );
};

export default Companies;
