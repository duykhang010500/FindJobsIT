import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  TextField,
  Button,
  FormHelperText,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import SendIcon from '@mui/icons-material/Send';

import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Editor from '../../../components/Editor';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { useDispatch } from 'react-redux';
import { closeMail, employerSendMail } from '../../../store/candidates/action';

type Props = {};

const MailDialog = (props: Props) => {
  const dispatch = useDispatch();

  const { isOpenMail, isSendMail, selectedCandidate } = useSelector(
    (state: AppState) => state.candidates
  );

  const validate = yup.object({
    title: yup
      .string()
      .max(40, 'Title allow maximum 40 character')
      .required('Title is required'),
    content: yup
      .string()
      .max(500, 'Content allow maximum 200 character')
      .required('Content is required'),
  });

  const defaultValues = {
    title: '',
    content: '',
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(validate),
    mode: 'onChange',
  });

  const onSubmit = (values: any) => {
    let apply_id = selectedCandidate?.id;
    const formData = {
      ...values,
      apply_id,
      email: selectedCandidate?.member?.email,
    };
    console.log(formData);
    dispatch(employerSendMail(formData));
  };

  return (
    <Dialog
      open={isOpenMail}
      onClose={() => {
        dispatch(closeMail());
        reset();
      }}
    >
      <DialogTitle>
        <Typography variant='h4' component='span'>
          New mail
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ width: '500px', padding: '20px !important' }}>
          <Stack spacing={3}>
            <TextField
              size='small'
              label='Receiver *'
              value={selectedCandidate?.member?.fullname}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              size='small'
              label='Email *'
              value={selectedCandidate?.member?.email}
              InputProps={{
                readOnly: true,
              }}
            />
            <Controller
              control={control}
              name='title'
              render={({ field, fieldState: { error } }) => {
                return (
                  <TextField
                    {...field}
                    label='Title *'
                    error={!!error}
                    helperText={error?.message}
                  />
                );
              }}
            />
            <Stack spacing={1}>
              <FormHelperText sx={{ ml: 1.5 }}>
                <Typography variant='body2'>Content *</Typography>
              </FormHelperText>
              <Controller
                control={control}
                name='content'
                render={({ field, fieldState: { error } }) => {
                  return (
                    <Editor
                      id='content'
                      error={!!error}
                      value={field.value}
                      onChange={field.onChange}
                      helperText={error?.message}
                    />
                  );
                }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={() => {
              dispatch(closeMail());
              reset();
            }}
            disabled={isSendMail}
          >
            Close
          </Button>
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isSendMail}
            startIcon={<SendIcon />}
          >
            Send
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MailDialog;
