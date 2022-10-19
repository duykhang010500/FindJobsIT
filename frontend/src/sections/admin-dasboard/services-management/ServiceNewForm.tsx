import { useParams, useNavigate } from 'react-router-dom';

import {
  Grid,
  Card,
  Stack,
  Alert,
  Switch,
  TextField,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { createService, updateService } from '../../../store/services/actions';

import SaveIcon from '@mui/icons-material/Save';
import { AppState } from '../../../store/reducer';
import { useEffect, useMemo } from 'react';

type Props = {
  isEdit?: boolean;
  service?: any;
};

type FormValues = {
  name: string;
  note: string;
  service_type: number;
  days: number;
  priority: number;
  price: number;
  discount: number;
  status: number;
};

const getStatus = (state: boolean | number) => {
  if (state) {
    return 1;
  }
  return 0;
};

const ServiceNewForm = ({ isEdit, service }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state: AppState) => state.services);

  const defaultValues = useMemo(
    () => ({
      name: service?.name || '',
      note: service?.note || '',
      service_type: service?.service_type || 1,
      days: service?.days || 0,
      priority: service?.priority || 1,
      price: service?.price || 0,
      discount: service?.discount || 0,
      status: service?.status || 1,
    }),
    [service]
  );

  const schema = yup.object({
    name: yup.string().required('Name is required'),
    note: yup.string().required('Description is required'),
    // service_type: yup.string().required('Name is required'),
    days: yup.number().moreThan(0, 'Day should not be 0'),
    // priority: yup.string().required('Name is required'),
    price: yup.number().moreThan(0, 'Price should not be 0'),
    // discount: yup.number().required('Name is required'),
  });

  const { reset, control, handleSubmit } = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isEdit && service) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [service, isEdit]);

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    const formData = { ...formValues, status: getStatus(formValues.status) };
    if (isEdit) {
      dispatch(updateService(formData, id, navigate));
    } else {
      dispatch(createService(formData));
    }
  };

  return (
    <Card sx={{ mt: 5, p: 8 }}>
      {error && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {Object.values(error)}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <Stack spacing={3}>
              <Controller
                name='name'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label={`Service name`}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                name='note'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label={`Description`}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                name='days'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type='number'
                    label={`Day(s)`}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={3}>
              <Controller
                name='price'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label={`Price`}
                    type='number'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                name='discount'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label={`Discount`}
                    type='number'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <FormControlLabel
                label={`Status`}
                control={
                  <Controller
                    name='status'
                    control={control}
                    render={({ field }) => (
                      <Switch {...field} checked={field.value ? true : false} />
                    )}
                  />
                }
              />
            </Stack>
          </Grid>
        </Grid>
        <div>
          <LoadingButton
            type='submit'
            size='large'
            variant='contained'
            startIcon={<SaveIcon />}
            loading={isLoading}
            sx={{ mt: 3, float: 'right' }}
          >
            {isEdit ? 'Save changes' : 'Create service'}
          </LoadingButton>
        </div>
      </form>
    </Card>
  );
};

export default ServiceNewForm;
