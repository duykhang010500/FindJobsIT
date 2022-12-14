import { useEffect } from 'react';
import { Stack } from '@mui/material';

import { useDispatch } from 'react-redux';

import { getMyCV } from '../../../store/cv/actions';
import ProfileForm from '../../../sections/jobseeker-dashboard/profile/ProfileForm';
import { getCurrentJobSeeker } from '../../../store/auth/action';

type Props = {};

const JobSeekerProfile = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentJobSeeker());
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
