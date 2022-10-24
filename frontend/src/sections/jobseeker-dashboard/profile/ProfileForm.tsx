import React, { useEffect } from 'react';
import dayjs from 'dayjs';

import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SaveIcon from '@mui/icons-material/Save';

import CareerInformation from './CareerInformation';
import ProfileInformation from './ProfileInformation';
import EducationInformation from './EducationInformation';
import { getIdFromArr } from '../../../utils/convert';
import { useDispatch } from 'react-redux';
import { getMyCV, updateMyCv } from '../../../store/cv/actions';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';

type Props = {};

// const defaultValues = {};

const ProfileForm = (props: Props) => {
  const dispatch = useDispatch();

  const { cv } = useSelector((state: AppState) => state.cv);

  useEffect(() => {
    dispatch(getMyCV());
  }, [dispatch]);

  const profileSchema = yup.object({
    fullname: yup.string().required('Full name is require'),
    phone: yup.string().required('Phone is required'),
    gender: yup.number().required('Gender is required'),
    marital: yup.number().required('Marital is required'),
    email: yup
      .string()
      .email('Email must be valid email address')
      .required('Email is required'),
    // nationality: yup.array().min(1, 'Nationality is required'),
    // city: yup.array().min(1, 'City is required'),
    address: yup.string().required('Address is required'),
    resume_title: yup.string().required('Job title is required'),
    currentLevel: yup.string().required('Current level is required'),
    level: yup.string().required('Level is required'),
    yearofexperience: yup.number().required('Year experience is required'),
    industries: yup.array().min(1, 'Please choose at least 1 industry'),
    locations: yup
      .array()
      .min(1, 'Please choose at least 1 location you want to work in'),
    current_degree: yup.string().required('Current degree is required'),
    working_type: yup.string().required('Working type is required'),
    summary: yup.string().required('Summary is required'),
  });

  const defaultValues = {
    fullname: cv?.fullname || '',
    email: cv?.email || '',
    phone: cv?.phone || '',
    birthday: dayjs(cv?.birthday).format('DD/MM/YYYY') || '',
    gender: cv?.gender || '',
    marital: cv?.marital || '',
    nationality: [],
    city: [],
    address: cv?.address || '',

    current_position: cv?.current_position || '',
    resume_title: cv?.resume_title || '',
    current_company: cv?.current_company || '',
    yearofexperience: cv?.yearofexperience || 0,
    current_level: cv?.current_level || '',
    level: cv?.level || '',
    industries: [],
    locations: [],
    salary_unit: cv?.salary_unit || 'Negotiate',
    salary_from: cv?.salary_from || 0,
    salary_to: cv?.salary_to || 0,
    current_degree: cv?.current_degree || '',
    working_type: cv?.working_type || '',
    languages: '',
    summary: cv?.summary || '',

    rexp_title: cv?.rexp_title || '',
    rexp_company: cv?.rexp_company || '',
    rexp_date_start: dayjs(cv?.rexp_date_start).format('DD/MM/YYYY') || '',

    rexp_date_end: dayjs(cv?.rexp_date_end).format('DD/MM/YYYY') || '',
    rexp_current_end: 0,
    rexp_description: cv?.rexp_description || '',

    edu_school: cv?.edu_school || '',
    edu_certify: cv?.edu_certify || '',
    edu_date_start: dayjs(cv?.edu_date_start).format('DD/MM/YYYY') || '',
    edu_date_end: dayjs(cv?.edu_date_end).format('DD/MM/YYYY') || '',
    edu_current_end: 0,
    edu_description: cv?.edu_description || '',
    resume_file: 'resume_file.docx',
  };

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues,
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [cv]);

  const onSubmit = (formValues: any) => {
    // console.log(formValues);
    const formatValues = {
      ...formValues,
      city: formValues?.city?.name?.trim(),
      nationality: formValues?.nationality?.name?.trim(),
      birthday: dayjs(formValues.birthday).format('YYYY/MM/DD'),
      edu_date_end: dayjs(formValues.edu_date_end).format('YYYY/MM/DD'),
      edu_date_start: dayjs(formValues.edu_date_start).format('YYYY/MM/DD'),
      rexp_date_start: dayjs(formValues.rexp_date_start).format('YYYY/MM/DD'),
      rexp_date_end: dayjs(formValues.rexp_date_end).format('YYYY/MM/DD'),
      industries: getIdFromArr(formValues.industries),
      locations: getIdFromArr(formValues.locations),
    };

    console.log('Form values: ', formatValues);
    // dispatch
    dispatch(updateMyCv(formatValues));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <ProfileInformation control={control} setValue={setValue} />
        <CareerInformation control={control} setValue={setValue} />
        <EducationInformation control={control} />
        <Stack alignItems='center'>
          <LoadingButton
            type='submit'
            variant='contained'
            startIcon={<SaveIcon />}
          >
            Save changes
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default ProfileForm;
