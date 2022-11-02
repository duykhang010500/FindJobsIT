import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Grid, Card, Typography, Skeleton, Stack } from '@mui/material';
import SearchSidebar from '../../sections/employer-main/search-candidates/SearchSidebar';
import CandidateCard from '../../components/CandidateCard';
import SearchTop from '../../sections/employer-main/search-candidates/SearchTop';
import { useDispatch } from 'react-redux';
import { searchCandidate } from '../../store/candidates/action';
import { getIdFromArr } from '../../utils/convert';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';

type Props = {};

const SearchCandidates = (props: Props) => {
  const { list, isLoading } = useSelector(
    (state: AppState) => state.candidates
  );

  const validateScheme = yup.object({
    salary_to: yup
      .number()
      .min(0, 'Salary to must be equal or greater than 0')
      .max(9999999999, 'Salary to maximum 9999999999'),
    salary_from: yup
      .number()
      .min(0, 'Salary to must be equal or greater than 0')
      .max(9999999999, 'Salary to maximum 9999999999'),
    age_from: yup
      .number()
      .min(0, 'Age from allow min 0')
      .max(60, 'Age to maximum 60'),
    age_to: yup
      .number()
      .min(0, 'Age to allow min 0')
      .max(60, 'Age to maximum 60'),
    exp_to: yup
      .number()
      .min(0, 'Exp to allow min 0')
      .max(100, 'Exp to maximum 100'),
    exp_from: yup
      .number()
      .min(0, 'Exp from allow min 0')
      .max(100, 'Exp from maximum 100'),
  });

  const defaultValues = {
    locations: [],
    industries: [],
    degree: '',
    keywords: '',
    level: '',
    language: '',
    nationality: '',
    resume_update: '',
    salary_unit: '',
    salary_from: 0,
    salary_to: 0,
    exp_from: 0,
    exp_to: 0,
    age_from: 0,
    age_to: 0,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchCandidate(defaultValues));
  }, []);

  const { control, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validateScheme),
  });

  const onSubmit = (formValues: any) => {
    const newFormValues = {
      ...formValues,
      industries: getIdFromArr(formValues.industries),
      locations: getIdFromArr(formValues.locations),
    };
    console.log(newFormValues);

    dispatch(searchCandidate(newFormValues));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <SearchTop control={control} />
      </Card>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={3}>
          <SearchSidebar control={control} reset={reset} />
        </Grid>
        <Grid item xs={12} md={9}>
          {isLoading ? (
            <Stack spacing={2}>
              <Skeleton variant='rounded' width='100%' height={100} />
              <Skeleton variant='rounded' width='100%' height={100} />
              <Skeleton variant='rounded' width='100%' height={100} />
              <Skeleton variant='rounded' width='100%' height={100} />
            </Stack>
          ) : (
            <>
              <Typography variant='body1' gutterBottom>
                {list?.length} candidates founded
              </Typography>
              {}
              {list?.map((item: any) => {
                return <CandidateCard key={item.id} candidate={item} />;
              })}
            </>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchCandidates;
