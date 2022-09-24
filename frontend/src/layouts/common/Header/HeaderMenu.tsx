import { FC } from 'react';
import { styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type Props = {};

const MENU = [
  { title: 'Jobs', to: '/jobs' },
  { title: 'Top Company', to: '/top-company' },
  { title: 'Blog', to: '/blog' },
  { title: 'About Us', to: '/about' },
];

const StyledList = styled('ul')({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
});

const StyledLink = styled('li')(({ theme }) => ({
  fontWeight: 600,
  position: 'relative',
  textDecoration: 'none',
  WebkitTapHighlightColor: 'transparent',
  color: 'black',
  margin: '0px 20px',
  cursor: 'pointer',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    transition: 'width 0.5s ease',
    height: '2px',
    backgroundColor: `${theme.palette.primary.main}`,
  },
  '&:hover': {
    color: `${theme.palette.primary.main}`,
    '&:after': {
      width: '100%',
    },
  },
}));

const HeaderMenu: FC<Props> = () => {
  return (
    <StyledList>
      {MENU.map((item) => {
        return (
          <RouterLink
            key={item.title}
            to={`/${item.to}`}
            style={{ textDecoration: 'none' }}
          >
            <StyledLink>{item.title}</StyledLink>
          </RouterLink>
        );
      })}
    </StyledList>
  );
};

export default HeaderMenu;
