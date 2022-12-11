import React from 'react';
import SidebarContent from '../common/SidebarContent/SidebarContent';

import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BadgeIcon from '@mui/icons-material/Badge';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';

type Props = {};

const menu = [
  // { title: 'Dashboard', icon: <DashboardIcon />, path: '/my/dashboard' },
  { title: 'Profile', icon: <PersonIcon />, path: '/my/profile' },
  // { title: 'My CV', icon: <BadgeIcon />, path: '/my/cv' },
  {
    title: 'Applied Jobs',
    icon: <WorkIcon />,
    path: '/my/jobs/applied',
  },
  { title: 'Saved Jobs', icon: <FavoriteIcon />, path: '/my/jobs/saved' },
  {
    title: 'Following companies',
    icon: <ApartmentRoundedIcon />,
    path: '/my/companies/saved',
  },
];

const JobSeekerDashboardSidebar = (props: Props) => {
  return <SidebarContent sidebarData={menu} />;
};

export default JobSeekerDashboardSidebar;
