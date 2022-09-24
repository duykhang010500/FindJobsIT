import React from 'react';
import {
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
type Props = {};

const JobOverview = (props: Props) => {
  return (
    <Card
      sx={{
        padding: 3,
        border: `1px solid #f0f0f0`,
        '&:hover': {
          borderColor: '#ffd6e7',
          backgroundColor: '#fff0f6',
        },
        boxShadow: 'none',
      }}
    >
      <List sx={{ maxWidth: '300px' }} disablePadding>
        <ListItem
          disableGutters
          secondaryAction={<Typography variant='body2'>1000$</Typography>}
        >
          <ListItemIcon>
            <PaidOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Salary:`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={<Typography variant='body2'>Ho Chi Minh</Typography>}
        >
          <ListItemIcon>
            <FmdGoodOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Location:`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={<Typography variant='body2'>Leader</Typography>}
        >
          <ListItemIcon>
            <BadgeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Location:`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={<Typography variant='body2'>Permanent</Typography>}
        >
          <ListItemIcon>
            <SchoolOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Job Type:`} />
        </ListItem>
      </List>
    </Card>
  );
};

export default JobOverview;
