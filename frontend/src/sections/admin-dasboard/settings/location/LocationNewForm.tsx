import { useDispatch, useSelector } from 'react-redux';
import { TextField, DialogActions, Button, Box } from '@mui/material';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  closeModal,
  createLocation,
  updateLocation,
} from '../../../../store/location/actions';
import { ILocation } from '../../../../store/location/types';
import { AppState } from '../../../../store/reducer';

type Props = {
  location: ILocation;
};

type FormValues = {
  name: string;
};

const LocationNewForm = ({ location }: Props) => {
  const dispatch = useDispatch();
  const { selectedLocationId } = useSelector(
    (state: AppState) => state.location
  );

  const isUpdate = !(Object.keys(location).length === 0);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (isUpdate) {
      dispatch(updateLocation(data, selectedLocationId));
    } else {
      dispatch(createLocation(data));
    }
  };

  const defaultValues = {
    name: location?.name || '',
  };

  const schemaValidate = yup.object({
    name: yup.string().required('Name is required'),
  });

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schemaValidate),
  });

  return (
    <Box sx={{ mt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='name'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Location name'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <DialogActions sx={{ mt: 3 }}>
          <Button variant='outlined' onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant='contained'>
            {isUpdate ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
};

export default LocationNewForm;
