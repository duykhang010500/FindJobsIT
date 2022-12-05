import { useEffect, useMemo } from 'react';

import {
  Stack,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { phoneRegExp } from '../../../../utils/validate';

import {
  closeModal,
  createOffice,
  updateOffice,
} from '../../../../store/offices/actions';

import { AppState } from '../../../../store/reducer';

type Props = {};

const EmployerOfficesNewForm = ({}: Props) => {
  const dispatch = useDispatch();

  const { isOpen, office } = useSelector((state: AppState) => state.offices);

  const validateForm = yup.object({
    name: yup
      .string()
      .max(100, 'Office name allow maximum 100 character')
      .required('Office name is require'),
    address: yup
      .string()
      .max(100, 'Office address allow maximum 100 character')
      .required('Office address is require'),
    phone: yup.string().matches(phoneRegExp, 'Please enter valid number phone'),
  });

  const defaultValues = useMemo(
    () => ({
      name: office?.name || '',
      address: office?.address || '',
      phone: office?.phone || 0,
      priority: 1,
    }),
    [office]
  );

  useEffect(() => {
    reset(defaultValues);
  }, [office]);

  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validateForm),
  });

  const onSubmit = (formValues: any) => {
    if (office) {
      dispatch(updateOffice(office.id, formValues));
      // reset();
    } else {
      dispatch(createOffice(formValues));
      reset();
    }
  };

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={() => {
        dispatch(closeModal());
        reset();
      }}
    >
      <DialogTitle>
        <Typography variant='h4' component='span'>
          New office
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            <Controller
              name='name'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Office name *'
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name='address'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Address *'
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name='phone'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Phone *'
                  value={getValues('phone') === 0 ? '' : getValues('phone')}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={() => {
              dispatch(closeModal());
              reset();
            }}
          >
            Close
          </Button>
          <LoadingButton
            type='submit'
            variant='contained'
            startIcon={<SaveIcon />}
          >
            {office ? 'Update' : 'Save'}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmployerOfficesNewForm;
