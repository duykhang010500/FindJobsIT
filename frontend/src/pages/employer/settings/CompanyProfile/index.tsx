import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';

import { uploadMultipleFile, uploadSingleFile } from '../../../../utils/upload';
import {
  styled,
  Box,
  TextField,
  Stack,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Grid,
  IconButton,
} from '@mui/material';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import SaveAsIcon from '@mui/icons-material/SaveAs';

import { AppState } from '../../../../store/reducer';
import { employerUpdateCompany } from '../../../../store/companies/action';

import UploadAvatar from '../../../../components/UploadAvatar';
import { companySize } from '../../../../utils/defaultValues';
import { IIndustry } from '../../../../store/industries/types';
import UploadSingleFile from '../../../../components/UploadFile/UploadSingleFile';
import UploadMultiFiles from '../../../../components/UploadFile/UploadMultiFiles';
import Image from '../../../../components/Image';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type Props = {};

type FormValues = {
  logo?: string;
  name?: string;
  address?: string;
  phone?: number;
  fax?: number;
  company_size?: string;
  tax?: number;
  website?: number;
  email?: string;
  location_name?: string;
  industry_name?: number;
  content?: string;
  banners?: string;
  images?: string;
};

const LabelStyle = styled('span')({
  color: 'rgba(0, 0, 0, 0.6)',
  fontWeight: 500,
});

