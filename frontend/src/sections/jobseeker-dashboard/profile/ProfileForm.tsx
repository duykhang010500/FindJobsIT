import { useEffect, useMemo } from 'react';
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
import {
  findIndexByName,
  findIndexByName1,
  getDefaultMultiple,
  getIdFromArr,
} from '../../../utils/convert';
import { useDispatch } from 'react-redux';
import { getMyCV, updateMyCv } from '../../../store/cv/actions';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { Nationalities } from '../../../utils/defaultValues';
import { phoneRegExp } from '../../../utils/validate';
import ExperienceInformation from './ExperienceInformation';
import { MinimalButton } from '@react-pdf-viewer/core';

type Props = {};

const ProfileForm = (props: Props) => {
  const dispatch = useDispatch();

  const { cv } = useSelector((state: AppState) => state.cv);

  const { locations } = useSelector((state: AppState) => state.location);

  const { currentUser } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    dispatch(getMyCV());
  }, [dispatch]);

  const profileSchema = yup.object().shape({
    fullname: yup.string().required('Full name is require'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    birthday: yup
      .date()
      .max(
        new Date(Date.now() - 567648000000),
        'You must be at least 18 years old'
      )
      .required('Birthday is required'),
    email: yup
      .string()
      .email('Email must be valid email address')
      .required('Email is required'),
    gender: yup.string().required('Gender is required'),
    marital: yup.string().required('Marital is required'),
    nationality: yup.object().nullable().required('Nationality is required'),
    city: yup.object().nullable().required('City is required'),
    address: yup.string().required('Address is required'),

    resume_title: yup.string().required('Job title is required'),
    current_level: yup.string().required('Current level is required'),
    level: yup.string().required('Level is required'),
    industries: yup.array().min(1, 'Choose at least 1 industries'),
    locations: yup.array().min(1, 'Choose at least 1 location'),
    salary_from: yup
      .number()
      .min(0, 'Salary from must be greater than or equal 0')
      .max(99999999999, 'You must be input maximum 11 character number'),

    salary_to: yup
      .number()
      .when('salary_from', {
        is: (value: number) => value && value > 1,
        then: yup
          .number()
          .moreThan(yup.ref('salary_from'), 'Salary to must be > salary from'),
      })
      .min(0, 'Salary to must be greater than or equal 0')
      .max(99999999999, 'You must be input maximum 11 character number'),

    degree: yup.string().required('Degree is required'),
    // current_degree: yup.string().required('Current degree is required'),
    working_type: yup.string().required('Working type is required'),
    languages: yup.string().required('Language is required'),
    summary: yup.string().required('Summary is required'),

    rexp_title: yup.string().required('Position title is required'),
    rexp_company: yup.string().required('Companies is required'),

    rexp_date_start: yup
      .date()
      .max(new Date(), 'Date start is before today')
      .nullable()
      .transform((curr, orig) => (orig === '' ? null : curr))
      .required('Date start is required'),

    // rexp_date_end: yup.string().required('Time start is required'),
    rexp_description: yup.string().required('Description is required'),

    edu_school: yup.string().required('School is required'),
    edu_certify: yup.string().required('Certificate is required'),
    edu_description: yup.string().required('Education description is required'),
    edu_date_start: yup
      .date()
      .max(new Date(), 'Time start is before today')
      .nullable()
      .transform((curr, orig) => (orig === '' ? null : curr))
      .required('Time start is required'),
    // edu_date_end: yup.string().required('Time end is required'),

    yearofexperience: yup.number().min(0, 'Year must be >= 0'),
  });

  const defaultValues = useMemo(
    () => ({
      fullname: cv?.member?.fullname || currentUser?.fullname || '',
      email: currentUser?.email || '',
      phone: cv?.member?.phone || '',
      birthday: cv ? dayjs(cv?.member?.birthday).format('MM/DD/YYYY') : '',
      gender: cv?.member?.gender || '',
      marital: cv?.member?.marital || '',
      nationality:
        Nationalities[
          findIndexByName1(cv?.member?.nationality, Nationalities)
        ] || null,
      city: locations[findIndexByName(cv?.member?.city, locations)] || null,
      address: cv?.member?.address || '',

      current_position: cv?.current_position || '',
      resume_title: cv?.resume_title || '',
      current_company: cv?.current_company || '',
      yearofexperience: cv?.yearofexperience || 0,
      current_level: cv?.current_level || '',
      level: cv?.level || '',
      industries: cv?.industries || [],
      locations: cv?.locations || [],
      salary_unit: cv?.salary_unit || 'Negotiate',
      salary_from: cv?.salary_from || 0,
      salary_to: cv?.salary_to || 0,
      current_degree: cv?.current_degree || '',
      degree: cv?.degree || '',
      working_type: cv?.working_type || '',
      languages: cv?.languages || '',
      summary: cv?.summary || '',

      rexp_title: cv?.rexp_title || '',
      rexp_company: cv?.rexp_company || '',
      rexp_date_start: cv
        ? dayjs(cv?.rexp_date_start).format('MM/DD/YYYY')
        : '',
      rexp_date_end: cv?.rexp_date_end
        ? dayjs(cv?.rexp_date_end).format('MM/DD/YYYY')
        : null,
      // rexp_current_end: ,
      rexp_description: cv?.rexp_description || '',

      edu_school: cv?.edu_school || '',
      edu_certify: cv?.edu_certify || '',
      edu_date_start: cv ? dayjs(cv?.edu_date_start).format('MM/DD/YYYY') : '',
      edu_date_end: cv?.edu_date_end
        ? dayjs(cv?.edu_date_end).format('MM/DD/YYYY')
        : null,
      edu_current_end: cv
        ? dayjs(cv?.edu_current_end).format('MM/DD/YYYY')
        : '',
      edu_description: cv?.edu_description || '',
      resume_file: 'resume_file.docx',
    }),
    [cv, currentUser]
  );

  const { control, handleSubmit, setValue, reset, getValues } = useForm({
    defaultValues,
    resolver: yupResolver(profileSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset, cv]);

  const onSubmit = (formValues: any) => {
    const formatValues = {
      ...formValues,
      city: formValues?.city?.name?.trim(),
      nationality: formValues?.nationality?.name?.trim(),
      birthday: dayjs(formValues.birthday).format('YYYY/MM/DD'),
      edu_date_start: dayjs(formValues.edu_date_start).format('YYYY/MM/DD'),
      edu_date_end: formValues.edu_date_end
        ? dayjs(formValues.edu_date_end).format('YYYY/MM/DD')
        : null,
      rexp_date_start: dayjs(formValues.rexp_date_start).format('YYYY/MM/DD'),
      rexp_date_end: formValues.rexp_date_end
        ? dayjs(formValues.rexp_date_end).format('YYYY/MM/DD')
        : null,
      industries: getIdFromArr(formValues.industries),
      locations: getIdFromArr(formValues.locations),
    };
    console.log(formatValues);
    dispatch(updateMyCv(formatValues));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <ProfileInformation
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
        <CareerInformation control={control} setValue={setValue} />
        <ExperienceInformation control={control} />
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
