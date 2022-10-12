import React from 'react';

import { Card, Divider } from '@mui/material';
import SidebarCompanyAvatar from './SidebarCompanyAvatar';
import SidebarContent from '../../common/SidebarContent/SidebarContent';

import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
type Props = {};

const sidebarData = [
  {
    title: `Dashboard`,
    icon: <DashboardIcon />,
    path: '/employer/hr/dashboard',
  },
  {
    title: `Manage Jobs Postings`,
    icon: <BusinessCenterIcon />,
    children: [
      {
        title: `Jobs open`,
        path: '/employer/hr/jobs/active',
      },
      {
        title: `Jobs closed`,
        path: '/employer/hr/jobs/inactive',
      },
    ],
  },
  {
    title: `Candidates Management`,
    icon: <PeopleRoundedIcon />,
    path: '/employer/hr/candidates',
  },
  {
    title: `Manage Services`,
    icon: <TextSnippetIcon />,
    children: [
      {
        title: `Active services`,
        path: '/employer/hr/order/active',
      },
      {
        title: `Expire services`,
        path: '/employer/hr/order/expire',
      },
    ],
  },
];

const Sidebar = (props: Props) => {
  return (
    <Card sx={{ p: 3, position: 'sticky', top: '86px' }}>
      <SidebarCompanyAvatar />
      <Divider sx={{ my: 2 }} />
      <SidebarContent sidebarData={sidebarData} />
    </Card>
  );
};

export default Sidebar;
