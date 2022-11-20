import React from 'react';
import { Box } from '@mui/material';
import Logo from '../../../components/Logo';
import SidebarAccount from './SidebarAccount';
import SidebarContent from '../../common/SidebarContent/SidebarContent';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';

type Props = {};

const sidebarData = [
  {
    title: `Dashboard`,
    icon: <DashboardIcon />,
    path: '/admin/dashboard',
  },
  // {
  //   title: `Employers management`,
  //   icon: <BusinessIcon />,
  //   children: [
  //     {
  //       title: `Companies`,
  //       path: '/admin/companies',
  //     },
  //   {
  //     title: `Jobs`,
  //     path: '/admin/companies/jobs',
  //   },
  //   ],
  // },
  // {
  //   title: `Candidates Management`,
  //   icon: <PeopleIcon />,
  //   path: '/admin/candidates',
  //   children: [{ title: `List`, path: `/admin/candidates/list` }],
  // },
  {
    title: `Jobs Management`,
    icon: <WorkIcon />,
    path: '/admin/jobs',
    children: [
      { title: 'Pending Jobs', path: '/admin/jobs/pending' },
      { title: 'Active Jobs', path: '/admin/jobs/active' },
      { title: 'Reject Jobs', path: '/admin/jobs/reject' },
    ],
  },
  {
    title: `Services Management`,
    icon: <DescriptionIcon />,
    path: '/admin/services',
    children: [
      { title: `List of services`, path: '/admin/services/list' },
      { title: `Orders`, path: '/admin/services/orders' },
    ],
  },
  {
    title: `Settings`,
    icon: <SettingsIcon />,
    children: [
      {
        title: `Location`,
        path: '/admin/settings/location',
      },
      {
        title: `Industries`,
        path: `/admin/settings/industries`,
      },
      // {
      //   title: `Degrees`,
      //   path: `/admin/settings/degree`,
      // },
      // {
      //   title: `Level`,
      //   path: `/admin/settings/level`,
      // },
    ],
  },
];

const Sidebar = (props: Props) => {
  return (
    <Box
      sx={{
        width: '320px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        borderRight: '1px dashed rgba(145, 158, 171, 0.24)',
        minHeight: '100vh',
      }}
    >
      <Logo />
      <SidebarAccount />
      <SidebarContent sidebarData={sidebarData} />
    </Box>
  );
};

export default Sidebar;
