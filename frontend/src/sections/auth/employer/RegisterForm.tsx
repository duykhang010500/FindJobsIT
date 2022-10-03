import { useState } from 'react';
import {
  Stack,
  Typography,
  Box,
  Card,
  TextField,
  Autocomplete,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

const RegisterForm = () => {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card sx={{ p: 5 }}>
      <Stack spacing={3}>
        <Typography variant='h3' color='primary' textTransform='uppercase'>
          Create account for HR
        </Typography>
        <Box p={1} sx={{ backgroundColor: '#f2f4f5', borderRadius: 1 }}>
          <Typography variant='h5' textAlign='center'>
            Account
          </Typography>
        </Box>
        <Stack direction='row' spacing={2}>
          <TextField
            label={`First name`}
            name='firstName'
            fullWidth
            size='small'
          />
          <TextField label={`Last name`} name='lastName' size='small' />
        </Stack>
        <TextField label={`Email`} name='email' size='small' />
        <TextField label={`Phone`} name='phone' size='small' />
        <TextField label={`Password`} name='password' size='small' />
        <TextField label={`Confirm Password`} name='cf_password' size='small' />
        <Box p={1} sx={{ backgroundColor: '#f2f4f5', borderRadius: 1 }}>
          <Typography variant='h5' textAlign='center'>
            Company Info
          </Typography>
        </Box>
        <TextField label={`Company name`} name='companyName' size='small' />
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={[]}
          renderInput={(params) => (
            <TextField {...params} label='Job' size='small' />
          )}
        />
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={[]}
          renderInput={(params) => (
            <TextField {...params} label='Location' size='small' />
          )}
        />
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={[]}
          renderInput={(params) => (
            <TextField {...params} label='Company size' size='small' />
          )}
        />
        <TextField
          label={`Short description`}
          minRows={3}
          name='shortDesc'
          multiline
        />
        <LoadingButton
          variant='contained'
          size='large'
          loading={isLoading}
        >{`Register`}</LoadingButton>
      </Stack>
    </Card>
  );
};

export default RegisterForm;
