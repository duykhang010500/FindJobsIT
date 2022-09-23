import { Link as RouterLink } from 'react-router-dom';
import {
  styled,
  Card,
  Stack,
  Typography,
  Box,
  Divider,
  Link,
  useTheme,
} from '@mui/material';

import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import { HiOutlineLocationMarker } from 'react-icons/hi';

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

const randomBadgeColor = [
  {
    backgroundColor: '#fff2e8',
    color: '#ff4d4f',
  },
  {
    backgroundColor: '#e6f7ff',
    color: '#69c0ff',
  },
  {
    backgroundColor: '#f9f0ff',
    color: '#b37feb',
  },
  {
    backgroundColor: '#d9f7be',
    color: '#52c41a',
  },
  {
    backgroundColor: '#fff0f6',
    color: '#ff85c0',
  },
];

const JobCardWrapper = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  border: '2px solid transparent',
  borderRadius: '18px',
  boxShadow: '-12px 12px 48px -4px rgba(145, 158, 171, 0.12)',
  '&:hover': {
    boxShadow: '-24px 24px 72px -8px rgba(145, 158, 171, 0.24)',
  },
});

const BadgeSkill = styled(Box)({
  padding: '5px 10px',
  fontSize: '11px',
  fontWeight: 600,
  borderRadius: '16px',
});

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
  backgroundColor: '#fff0f6',
  borderRadius: theme.shape.borderRadius,
}));

const JobCard = ({ job }: Iprops) => {
  const theme = useTheme();
  return (
    <JobCardWrapper>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <img
          style={{ width: '60px', height: '60px' }}
          src={job.companyLogo}
          alt='company-logo'
        />
        {/* <IconWrapper>
          <RiHeart3Line
            style={{ color: '#434343', fontSize: '1.2rem', cursor: 'pointer' }}
          />
        </IconWrapper> */}
        <IconWrapper>
          <RiHeart3Fill
            style={{
              color: `${theme.palette.primary.main}`,
              fontSize: '1.2rem',
              cursor: 'pointer',
            }}
          />
        </IconWrapper>
      </Stack>
      <Stack>
        <Link component={RouterLink} to={`/job/slug`}>
          <Typography variant='h6' gutterBottom fontWeight={500}>
            {job.title}
          </Typography>
        </Link>
        <Typography
          variant='body2'
          gutterBottom
          fontWeight={500}
          color='rgb(34, 184, 207);'
        >
          {job.companyName}
        </Typography>
        <Stack direction='row' sx={{ color: 'rgb(99, 115, 129);' }}>
          <HiOutlineLocationMarker />
          <Typography fontWeight={500} variant='body2' marginLeft={1}>
            {job.location}
          </Typography>
        </Stack>
        <Typography
          variant='body2'
          sx={{ marginTop: 1 }}
          color='rgb(145, 158, 171)'
        >
          Posted date: {job.postDate}
        </Typography>
        <Divider sx={{ margin: '15px 0px' }} />
        <Stack direction='row' spacing={2}>
          {job.skill.map((skill) => {
            return (
              <BadgeSkill
                key={skill}
                sx={{
                  ...randomBadgeColor[Math.floor(Math.random() * 5)],
                }}
              >
                {skill}
              </BadgeSkill>
            );
          })}
        </Stack>
      </Stack>
    </JobCardWrapper>
  );
};

export default JobCard;
