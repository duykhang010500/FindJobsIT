import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingButton } from '@mui/lab';
import { Button, Stack } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from 'react-hook-form';

import CareerInformation from './CareerInformation';
import SkillsInformation from './SkillsInformation';
import ProfileInformation from './ProfileInformation';
import EducationInformation from './EducationInformation';
import ExperienceInformation from './ExperienceInformation';

import {
  getIdFromArr,
  findIndexByName,
  findIndexByName1,
} from '../../../utils/convert';

import { AppState } from '../../../store/reducer';
import { phoneRegExp } from '../../../utils/validate';
import { uploadSingleFile } from '../../../utils/upload';
import { Nationalities, skills } from '../../../utils/defaultValues';
import {
  getMyCV,
  setIsLoadingSubmitOnlineProfile,
  updateMyCv,
} from '../../../store/cv/actions';
import { toast } from 'react-toastify';

type Props = {};

const checkKeyDown = (e: any) => {
  if (e.code === 'Enter') e.preventDefault();
};

const ProfileForm = (props: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { cv, isLoading } = useSelector((state: AppState) => state.cv);

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
      .nullable()
      .transform((curr, orig) => (orig === '' ? null : curr))
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
    // languages: yup.string().required('Language is required'),
    languages: yup.array().min(1, 'Choose at least 1 language'),

    summary: yup.string().required('Summary is required'),

    experiences: yup.array().of(
      yup.object().shape({
        rexp_title: yup.string().nullable(true),
        rexp_company: yup.string().nullable(true),
        rexp_date_start: yup
          .date()
          .max(new Date(), 'Date start is before today')
          .nullable()
          .transform((curr, orig) => (orig === '' ? null : curr)),
        rexp_date_end: yup
          .date()
          .min(yup.ref('rexp_date_start'), 'End date must be after start date')
          .nullable(),
        rexp_description: yup.string().nullable(true),
      })
    ),
    // experiences: yup.array().of(
    //   yup.object().shape({
    //     rexp_title: yup
    //       .string()
    //       // .required('Title is required')
    //       .nullable(true),
    //     rexp_company: yup
    //       .string()
    //       // .required('Company is required')
    //       .nullable(true),
    //     rexp_date_start: yup
    //       .date()
    //       .max(new Date(), 'Date start is before today')
    //       // .nullable()
    //       // .required('Date start is required')
    //       .transform((curr, orig) => (orig === '' ? null : curr))
    //       .nullable(true),
    //     rexp_date_end: yup
    //       .date()
    //       .min(yup.ref('rexp_date_start'), 'End date must be after start date')
    //       .nullable(),
    //     rexp_description: yup.string().nullable(true),
    //   })
    // ),

    educations: yup.array().of(
      yup.object().shape({
        edu_school: yup.string().required('School is required'),
        edu_certify: yup.string().required('Certificate/Degree is required'),
        edu_description: yup
          .string()
          .required('Education description is required'),
        edu_date_start: yup
          .date()
          .max(new Date(), 'Time start is before today')
          .nullable()
          .transform((curr, orig) => (orig === '' ? null : curr))
          .required('Time start is required'),
        edu_date_end: yup
          .date()
          .min(yup.ref('edu_date_start'), 'End date must be after start date')
          .nullable(),
      })
    ),

    skills: yup.array().of(
      yup.object().shape({
        name: yup.string().required('Skill name is require!').nullable(),
        // skills_name: yup.number().required('Point is require!'),
      })
    ),

    yearofexperience: yup.number().min(0, 'Year must be >= 0'),
  });

  const defaultValues = useMemo(
    () => ({
      avatar: cv?.member?.avatar || 'none',
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
      // languages: cv?.languages || '',
      languages: cv?.languages?.split(',') || [],

      summary: cv?.summary || '',

      experiences: cv?.experiences || [
        {
          rexp_title: '',
          rexp_company: '',
          rexp_date_start: '',
          rexp_date_end: null,
          rexp_description: '',
          rexp_current_end: null,
        },
      ],

      educations: cv?.educations || [
        {
          edu_school: '',
          edu_certify: '',
          edu_date_start: '',
          edu_date_end: null,
          edu_current_end: null,
          edu_description: '',
        },
      ],

      skills: cv?.skills || [{ name: '', skills_level: 1 }],

      resume_file: 'resume_file.docx',

      resume_status: cv?.resume_status,

      cv_type: cv?.cv_type || 0,
    }),
    [cv, currentUser, locations]
  );

  const { control, handleSubmit, setValue, reset, getValues } = useForm({
    defaultValues,
    resolver: yupResolver(profileSchema),
    mode: 'onChange',
  });

  const {
    fields: ExpField,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({
    control,
    name: 'experiences',
  });

  const {
    fields: EduField,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({
    control,
    name: 'educations',
  });

  const {
    fields: skillsField,
    append: skillAppend,
    remove: skillRemove,
  } = useFieldArray({
    control,
    name: 'skills',
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset, cv]);

  const convertDate = (date: any) => {
    return date ? dayjs(date).format('YYYY/MM/DD') : '';
  };

  const onSubmit = async (formValues: any) => {
    try {
      dispatch(setIsLoadingSubmitOnlineProfile());

      let avatar = formValues.avatar;

      if (formValues.avatar !== cv?.member?.avatar) {
        avatar = await uploadSingleFile(formValues.avatar);
      }

      const formatValues = {
        ...formValues,
        city: formValues?.city?.name?.trim(),
        nationality: formValues?.nationality?.name?.trim(),
        birthday: dayjs(formValues.birthday).format('YYYY/MM/DD'),
        industries: getIdFromArr(formValues.industries),
        locations: getIdFromArr(formValues.locations),
        avatar: avatar,
        experiences: formValues.experiences.map((exp: any) => ({
          ...exp,
          rexp_date_start: convertDate(exp.rexp_date_start),
          rexp_date_end: convertDate(exp.rexp_date_end),
        })),
        educations: formValues.educations.map((edu: any) => ({
          ...edu,
          edu_date_start: convertDate(edu.edu_date_start),
          edu_date_end: convertDate(edu.edu_date_end),
        })),
        skills: convertSkills(formValues.skills),
        languages: convertLanguages(formValues.languages),
        skills_level: convertSkillLevel(formValues.skills),
        resume_status: formValues.resume_status ? 1 : 0,
      };
      console.log('Profile form values: ', formatValues);

      dispatch(updateMyCv(formatValues));
    } catch (err) {
      toast.error('Update online profile failure!');
      console.log('Update profile failure: ', err);
    }
  };

  const convertSkills = (arr: any) => {
    let str: string = '';
    arr.forEach((item: any, index: number) => {
      if (item.name) {
        if (index === 0) {
          str += `${item.name}`;
        } else {
          str += `,${item.name}`;
        }
      }
    });
    return str;
  };

  const convertSkillLevel = (arr: any) => {
    let str: string = '';
    arr.forEach((item: any, index: number) => {
      if (item.skills_level) {
        if (index === 0) {
          str += `${item.skills_level}`;
        } else {
          str += `,${item.skills_level}`;
        }
      }
    });
    return str;
  };

  const convertLanguages = (arr: any) => {
    let str: string = '';

    arr.forEach((lang: any, index: number) => {
      if (index === 0) {
        str += `${lang}`;
      } else {
        str += `, ${lang}`;
      }
    });

    return str;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
      <Stack spacing={4}>
        <ProfileInformation
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
        <CareerInformation
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
        <ExperienceInformation
          control={control}
          fields={ExpField}
          append={appendExp}
          remove={removeExp}
        />
        <EducationInformation
          control={control}
          fields={EduField}
          append={appendEdu}
          remove={removeEdu}
        />
        <SkillsInformation
          control={control}
          fields={skillsField}
          append={skillAppend}
          remove={skillRemove}
        />
        <Stack direction='row' spacing={2}>
          <Button
            variant='outlined'
            startIcon={<RemoveRedEyeIcon />}
            onClick={() => navigate('/view-resume')}
            disabled={!cv}
          >
            View Resume
          </Button>

          <LoadingButton
            type='submit'
            variant='contained'
            startIcon={<SaveIcon />}
            loading={isLoading}
          >
            Save changes
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default ProfileForm;
