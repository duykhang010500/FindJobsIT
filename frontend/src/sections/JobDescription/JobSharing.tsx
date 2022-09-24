import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();

  return (
    <Fragment>
      <Typography gutterBottom variant='h3' mt={3} mb={3}>
        Share This Job
      </Typography>
      <TextField
        defaultValue={`https:/jobsit${pathname}`}
        disabled
        InputProps={{
          endAdornment: (
            <Tooltip title={`Copy`} placement='top'>
              <IconButton>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          ),
        }}
        fullWidth
      />
      <Stack direction='row' spacing={2} mt={3}>
        <FacebookIcon fontSize='large' sx={{ color: '#1877F2' }} />
        <GoogleIcon fontSize='large' sx={{ color: '#ea4335' }} />
        <LinkedInIcon fontSize='large' sx={{ color: '#0A66C2' }} />
      </Stack>
    </Fragment>
  );
};

export default JobSharing;
