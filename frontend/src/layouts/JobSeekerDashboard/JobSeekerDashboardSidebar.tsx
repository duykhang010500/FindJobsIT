import React from 'react';
import SidebarContent from '../common/SidebarContent/SidebarContent';

import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';

type Props = {};

const menu = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/my/dashboard' },
  { title: 'Profile', icon: <PersonIcon />, path: '/my/profile' },
  {
    title: 'My jobs',
    icon: <WorkIcon />,
    children: [
      {
        title: 'Applied',
        path: '/my/jobs',
      },
      { title: 'Saved', path: '/my/jobs/saved' },
    ],
  },
  // { title: 'Settings', icon: <SettingsIcon />, path: '/my/settings' },
];

const JobSeekerDashboardSidebar = (props: Props) => {
  return <SidebarContent sidebarData={menu} />;
};

export default JobSeekerDashboardSidebar;
