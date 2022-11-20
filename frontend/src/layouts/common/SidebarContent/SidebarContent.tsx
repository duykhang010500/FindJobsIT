import { List } from '@mui/material';

import NavItem from './NavItem';

type Props = {
  sidebarData?: any;
};

// interface ISidebarData {
//   title: string;
//   icon?: any;
//   path?: string;
//   children: any;
// }

const SidebarContent = ({ sidebarData }: Props) => {
  return (
    <List sx={{ mt: 3, width: '100%' }}>
      {sidebarData.map((item: any) => {
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
