import { Link as RouterLink } from 'react-router-dom';
import {
  styled,
  Card,
  Stack,
  IconButton,
  Typography,
  Box,
  Divider,
} from '@mui/material';

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

interface IJob {
  title: string;
  companyName: string;
  companyLogo: string;
  salary: string;
  location: string;
  skill: string[];
  postDate: string;
}

interface Iprops {
  job: IJob;
}

const JobCardWrapper = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  boxShadow:
    'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
  border: '2px solid transparent',
  '&:hover': {
    border: '2px solid #FF4842',
  },
});

const BadgeSkill = styled(Box)({
  padding: '5px 10px',
  border: '1px solid silver',
  fontSize: '12px',
  fontWeight: 500,
  borderRadius: '8px',
});

const JobCard = ({ job }: Iprops) => {
  console.log(job);
  return (
    <JobCardWrapper>
      <Stack direction='row' justifyContent='space-between'>
        <img
          style={{ width: '60px', height: '60px' }}
          src={job.companyLogo}
          alt='company-logo'
        />
        <IconButton>
          <BookmarkBorderOutlinedIcon />
        </IconButton>
      </Stack>
      <Stack>
        <RouterLink
          to={`/`}
          style={{
            textDecoration: 'none',
            color: 'black',
          }}
        >
          <Typography variant='h6' gutterBottom fontWeight={700}>
            {job.title}
          </Typography>
        </RouterLink>
        <Typography
          variant='body2'
          gutterBottom
          fontWeight={700}
          color='rgb(34, 184, 207)'
        >
          {job.companyName}
        </Typography>
        <Stack
          direction='row'
          alignItems='center'
          sx={{ color: 'rgb(145, 158, 171)' }}
        >
          <LocationOnOutlinedIcon />
          <Typography variant='subtitle2' fontWeight={500}>
            {job.location}
          </Typography>
        </Stack>
        <Typography variant='subtitle2' fontWeight={500} sx={{ marginTop: 1 }}>
          Posted date: {job.postDate}
        </Typography>
        <Divider sx={{ margin: 2 }} />
        <Stack direction='row' spacing={2}>
          {job.skill.map((skill) => {
            return <BadgeSkill key={skill}>{skill}</BadgeSkill>;
          })}
        </Stack>
      </Stack>
    </JobCardWrapper>
  );
};

export default JobCard;
