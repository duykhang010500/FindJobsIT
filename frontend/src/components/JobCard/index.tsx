import { Link as RouterLink } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Box,
  Link,
  Card,
  Stack,
  styled,
  Divider,
  useTheme,
  Typography,
} from '@mui/material';

// eslint-disable-next-line
import UpdateIcon from '@mui/icons-material/Update';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';

interface Iprops {
  job: any;
  isSmall?: boolean;
}

// eslint-disable-next-line
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
  boxShadow: 'none',
  border: '1px solid #efefef',
  // height: '100%',
  borderRadius: '12px',
  '&:hover': {
    boxShadow: '4px 4px 16px 0px rgba(245, 34, 45,0.2)',
  },
});

// eslint-disable-next-line
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

  const { company } = useSelector((state: AppState) => state.companies);

  if (isSmall) {
    return (
      <SmallJobCardWrapper>
        {job.logoCompany ? (
          <SmallJobCardImg src={`${job.companyLogo}`} />
        ) : (
          <ApartmentIcon />
        )}
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
        <Stack direction='row' alignItems='center'>
          {job?.company?.logo || company?.logo ? (
            <img
              style={{ width: '40px', height: '40px' }}
              src={job?.company?.logo || company?.logo}
              alt='company-logo'
            />
          ) : (
            <ApartmentIcon />
          )}
          <Link
            component={RouterLink}
            to={`/job/${job.id}`}
            sx={{
              '&:hover': {
                color: '#faad14',
              },
            }}
          >
            <Typography
              variant='h4'
              sx={{ ml: 2, fontWeight: 700, color: 'inherit' }}
            >
              {job?.title}
            </Typography>
          </Link>
        </Stack>
        <Stack>
          <Typography variant='h4' color='rgb(34, 184, 207)' mt={2}>
            {job?.company_name}
          </Typography>

          <Stack direction='row' justifyContent='space-between'>
            <Typography fontWeight={500} mt={1} variant='body2'>
              <LocalAtmOutlinedIcon
                style={{
                  marginRight: '7px',
                  fontSize: '1.2rem',
                  color: '#52c41a',
                  verticalAlign: 'bottom',
                }}
              />
              {job?.salary}
            </Typography>
            <Typography fontWeight={500} mt={1} variant='body2'>
              <HiOutlineLocationMarker
                style={{
                  marginRight: '7px',
                  fontSize: '1.2rem',
                  color: '#ff4d4f',
                }}
              />
              {job &&
                job?.locations?.map((item: any, index: number) => {
                  if (index === 0) {
                    return <span key={index}>{item?.name}</span>;
                  } else {
                    return <span key={index}>{` - ${item.name}`}</span>;
                  }
                })}
            </Typography>
          </Stack>

          {/* <Typography variant='caption' mt={1}>
            Posted date: {dayjs(job?.created_at).format('DD/MM/YYYY')}
          </Typography> */}
          {/* <Stack direction='row' spacing={2}>
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
          </Stack> */}
        </Stack>
      </JobCardWrapper>
    );
  }
};

export default JobCard;
