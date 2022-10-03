import { useState } from 'react';

import { useLocation } from 'react-router-dom';
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// type Props = {};

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
                selected={path === pathname}
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
