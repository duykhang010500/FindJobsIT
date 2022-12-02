import dayjs from 'dayjs';
import {
  styled,
  Grid,
  Box,
  Stack,
  Typography,
  Avatar,
  Rating,
} from '@mui/material';

import CoverCV1 from '../../assets/images/CoverCV1.webp';

import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

type Props = {
  resume: any;
};

export const CVBox = styled(Box)({
  position: 'relative',
  padding: '20px',
  minHeight: '297mm',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
});

const HeadingStyled = styled(Box)({
  position: 'relative',
  backgroundColor: '#ff823c',
  padding: '10px 20px 10px 40px',
  color: '#fff',
  fontSize: '18px',
  fontWeight: 500,
  borderRadius: '30px',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '10px',
    height: '10px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    top: '50%',
    left: '20px',
    transform: 'translate(-50%, -50%)',
  },
});

const CV1 = ({ resume }: Props) => {
  return (
    <CVBox sx={{ backgroundImage: `url(${CoverCV1})` }}>
      <Grid container spacing={5}>
        <Grid item md={6}>
          {/* Experience  */}
          <Stack direction='column' alignItems='flex-end' spacing={2}>
            <HeadingStyled>Experience</HeadingStyled>
            {resume?.experiences?.map((exp: any) => (
              <Stack sx={{ my: 2 }} alignItems='flex-end'>
                <Typography variant='h5' component='div' gutterBottom>
                  {exp?.rexp_title} |{' '}
                  {dayjs(exp?.rexp_date_start).format('DD/MM/YYYY')} - {''}
                  {exp?.rexp_date_end
                    ? dayjs(exp?.rexp_date_end).format('DD/MM/YYYY')
                    : 'Current'}
                </Typography>
                <Typography variant='h4'>{exp?.rexp_company}</Typography>
                <Typography variant='body1' component='div'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: exp?.rexp_description,
                    }}
                  />
                </Typography>
              </Stack>
            ))}

            {/* Education */}
            <HeadingStyled>Education</HeadingStyled>
            {resume?.educations?.map((edu: any) => (
              <Stack sx={{ my: 2 }} alignItems='flex-end'>
                <Typography variant='h5' component='div' gutterBottom>
                  {edu?.edu_certify} |{' '}
                  {dayjs(edu?.edu_date_start).format('DD/MM/YYYY')} - {''}
                  {edu?.edu_date_end
                    ? dayjs(edu?.edu_date_end).format('DD/MM/YYYY')
                    : 'Current'}
                </Typography>
                <Typography variant='h4'>{edu?.edu_school}</Typography>
                <Typography variant='body1' component='div'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: edu?.edu_description,
                    }}
                  />
                </Typography>
              </Stack>
            ))}

            {/* Career information */}
            <HeadingStyled>Career information</HeadingStyled>
            <Stack spacing={1} sx={{ my: 2 }} alignItems='flex-end'>
              {resume?.yearofexpericence && (
                <Stack direction='row' spacing={4}>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ fontWeight: 500 }}
                  >
                    Year of experience :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ minWidth: '60px', textAlign: 'right' }}
                  >
                    {resume?.yearofexperience}
                  </Typography>
                </Stack>
              )}

              {resume?.current_position && (
                <Stack direction='row' spacing={4}>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ fontWeight: 500 }}
                  >
                    Current position :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ minWidth: '60px', textAlign: 'right' }}
                  >
                    {resume?.current_position}
                  </Typography>
                </Stack>
              )}

              {resume?.current_company && (
                <Stack direction='row' spacing={4}>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ fontWeight: 500 }}
                  >
                    Current company:
                  </Typography>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ minWidth: '60px', textAlign: 'right' }}
                  >
                    {resume?.current_company ? resume?.current_company : 'None'}
                  </Typography>
                </Stack>
              )}
              <Stack direction='row' spacing={4}>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ fontWeight: 500 }}
                >
                  Current level:
                </Typography>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ minWidth: '60px', textAlign: 'right' }}
                >
                  {resume?.current_level}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={4}>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ fontWeight: 500 }}
                >
                  Highest degree level :
                </Typography>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ minWidth: '60px', textAlign: 'right' }}
                >
                  {resume?.degree}
                </Typography>
              </Stack>
            </Stack>

            {/* skills */}
            <Box>
              <HeadingStyled sx={{ mb: 2 }}>Skills</HeadingStyled>
              {resume?.skills?.map((skill: any) => (
                <Stack spacing={2} direction='row' alignItems='center'>
                  <Typography
                    component='span'
                    sx={{ minWidth: '100px' }}
                    gutterBottom
                  >
                    {skill?.name}
                  </Typography>
                  <Rating
                    readOnly
                    size='small'
                    defaultValue={skill?.skills_level}
                  />
                </Stack>
              ))}
            </Box>
          </Stack>
        </Grid>
        <Grid item md={6}>
          {/* Personal Information  */}

          <Avatar
            sx={{
              width: '150px',
              height: '150px',
              marginBottom: '30px',
            }}
            // alt='avatar'
            src={resume?.member?.avatar}
          />
          <Typography variant='h4' gutterBottom>
            {resume?.member?.fullname}
          </Typography>
          <Typography variant='body1'>{resume?.resume_title}</Typography>

          <Stack sx={{ my: 3 }} spacing={1}>
            <Typography variant='h4'>Information</Typography>

            <Stack direction='row' alignItems='center' spacing={3}>
              <PhoneIphoneRoundedIcon />
              <Typography variant='body2'>{resume?.member?.phone}</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={3}>
              <MailRoundedIcon />
              <Typography variant='body2'>{resume?.member?.email}</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={3}>
              <AccountCircleRoundedIcon />
              <Typography variant='body2'>
                {resume?.member?.gender === 1 ? 'Male' : 'Female'}
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={3}>
              <CalendarMonthRoundedIcon />
              <Typography variant='body2'>
                {dayjs(resume?.member?.birthday).format('DD/MM/YYYY')}
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={3}>
              <WcRoundedIcon />
              <Typography variant='body2'>
                {resume?.member?.marital === 1 ? 'Single' : 'Married'}
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={3}>
              <LocationOnRoundedIcon />
              <Typography variant='body2'>
                {resume?.member?.nationality}
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={3}>
              <LocationCityRoundedIcon />
              <Typography variant='body2'>{resume?.member?.city}</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={3}>
              <HomeRoundedIcon />
              <Typography variant='body2'>{resume?.member?.address}</Typography>
            </Stack>
          </Stack>

          {/* Objective  */}
          <Box>
            <HeadingStyled sx={{ mb: 2 }}>Objective</HeadingStyled>
            <div dangerouslySetInnerHTML={{ __html: resume?.summary }} />
          </Box>

          {/* Expected job  */}
          <Box sx={{ mt: 3 }}>
            <HeadingStyled>Expected Job</HeadingStyled>
            <Stack spacing={1} sx={{ my: 2 }}>
              <Stack direction='row' spacing={4}>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ fontWeight: 500, minWidth: '120px' }}
                >
                  Job title :
                </Typography>
                <Typography variant='body1' component='span'>
                  {resume?.resume_title}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={4}>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ fontWeight: 500, minWidth: '120px' }}
                >
                  Level :
                </Typography>
                <Typography variant='body1' component='span'>
                  {resume?.level}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={4}>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ fontWeight: 500, minWidth: '120px' }}
                >
                  Salary :
                </Typography>
                <Typography variant='body1' component='span'>
                  {resume?.resume_title}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={4}>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ fontWeight: 500, minWidth: '120px' }}
                >
                  Industry :
                </Typography>
                <Typography variant='body1' component='span'>
                  {resume?.industries.map((location: any, index: number) => {
                    if (index === 0) {
                      return <span key={location.id}>{location.name}</span>;
                    } else {
                      return (
                        <span key={location.id}>{`, ${location.name}`}</span>
                      );
                    }
                  })}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={4}>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ fontWeight: 500, minWidth: '120px' }}
                >
                  Location :
                </Typography>
                <Typography variant='body1' component='span'>
                  {resume?.locations.map((location: any, index: number) => {
                    if (index === 0) {
                      return <span key={location.id}>{location.name}</span>;
                    } else {
                      return (
                        <span key={location.id}>{`, ${location.name}`}</span>
                      );
                    }
                  })}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={4}>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ fontWeight: 500, minWidth: '120px' }}
                >
                  Working type :
                </Typography>
                <Typography variant='body1' component='span'>
                  {resume?.working_type}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={4}>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ fontWeight: 500, minWidth: '120px' }}
                >
                  Foreign langues :
                </Typography>
                <Typography variant='body1' component='span'>
                  {resume?.languages}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </CVBox>
  );
};

export default CV1;
