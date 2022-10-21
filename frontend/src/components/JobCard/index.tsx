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

// eslint-disable-next-line
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import UpdateIcon from '@mui/icons-material/Update';

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
  isSmall?: boolean;
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

const SmallJobCardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '8px',
  border: `1px solid #f2f4f5`,
  '&:hover': {
    border: `1px solid #ffd6e7`,
    backgroundColor: '#fff0f6',
  },
}));

const SmallJobCardImg = styled('img')({
  display: 'block',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
});

const JobCard = ({ job, isSmall = false }: Iprops) => {
  const theme = useTheme();

  if (isSmall) {
    return (
      <SmallJobCardWrapper>
        <SmallJobCardImg src={`${job.companyLogo}`} />
        <Stack spacing={1.5} ml={3} sx={{ width: '100%' }}>
          <Link component={RouterLink} to={'/'}>
            <Typography variant='h3'>{job.title}</Typography>
          </Link>
          <Typography variant='h5' color='#096dd9'>
            {job.companyName}
          </Typography>
          <Typography variant='body2'>
            <PaidOutlinedIcon
              fontSize='small'
              sx={{ verticalAlign: 'middle', marginRight: 1 }}
            />
            {job.salary}
          </Typography>
          <Typography variant='body2' align='right' color='error'>
            <UpdateIcon
              fontSize='small'
              sx={{ verticalAlign: 'middle', marginRight: 1 }}
            />
            21 days to apply
          </Typography>
        </Stack>
      </SmallJobCardWrapper>
    );
  } else {
    return (
      <JobCardWrapper>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
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
          <Link component={RouterLink} to={`/job/47`}>
            <Typography variant='h3' fontWeight={500}>
              {job.title}
            </Typography>
          </Link>
          <Typography variant='h4' fontWeight={500} color='#1890ff' mt={1}>
            {job.companyName}
          </Typography>

          <Typography fontWeight={500} mt={1} variant='body2'>
            <HiOutlineLocationMarker style={{ marginRight: 1 }} />
            {job.location}
          </Typography>

          <Typography variant='caption' mt={1} color='#8c8c8c'>
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
  }
};

export default JobCard;
