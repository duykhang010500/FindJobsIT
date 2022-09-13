import React from 'react';
import { Stack, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type Props = {};

const MENU = [
  { title: 'Jobs', to: '/jobs' },
  { title: 'Top Company', to: '/top-company' },
  { title: 'Blog', to: '/blog' },
  { title: 'About Us', to: '/about' },
];

const HeaderMenu = (props: Props) => {
  return (
    <Stack direction='row' spacing={3} alignItems='center'>
      {MENU.map((item) => {
        return (
          <Link key={item.title} component={RouterLink} to={`${item.to}`}>
            {item.title}
          </Link>
        );
      })}
    </Stack>
  );
};

export default HeaderMenu;
