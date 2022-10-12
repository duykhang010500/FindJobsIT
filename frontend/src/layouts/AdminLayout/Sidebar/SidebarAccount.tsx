import React from 'react';
import { Box, Stack, Typography, styled, Avatar } from '@mui/material';

type Props = {};

const Wrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(145, 158, 171, 0.12)',
  width: '100%',
  padding: '20px 50px 20px 20px',
  borderRadius: 8,
  marginTop: '20px',
});

const SidebarAccount = (props: Props) => {
  return (
    <Wrapper>
      <Avatar />
      <Stack spacing={0.2} sx={{ ml: 2 }}>
        <Typography variant='body1' sx={{ fontWeight: 500 }}>
          Full Name
        </Typography>
        <Typography variant='caption'>Admin</Typography>
      </Stack>
    </Wrapper>
  );
};

export default SidebarAccount;
