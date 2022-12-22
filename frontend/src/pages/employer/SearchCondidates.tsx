import { useEffect, useMemo } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Grid,
  Card,
  Link,
  Stack,
  Skeleton,
  Typography,
  Breadcrumbs,
} from '@mui/material';
import SearchSidebar from '../../sections/employer-main/search-candidates/SearchSidebar';
import CandidateCard from '../../components/CandidateCard';
import SearchTop from '../../sections/employer-main/search-candidates/SearchTop';
import { useDispatch } from 'react-redux';
import { searchCandidate } from '../../store/candidates/action';
import { getIdFromArr } from '../../utils/convert';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { employerGetOrderedServices } from '../../store/services/actions';

type Props = {};

const SearchCandidates = (props: Props) => {
  const dispatch = useDispatch();

  const { list, isLoading } = useSelector(
    (state: AppState) => state.candidates
  );

  const validateScheme = yup.object({
    salary_from: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(),

    salary_to: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(),
    age_from: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(),
    age_to: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(),
    exp_to: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(),
    exp_from: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      keywords: '',
      locations: [],
      industries: [],
      degree: ' ',
      level: ' ',
      language: ' ',
      nationality: ' ',
      resume_update: ' ',
      salary_unit: ' ',
      salary_from: 0,
      salary_to: 0,
      exp_from: 0,
      exp_to: 0,
      age_from: 0,
      age_to: 0,
    }),
    []
  );

  useEffect(() => {
    dispatch(searchCandidate(defaultValues));
    dispatch(employerGetOrderedServices());
  }, [dispatch, defaultValues]);

  const { control, handleSubmit, reset, getValues, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validateScheme),
  });

  const onSubmit = (formValues: any) => {
    const newFormValues = {
      ...formValues,
      industries: getIdFromArr(formValues.industries),
      locations: getIdFromArr(formValues.locations),
      salary_from: formValues.salary_from || 0,
      salary_to: formValues.salary_to || 0,
      exp_from: formValues.exp_from || 0,
      exp_to: formValues.exp_to || 0,
      age_from: formValues.age_from || 0,
      age_to: formValues.age_to || 0,
    };
    console.log(newFormValues);

    dispatch(searchCandidate(newFormValues));
  };

  return (
    <>
      <Card
        sx={{ p: 2, backgroundColor: '#fff', display: 'inline-block', mb: 2 }}
      >
        <Breadcrumbs
          sx={{ '&.MuiTypography-root': { fontWeight: 600 } }}
          separator='›'
          aria-label='breadcrumb'
        >
          <Link component={RouterLink} to={`/employer`}>
            Home
          </Link>
          <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
            Candidates
          </Typography>
        </Breadcrumbs>
      </Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 3 }}>
          <SearchTop control={control} />
          <SearchSidebar
            control={control}
            reset={reset}
            getValues={getValues}
            setValue={setValue}
          />
        </Card>
      </form>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={12} spacing={2}>
          {isLoading ? (
            <Stack spacing={2}>
              <Skeleton variant='rounded' width='100%' height={100} />
              <Skeleton variant='rounded' width='100%' height={100} />
              <Skeleton variant='rounded' width='100%' height={100} />
              <Skeleton variant='rounded' width='100%' height={100} />
            </Stack>
          ) : (
            <>
              <Typography variant='h4' align='center' mb={3}>
                <Typography
                  variant='h3'
                  component='span'
                  fontWeight={700}
                  sx={{ color: '#ff4d4f', mr: 1 }}
                >
                  {list.length}
                </Typography>
                Candidates founded
              </Typography>
              <Grid container spacing={3}>
                {list?.map((item: any, index: number) => {
                  return (
                    <Grid item md={6} key={index}>
                      <CandidateCard candidate={item} />
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchCandidates;
