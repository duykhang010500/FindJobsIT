import { useDispatch, useSelector } from 'react-redux';
import { TextField, DialogActions, Button, Box } from '@mui/material';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { AppState } from '../../../../store/reducer';
import { IIndustry } from '../../../../store/industries/types';
import {
  closeModal,
  createIndustry,
  updateIndustry,
} from '../../../../store/industries/actions';

type Props = {
  industry: IIndustry;
};

type FormValues = {
  name: string;
  priority: number;
  status: number;
};

const IndustryNewForm = ({ industry }: Props) => {
  const dispatch = useDispatch();
  const { selectedIndustryId } = useSelector(
    (state: AppState) => state.industries
  );

  const isUpdate = !(Object.keys(industry).length === 0);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (isUpdate) {
      dispatch(updateIndustry(data, selectedIndustryId));
    } else {
      dispatch(createIndustry(data));
    }
  };

  const defaultValues = {
    name: industry?.name || '',
    status: 1,
    priority: 1,
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
              label='Industry name'
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

export default IndustryNewForm;
