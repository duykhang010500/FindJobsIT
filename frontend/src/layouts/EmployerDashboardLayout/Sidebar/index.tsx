import { Card, Divider } from '@mui/material';
import SidebarCompanyAvatar from './SidebarCompanyAvatar';
import SidebarContent from '../../common/SidebarContent/SidebarContent';

import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

type Props = {};

const sidebarData = [
  {
    title: `Dashboard`,
    icon: <DashboardIcon />,
    path: '/employer/hr/dashboard',
  },
  {
    title: `Jobs Management`,
    icon: <BusinessCenterIcon />,
    children: [
      {
        title: `Open Jobs`,
        path: '/employer/hr/jobs/active',
      },
      {
        title: `Closed Jobs`,
        path: '/employer/hr/jobs/closed',
      },
      {
        title: `Draft Jobs`,
        path: `/employer/hr/jobs/draft`,
      },
    ],
  },
  {
    title: `Candidates Management`,
    icon: <PeopleRoundedIcon />,
    // path: '/employer/hr/candidates',
    children: [
      { title: 'Candidates application', path: '/employer/hr/candidates' },
      // { title: 'Saved candidates', path: '/employer/hr/saved-candidates' },
      { title: 'History sent mail', path: '/employer/hr/mails' },
    ],
  },
  {
    title: `Manage Services`,
    icon: <TextSnippetIcon />,
    children: [
      {
        title: `Ordered services`,
        path: '/employer/hr/services/order',
      },
      {
        title: `Active services`,
        path: '/employer/hr/services/active',
      },
    ],
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    children: [
      {
        title: 'My profile',
        path: '/employer/hr/my',
      },
      {
        title: 'My Company',
        path: '/employer/hr/company',
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
