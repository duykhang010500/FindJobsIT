import React from 'react';

import { Card, Divider } from '@mui/material';
import SidebarCompanyAvatar from './SidebarCompanyAvatar';
import SidebarContent from './SidebarContent/SidebarContent';

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <Card sx={{ p: 3, position: 'sticky', top: '86px' }}>
      <SidebarCompanyAvatar />
      <Divider sx={{ my: 2 }} />
      <SidebarContent />
    </Card>
  );
};

export default Sidebar;
