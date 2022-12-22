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
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import { GiSkills } from 'react-icons/gi';
import { BsGenderAmbiguous } from 'react-icons/bs';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';

import { getJobType, getStrFromArr } from '../../../utils/convert';
import { jobTypes } from '../../../utils/defaultValues';

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
      <List sx={{ maxWidth: '400px' }} disablePadding>
        <ListItem
          disableGutters
          secondaryAction={
            <Typography variant='body2'>
              {job?.salary === 'Negotiate' && 'Negotiate'}
              {job?.salary === 'VND' && (
                <span>
                  {job?.salary_from + ' - ' + job?.salary_to + ' VND'}
                </span>
              )}
              {job?.salary === 'USD' && (
                <span>
                  {job?.salary_from + ' - ' + job?.salary_to + ' USD'}
                </span>
              )}
            </Typography>
          }
        >
          <ListItemIcon>
            <PaidOutlinedIcon sx={{ color: '#52c41a' }} />
          </ListItemIcon>
          <ListItemText primary={`Salary:`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={
            <Typography variant='body2'>{getJobType[job?.job_type]}</Typography>
          }
        >
          <ListItemIcon>
            <AccessTimeOutlinedIcon sx={{ color: '#36cfc9' }} />
          </ListItemIcon>
          <ListItemText primary={`Working type:`} />
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
            <FmdGoodOutlinedIcon sx={{ color: '#ff4d4f' }} />
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
            <SchoolOutlinedIcon sx={{ color: '#ffc53d' }} />
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
            <BadgeOutlinedIcon sx={{ color: '#9254de' }} />
          </ListItemIcon>
          <ListItemText primary={`Level:`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={
            <Typography variant='body2'>
              {getStrFromArr(job?.industries)}
            </Typography>
          }
        >
          <ListItemIcon>
            <WorkOutlineOutlinedIcon sx={{ color: '#597ef7' }} />
          </ListItemIcon>
          <ListItemText primary={`Industries:`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={
            <Typography variant='body2'>
              {job?.exp === 'Not require' ? (
                'Not require'
              ) : (
                <span>{job?.exp_from + ' - ' + job?.exp_to + ' year'}</span>
              )}
            </Typography>
          }
        >
          <ListItemIcon>
            <WorkHistoryOutlinedIcon sx={{ color: '#fa8c16' }} />
          </ListItemIcon>
          <ListItemText primary={`Experience:`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={
            <Typography variant='body2'>{job?.unskill_job}</Typography>
          }
        >
          <ListItemIcon>
            <GiSkills style={{ color: '#eb2f96', fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText primary={`Skills:`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={
            <Typography variant='body2'>
              {job?.gender === 0 && 'Not require'}
              {job?.gender === 1 && 'Male'}
              {job?.gender === 2 && 'Female'}
            </Typography>
          }
        >
          <ListItemIcon>
            <BsGenderAmbiguous style={{ color: '#8c8c8c', fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText primary={`Gender:`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={
            <Typography variant='body2'>{`${job?.age_from} - ${job?.age_to}`}</Typography>
          }
        >
          <ListItemIcon>
            <EmojiPeopleOutlinedIcon
              style={{ color: '#434343', fontSize: 20 }}
            />
          </ListItemIcon>
          <ListItemText primary={`Age:`} />
        </ListItem>
      </List>
    </Card>
  );
};

export default JobOverview;
