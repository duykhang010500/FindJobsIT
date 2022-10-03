import { useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import NavItemHeader from './NavItemHeader';

interface NavItemProps {
  title: string;
  icon?: any;
  path?: string;
  children?: NavItemProps[];
}

const NavItem = ({ title, icon, path, children }: NavItemProps) => {
  const { pathname } = useLocation();
  if (children) {
    return (
      <NavItemHeader
        title={title}
        icon={icon}
        path={path}
        children={children}
      />
    );
  }

  return (
    <ListItemButton
      selected={path === pathname}
      sx={{
        '&.MuiListItemButton-root': {
          color: 'rgb(99, 115, 129)',
        },
        '&.Mui-selected': {
          backgroundColor: 'primary',
          color: '#FA541C',
        },
      }}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={`${title}`} />
    </ListItemButton>
  );
};

export default NavItem;
