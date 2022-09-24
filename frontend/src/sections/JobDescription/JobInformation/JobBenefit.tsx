import {
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
type Props = {};

const JobBenefit = (props: Props) => {
  return (
    <Card
      sx={{
        p: 3,
        boxShadow:
          'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
      }}
    >
      <List disablePadding>
        <ListItem disablePadding>
          <ListItemIcon>
            <PaidOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`13 month salary`} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <EmojiEventsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Team building`} />
        </ListItem>
      </List>
    </Card>
  );
};

export default JobBenefit;
