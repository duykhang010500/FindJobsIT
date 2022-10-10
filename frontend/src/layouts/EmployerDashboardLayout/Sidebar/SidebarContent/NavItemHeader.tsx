import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const NavItemHeader = ({ title, icon, path, children }: any) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          '&.MuiListItemButton-root': {
            color: 'rgb(99, 115, 129)',
          },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={`${title}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {open && (
        <Collapse in={open}>
          {children.map((item: any) => {
            return (
              <ListItemButton
                key={item.title}
                component={Link}
                to={`${item.path}`}
                selected={item.path === pathname}
                sx={{
                  pl: 5,
                  '&.MuiListItemButton-root': {
                    color: 'rgb(99, 115, 129)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'primary',
                    color: '#FA541C',
                  },
                }}
              >
                <ListItemText primary={`${item.title}`} />
              </ListItemButton>
            );
          })}
        </Collapse>
      )}
    </>
  );
};
export default NavItemHeader;
