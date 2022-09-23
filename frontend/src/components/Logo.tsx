import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

type Props = {
  isMobile?: boolean;
};

const Logo: FC<Props> = ({ isMobile }) => {
  return (
    <Box
      sx={{
        ...(isMobile && {
          padding: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }),
      }}
    >
      <Typography variant='body1'>Logo</Typography>
    </Box>
  );
};

export default Logo;
