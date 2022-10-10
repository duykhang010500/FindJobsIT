import { FC } from 'react';
import { styled } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { employerMenu, jobSeekerMenu } from '../../../configs/menuConfig';
type Props = {};

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
  const { pathname } = useLocation();

  const renderEmployerMenu = employerMenu.map((item) => (
    <RouterLink
      key={item.title}
      to={`${item.to}`}
      style={{ textDecoration: 'none' }}
    >
      <StyledLink>{item.title}</StyledLink>
    </RouterLink>
  ));

  const renderJobSeekerMenu = jobSeekerMenu.map((item) => (
    <RouterLink
      key={item.title}
      to={`${item.to}`}
      style={{ textDecoration: 'none' }}
    >
      <StyledLink>{item.title}</StyledLink>
    </RouterLink>
  ));

  return (
    <StyledList>
      {pathname.includes('/employer')
        ? renderEmployerMenu
        : renderJobSeekerMenu}
    </StyledList>
  );
};

export default HeaderMenu;
