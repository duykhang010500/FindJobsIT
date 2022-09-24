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
        border: `1px solid #f0f0f0`,
        '&:hover': {
          borderColor: '#ffd6e7',
          backgroundColor: '#fff0f6',
        },
        boxShadow: 'none',
      }}
    >
      <List disablePadding>
        <ListItem disableGutters>
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
