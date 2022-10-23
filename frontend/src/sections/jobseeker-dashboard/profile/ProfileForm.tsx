import React from 'react';

import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';

import SaveIcon from '@mui/icons-material/Save';

import CareerInformation from './CareerInformation';
import ProfileInformation from './ProfileInformation';
import EducationInformation from './EducationInformation';

type Props = {};

const defaultValues = {};

const ProfileForm = (props: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (formValues: any) => {
    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <ProfileInformation control={control} />
        <CareerInformation control={control} />
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
