import { List } from '@mui/material';

import NavItem from './NavItem';

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

const SidebarContent = (props: Props) => {
  return (
    <List>
      {sidebarData.map((item) => {
        return (
          <NavItem
            key={item.title}
            title={`${item.title}`}
            icon={item.icon}
            path={`${item.path}`}
            children={item.children}
          />
        );
      })}
    </List>
  );
};

export default SidebarContent;
