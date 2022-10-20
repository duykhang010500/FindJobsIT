import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingButton } from '@mui/lab';
import { uploadSingleFile } from '../../../../utils/upload';
import { Box, TextField, Stack, MenuItem } from '@mui/material';

import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import SaveAsIcon from '@mui/icons-material/SaveAs';

import { AppState } from '../../../../store/reducer';
import { employerUpdateCompany } from '../../../../store/companies/action';

import UploadAvatar from '../../../../components/UploadAvatar';

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
  location?: string;
  industry_id?: number;
  content?: string;
};

const CompanyProfile = (props: Props) => {
  const dispatch = useDispatch();

  const [avt, setAvt] = useState<any>();

  const [loading, setLoading] = useState<boolean>(false);

  const { currentUser } = useSelector((state: AppState) => state.auth);

  const info_company = currentUser?.info?.info_company;

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
      location: info_company?.location || '',
      industry_id: info_company?.industry_id || 0,
      content: info_company?.content || '',
    };
  }, [info_company]);

  const { control, handleSubmit, reset, setValue, getValues } =
    useForm<FormValues>({
      defaultValues,
    });

  useEffect(() => {
    reset(defaultValues);
  }, [currentUser, reset, defaultValues]);

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    setLoading(true);

    if (avt) {
      const logo = await uploadSingleFile(avt);
      setValue('logo', logo);
    }
    const values = getValues();

    await dispatch(employerUpdateCompany(values));

    setLoading(false);
  };

  const handleChangeFile = (e: any) => {
    console.log('handleChange: ', e.target.files[0]);
    setAvt(e.target.files[0]);
  };

  return (
    <Box sx={{ p: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <UploadAvatar handleChange={handleChangeFile} avt={avt} />
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextField {...field} label='Company name' />
            )}
          />
          <Controller
            name='address'
            control={control}
            render={({ field }) => <TextField label='Address' {...field} />}
          />

          <Stack direction='row' spacing={2} sx={{ width: '100% important' }}>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <TextField label='Phone' type='number' fullWidth {...field} />
              )}
            />
            <Controller
              name='fax'
              control={control}
              render={({ field }) => (
                <TextField label='Fax' type='number' fullWidth {...field} />
              )}
            />
          </Stack>

          <Stack direction='row' spacing={2}>
            <Controller
              name='company_size'
              control={control}
              render={({ field }) => (
                <TextField select label='Company size' fullWidth {...field}>
                  <MenuItem value='Less than 50'>Less than 50</MenuItem>
                  <MenuItem value='50 - 100'>50 - 199</MenuItem>
                  <MenuItem value='100 - 499 '>100 - 499 </MenuItem>
                  <MenuItem value='500 - 1000'>500 - 1000</MenuItem>
                  <MenuItem value='Over 1000'>Over 1000</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name='tax'
              control={control}
              render={({ field }) => (
                <TextField label='Tax' type='number' fullWidth {...field} />
              )}
            />
          </Stack>
          <Stack direction='row' spacing={2} sx={{ width: '100% important' }}>
            <Controller
              name='website'
              control={control}
              render={({ field }) => (
                <TextField label='Website' fullWidth {...field} />
              )}
            />
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <TextField label='Email' fullWidth {...field} />
              )}
            />
          </Stack>
          <Stack direction='row' spacing={2} sx={{ width: '100% important' }}>
            <Controller
              name='location'
              control={control}
              render={({ field }) => (
                <TextField select label='Location' fullWidth {...field}>
                  <MenuItem value={`Beens Tre`}>Bến Tre</MenuItem>
                  <MenuItem value={`Gia lai`}>Gia Lai</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name='industry_id'
              control={control}
              render={({ field }) => (
                <TextField label='Industry' fullWidth {...field} />
              )}
            />
          </Stack>
          <Controller
            name='content'
            control={control}
            render={({ field }) => (
              <TextField label='Description' {...field} minRows={5} multiline />
            )}
          />
          <Stack alignItems='flex-end'>
            <LoadingButton
              type='submit'
              variant='contained'
              startIcon={<SaveAsIcon />}
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

export default CompanyProfile;
