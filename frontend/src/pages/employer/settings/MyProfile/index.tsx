import { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Alert,
  Stack,
  styled,
  Avatar,
  Tooltip,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { AppState } from '../../../../store/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { updateInfoEmployer } from '../../../../store/auth/action';

import Image from '../../../../components/Image';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';

type Props = {};

type FormValue = {
  avatar?: string;
  fullname?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};

const AvatarUploadWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  margin: 'auto',
  padding: '5px',
  width: '144px',
  height: '144px',
  borderRadius: '50%',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.12)',
  '& > div': {
    width: '100%',
    height: '100%',
  },
});

const UploadButton = styled('label')({
  zIndex: 2,
  top: -5,
  right: 2,
  width: 35,
  height: 35,
  borderRadius: '100%',
  backgroundColor: '#fff',
  position: 'absolute',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.12)',
});

const MyProfile = (props: Props) => {
  const dispatch = useDispatch();

  const [avt, setAvt] = useState<any>();

  const [errorAvt, setErrorAvt] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { currentUser, error } = useSelector((state: AppState) => state.auth);

  const uploadSingleImage = async (image: any) => {
    const formData = new FormData();

    formData.append('file', image);

    formData.append('upload_preset', 'gmbxs39q');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dzbloxcjn/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();

    return data.secure_url;
  };

  const defaultValues = useMemo(() => {
    return {
      fullname: currentUser?.info?.fullname || '',
      email: currentUser?.info?.email || '',
      password: '',
      password_confirmation: '',
      avatar: currentUser?.info?.avatar || '',
    };
  }, [currentUser]);

  const validateSchema = yup.object({
    fullname: yup.string().required('Full name is require!'),
  });

  const { control, reset, handleSubmit, setValue, getValues } =
    useForm<FormValue>({
      defaultValues,
      resolver: yupResolver(validateSchema),
    });

  useEffect(() => {
    reset(defaultValues);
  }, [currentUser, defaultValues, reset]);

  const onSubmit: SubmitHandler<FormValue> = async () => {
    setLoading(true);

    if (avt) {
      const imgUrl = await uploadSingleImage(avt);
      setValue('avatar', imgUrl);
    }

    const values = getValues();

    if (!values.password && !values.password_confirmation) {
      delete values.password;
      delete values.password_confirmation;
    }

    delete values.email;
    console.log(values);
    await dispatch(updateInfoEmployer(values));

    setLoading(false);
  };

  const handleChangeAvatar = (e: any) => {
    const supportMineType = ['jpeg', 'png', 'jpg'];

    const file = e.target.files[0];

    if (!supportMineType.includes(file.type.split('/')[1])) {
      setErrorAvt('Incorrect file type!');
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      setErrorAvt('Image must be < 1MB!');
      return;
    }
    setAvt(file);
  };

  return (
    <Box sx={{ p: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <div>
            <AvatarUploadWrapper>
              <input
                id='upload'
                type='file'
                style={{ display: 'none' }}
                onChange={handleChangeAvatar}
              />
              <Tooltip title='Upload avatar' placement='top'>
                <UploadButton htmlFor='upload' onClick={() => setErrorAvt('')}>
                  <ModeEditOutlineIcon sx={{ fontSize: '17px' }} />
                </UploadButton>
              </Tooltip>
              {currentUser?.info?.avatar && !avt ? (
                <Image
                  alt='avt'
                  sx={{
                    borderRadius: '50%',
                  }}
                  src={currentUser?.info?.avatar}
                />
              ) : avt ? (
                <Image
                  alt='avt'
                  src={URL.createObjectURL(avt)}
                  sx={{ borderRadius: '50%' }}
                />
              ) : (
                <Avatar />
              )}
            </AvatarUploadWrapper>
            <Typography
              variant='subtitle2'
              sx={{ color: 'silver', textAlign: 'center', marginTop: '10px' }}
            >
              Allowed *.jpg, *.png, *.jpge
              <br />
              {`File size < 1MB`}
            </Typography>
          </div>
          {errorAvt && <Alert severity='error'>{errorAvt}</Alert>}
          {error && <Alert severity='error'>{Object.values(error)}</Alert>}

          <Controller
            name='fullname'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Full name *'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField {...field} label='Email *' disabled />
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                label='Password'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityRounded />
                        ) : (
                          <VisibilityOffRounded />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name='password_confirmation'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type={showConfirmPassword ? 'text' : 'password'}
                label='Confirm password'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityRounded />
                        ) : (
                          <VisibilityOffRounded />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Stack alignItems='flex-end'>
            <LoadingButton
              type='submit'
              variant='contained'
              size='large'
              loading={loading}
            >
              Save Changes
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default MyProfile;
