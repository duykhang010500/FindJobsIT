import { List } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

import NavItem from './NavItem';

type Props = {};

const sidebarData = [
  {
    title: `Dashboard`,
    icon: <DashboardIcon />,
    path: '/employer/dashboard',
  },
  {
    title: `Manage Jobs Postings`,
    icon: <BusinessCenterIcon />,
    children: [
      {
        title: `Jobs open`,
        path: '/employer/jobs/active',
      },
      {
        title: `Jobs closed`,
        path: '/employer/jobs/inactive',
      },
    ],
  },
  {
    title: `Candidates Management`,
    icon: <PeopleRoundedIcon />,
    path: '/employer/candidates',
  },
  {
    title: `Manage Order`,
    icon: <TextSnippetIcon />,
    children: [
      {
        title: `Active order`,
        path: '/employer/order/active',
      },
      {
        title: `Expire order`,
        path: '/employer/order/expire',
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