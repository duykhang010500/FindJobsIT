import { useEffect } from 'react';
import { Typography, Stack } from '@mui/material';

import { useDispatch } from 'react-redux';

import { getMyCV } from '../../../store/cv/actions';
import ProfileInformation from '../../../sections/jobseeker-dashboard/profile/ProfileInformation';
import ProfileForm from '../../../sections/jobseeker-dashboard/profile/ProfileForm';
import CareerInformation from '../../../sections/jobseeker-dashboard/profile/CareerInformation';

type Props = {};

const JobSeekerProfile = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyCV());
  }, [dispatch]);

  return (
    <>
      <Stack spacing={4}>
        <ProfileForm />
      </Stack>
    </>
  );
};

export default JobSeekerProfile;