const CompanyProfile = (props: Props) => {
  const dispatch = useDispatch();

  const [avt, setAvt] = useState<any>();

  const [banner, setBanner] = useState<any>([]);

  const [images, setImages] = useState<any>([]);

  const [errLogo, setErrLogo] = useState<string | null>('');

  const [loading, setLoading] = useState<boolean>(false);

  const { currentUser } = useSelector((state: AppState) => state.auth);

  const { locations } = useSelector((state: AppState) => state.location);

  const { industries } = useSelector((state: AppState) => state.industries);

  const info_company = currentUser?.info?.info_company;

  const validateSchema = yup.object({
    // logo: yup.string().required('Logo is required'),
    name: yup.string().required('Company name is required'),
    address: yup.string().required('Address is required'),
    phone: yup.string().required('Phone is required'),
    fax: yup.string().required('Fax is required'),
    company_size: yup.string().required('Company size is required'),
    tax: yup.string().required('Tax is required'),
    website: yup.string().required('Website is require'),
    email: yup
      .string()
      .email('Email must be valid email')
      .required('Email is required'),
    location_name: yup.string().required('Location is required'),
    industry_name: yup.string().required('Industry is required'),
    content: yup.string().required('Summary is required'),
  });

  const defaultValues = useMemo(() => {
    return {
      logo: info_company?.logo || '',
      name: info_company?.name || '',
      address: info_company?.address || '',
      phone: info_company?.phone || '',
      fax: info_company?.fax || '',
      company_size: info_company?.company_size || '',
      tax: info_company?.tax || '',
      website: info_company?.website || '',
      email: info_company?.email || '',
      location_name: info_company?.location_name || '',
      industry_name: info_company?.industry_name || '',
      content: info_company?.content || '',
    };
  }, [info_company]);

  const { control, handleSubmit, reset, setValue, getValues } =
    useForm<FormValues>({
      defaultValues,
      resolver: yupResolver(validateSchema),
    });

  useEffect(() => {
    reset(defaultValues);
  }, [currentUser, reset, defaultValues]);

  useEffect(() => {
    if (currentUser?.info?.info_company?.banners !== null) {
      setBanner([currentUser?.info?.info_company?.banners]);
    } else {
      setBanner([]);
    }
    setImages(
      currentUser?.info?.info_company?.images
        ? currentUser?.info?.info_company?.images.split(',')
        : []
    );
  }, [currentUser?.info?.info_company]);

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    if (!info_company?.logo) {
      if (!avt) {
        return;
      }
    }

    setLoading(true);

    if (avt) {
      const logo = await uploadSingleFile(avt);
      setValue('logo', logo);
    }

    if (typeof banner[0] === 'object') {
      console.log('Có thay đổi hình');
      const url = await uploadSingleFile(banner[0]);
      setValue('banners', url);
    } else {
      setValue('banners', banner[0]);
    }

    const oldImages = images.filter((img: any) => typeof img === 'string');
    const newImages = images.filter((img: any) => typeof img !== 'string');

    const urlNewImages = await uploadMultipleFile(newImages);
    const imagesUrlAfterUpload = oldImages.concat(urlNewImages);
    console.log('Img after upload: ', imagesUrlAfterUpload);

    let str = imagesUrlAfterUpload.join(',');

    console.log('str: ', str);

    setValue('images', str);

    // console.log('old images: ', oldImages);
    // console.log('new image: ', newImages);

    const values = getValues();

    console.log('form values: ', values);

    await dispatch(employerUpdateCompany(values));

    console.log('Images: ', images);

    setLoading(false);
  };

  const handleChangeFile = (e: any) => {
    if (e.target.files[0].type == 'image/png' || 'image/jpeg' || 'image/jpg') {
      console.log('Right');
      if (e.target.files[0].size > 2 * 1024 * 1024) {
        setErrLogo('Please upload image < 2MB');
        return;
      }
      setAvt(e.target.files[0]);
      setErrLogo('');
    } else {
      setErrLogo('Invalid file!');
      setAvt(null);
      return;
    }
  };

  const handleDrop = useCallback((acceptedFile: any) => {
    setBanner(
      acceptedFile.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const handleDropImages = useCallback(
    (acceptedFile: any) => {
      console.log('img: ', images);
      setImages(images.concat(acceptedFile));
    },
    [images]
  );

  const handleRemoveBanner = () => {
    setBanner([]);
  };

  const deleteImages = (index: number) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  return (
    <Box sx={{ p: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <div>
            <UploadAvatar handleChange={handleChangeFile} avt={avt} />
            {errLogo && (
              <FormHelperText error sx={{ textAlign: 'center' }}>
                {errLogo}
              </FormHelperText>
            )}
          </div>

          <Controller
            name='name'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Company name *'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name='address'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label='Address *'
                {...field}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Stack direction='row' spacing={2} sx={{ width: '100% important' }}>
            <Controller
              name='phone'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label='Phone *'
                  type='number'
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name='fax'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label='Fax *'
                  type='number'
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>

          <Stack direction='row' spacing={2}>
            <Controller
              name='company_size'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  select
                  label='Company size *'
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                >
                  {companySize.map((item: any) => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
            <Controller
              name='tax'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label='Tax *'
                  type='number'
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction='row' spacing={2} sx={{ width: '100% important' }}>
            <Controller
              name='website'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label='Website *'
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name='email'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label='Email *'
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction='row' spacing={2} sx={{ width: '100% important' }}>
            <Controller
              name='location_name'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  select
                  fullWidth
                  label='Location *'
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                >
                  {locations.map((location: any) => {
                    return (
                      <MenuItem key={location.id} value={location.name.trim()}>
                        {location.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
            <Controller
              name='industry_name'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  select
                  label='Industry *'
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                >
                  {industries.map((industry: IIndustry) => {
                    return (
                      <MenuItem key={industry.id} value={industry.name}>
                        {industry.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
          </Stack>
          <Controller
            name='content'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label='Description *'
                {...field}
                minRows={5}
                multiline
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          {/* === */}
          <LabelStyle>Banner</LabelStyle>
          <UploadSingleFile
            onDrop={handleDrop}
            file={banner}
            remove={handleRemoveBanner}
          />

          {/* ===  */}

          <LabelStyle>Images</LabelStyle>
          <UploadMultiFiles onDrop={handleDropImages} />
          <Grid container>
            {images.length > 0 &&
              images?.map((item: any, idx: number) => {
                if (item !== null) {
                  return (
                    <Grid item md={2} key={idx}>
                      <Box position={'relative'}>
                        <Image
                          src={
                            typeof item === 'object'
                              ? URL.createObjectURL(item)
                              : item
                          }
                          alt={'áhjdj'}
                          sx={{
                            width: 100,
                            height: 100,
                            border: '1px solid silver',
                            padding: '10px',
                            borderRadius: '8px',
                          }}
                        />
                        <IconButton
                          sx={{ position: 'absolute', top: -5, right: 15 }}
                          onClick={() => deleteImages(idx)}
                        >
                          <HighlightOffIcon sx={{ color: '#ff4d4f' }} />
                        </IconButton>
                      </Box>
                    </Grid>
                  );
                }
              })}
          </Grid>

          <Stack alignItems='flex-end'>
            <LoadingButton
              type='submit'
              variant='contained'
              startIcon={<SaveAsIcon />}
              loading={loading}
              onClick={() => {
                if (!info_company?.logo) {
                  setErrLogo('Please upload logo');
                }
              }}
            >
              Save Changes
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default CompanyProfile;
