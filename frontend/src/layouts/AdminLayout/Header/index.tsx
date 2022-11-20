import React from 'react';
import { AppBar, Stack, styled, Toolbar, Box } from '@mui/material';
import HeaderAccount from './HeaderAccount';
import HeaderLangues from '../../common/Header/HeaderLanguages';

type Props = {};
const HeaderWrapper = styled(AppBar)({
  backgroundColor: '#fff',
  boxShadow: 'none',
  height: 60,
});

const Header = (props: Props) => {
  return (
    <HeaderWrapper>
      <Toolbar
        sx={{
          minHeight: '100%',
          borderBottom: '1px solid rgb(240, 240, 240)',
          zIndex: 9999,
          backgroundColor: '#fff',
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction='row' spacing={2}>
          <HeaderLangues />
          <HeaderAccount />
        </Stack>
      </Toolbar>
    </HeaderWrapper>
  );
};

export default Header;
