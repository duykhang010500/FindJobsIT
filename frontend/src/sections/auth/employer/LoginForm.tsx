import { useState } from 'react';
import {
  Card,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type Props = {};

const LoginForm = (props: Props) => {
  //eslint-disable-next-line
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Card sx={{ p: 10 }}>
      <Stack spacing={4}>
        <Typography variant='h2' gutterBottom>{`Welcome back!`}</Typography>
        <TextField
          label={`Email`}
          name='email'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label={`Password`}
          name='password'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <VpnKeyOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton size='large' variant='contained' loading={isLoading}>
          {`Login`}
        </LoadingButton>
      </Stack>
    </Card>
  );
};

export default LoginForm;
