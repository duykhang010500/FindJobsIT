import { Fragment } from 'react';

import {
  Typography,
  TextField,
  Tooltip,
  IconButton,
  Stack,
} from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';

type Props = {};

const JobSharing = (props: Props) => {
  return (
    <Fragment>
      <Typography gutterBottom variant='h3' mt={3} mb={3}>
        Share This Job
      </Typography>
      <TextField
        defaultValue={`${window.location.href}`}
        disabled
        InputProps={{
          endAdornment: (
            <Tooltip title={`Copy`} placement='top'>
              <IconButton color='primary'>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          ),
        }}
        fullWidth
      />
      <Stack justifyContent='center' direction='row' spacing={2} mt={3}>
        <FacebookIcon fontSize='medium' sx={{ color: '#1877F2' }} />
        <GoogleIcon fontSize='medium' sx={{ color: '#ea4335' }} />
        <LinkedInIcon fontSize='medium' sx={{ color: '#0A66C2' }} />
      </Stack>
    </Fragment>
  );
};

export default JobSharing;
