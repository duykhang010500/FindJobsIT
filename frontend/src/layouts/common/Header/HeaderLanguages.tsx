import React, { FC, useState, Fragment } from 'react';
import {
  IconButton,
  Popover,
  Stack,
  MenuItem,
  Typography,
} from '@mui/material';

import FlagEN from '../../../assets/images/flag_en.svg';
import FlagVN from '../../../assets/images/flag_vn.svg';

type Props = {};
const langs = [
  { flag: FlagEN, name: 'English' },
  { flag: FlagVN, name: 'Vietnamese' },
];

const HeaderLangues: FC<Props> = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<any>(langs[0]);

  const open = Boolean(anchorEl);

  return (
    <Fragment>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <img src={currentLanguage.flag} alt='flag' />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack spacing={0.75}>
          {langs.map((lang, index) => {
            return (
              <MenuItem
                key={lang.name}
                selected={currentLanguage.name === lang.name}
                onClick={() => {
                  setCurrentLanguage(langs[index]);
                  setAnchorEl(null);
                }}
              >
                <img src={lang.flag} alt='flag' />

                <Typography marginLeft={1} variant='body2'>
                  {lang.name}
                </Typography>
              </MenuItem>
            );
          })}
        </Stack>
      </Popover>
    </Fragment>
  );
};

export default HeaderLangues;
