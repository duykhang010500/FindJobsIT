import {
  Card,
  List,
  ListItem,
  Typography,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';

import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

import { getStrFromArr } from '../../../utils/convert';

type Props = {};

const JobOverview = (props: Props) => {
  const { job } = useSelector((state: AppState) => state.jobs);

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
          secondaryAction={<Typography variant='body2'>Negotiate</Typography>}
        >
          <ListItemIcon>
            <PaidOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Salary:`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={
            <Typography variant='body2'>
              {job && getStrFromArr(job?.locations)}
            </Typography>
          }
        >
          <ListItemIcon>
            <FmdGoodOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Location:`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={
            <Typography variant='body2'>{job?.degree}</Typography>
          }
        >
          <ListItemIcon>
            <BadgeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Education:`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={
            <Typography variant='body2'>{job?.level}</Typography>
          }
        >
          <ListItemIcon>
            <SchoolOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Level:`} />
        </ListItem>
      </List>
    </Card>
  );
};

export default JobOverview;
