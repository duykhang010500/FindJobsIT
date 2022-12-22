import { FC } from 'react';
import { Box, styled } from '@mui/material';

import LogoImg from '../assets/images/Logo.png';

type Props = {
  isMobile?: boolean;
};

const LogoStyle = styled('img')({
  display: 'block',
  width: '100%',
  height: '100%',
});

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
      <LogoStyle src={`${LogoImg}`} sx={{ width: 80, height: 45 }} />
    </Box>
  );
};

export default Logo;
