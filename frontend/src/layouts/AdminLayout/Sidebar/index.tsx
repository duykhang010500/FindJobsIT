import { Box } from '@mui/material';
import Logo from '../../../components/Logo';
import SidebarContent from '../../common/SidebarContent/SidebarContent';

import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import DescriptionIcon from '@mui/icons-material/Description';

import { Drawer } from '@mui/material';

type Props = {};

const sidebarData = [
  {
    title: `Dashboard`,
    icon: <DashboardTwoToneIcon />,
    path: '/admin/dashboard',
  },
  {
    title: `Employers`,
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
  {
    title: `Jobs`,
    icon: <WorkIcon />,
    path: '/admin/jobs',
    children: [
      { title: 'Pending Jobs', path: '/admin/jobs/pending' },
      { title: 'Active Jobs', path: '/admin/jobs/active' },
      { title: 'Rejected Jobs', path: '/admin/jobs/reject' },
    ],
  },
  {
    title: `Candidates`,
    icon: <PeopleIcon />,
    path: '/admin/candidates/list',
    // children: [{ title: `List of candidates`, path: `/admin/candidates/list` }],
  },
  {
    title: `Services`,
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
    ],
  },
];

const Sidebar = (props: Props) => {
  return (
    <Box
      component={'nav'}
      sx={{
        flexShrink: 0,
        width: 280,
        border: 'none',
      }}
    >
      <Drawer
        open
        variant='permanent'
        PaperProps={{
          sx: {
            width: 280,
            padding: '10px',
            borderRight: '1px dashed rgba(145, 158, 171, 0.24)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',

            // maxHeight: '500px',
          }}
        >
          <Logo />
          <SidebarContent sidebarData={sidebarData} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
