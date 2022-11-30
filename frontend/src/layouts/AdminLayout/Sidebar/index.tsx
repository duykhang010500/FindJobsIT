import { Box } from '@mui/material';
import Logo from '../../../components/Logo';
import SidebarContent from '../../common/SidebarContent/SidebarContent';

import WorkIcon from '@mui/icons-material/Work';
// eslint-disable-next-line
import PeopleIcon from '@mui/icons-material/People';
// eslint-disable-next-line
import BusinessIcon from '@mui/icons-material/Business';

import SettingsIcon from '@mui/icons-material/Settings';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';

type Props = {};

const sidebarData = [
  {
    title: `Dashboard`,
    icon: <DashboardIcon />,
    path: '/admin/dashboard',
  },
  {
    title: `Employers management`,
    icon: <ApartmentIcon />,
    children: [
      {
        title: `Requested Employer`,
        path: '/admin/employers/requested',
      },
      {
        title: `Active Employer`,
        path: '/admin/employers/active',
      },
      {
        title: `Rejected Employer`,
        path: '/admin/employers/rejected',
      },
    ],
  },
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
        title: `Locations`,
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
        width: '280px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        borderRight: '1px dashed rgba(145, 158, 171, 0.24)',
        minHeight: '100vh',
      }}
    >
      <Logo />
      {/* <SidebarAccount /> */}
      <SidebarContent sidebarData={sidebarData} />
    </Box>
  );
};

export default Sidebar;
