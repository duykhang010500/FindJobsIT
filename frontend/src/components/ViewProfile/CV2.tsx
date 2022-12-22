import dayjs from 'dayjs';

import {
  styled,
  Typography,
  Box,
  Stack,
  Avatar,
  Grid,
  Rating,
} from '@mui/material';

import WcRoundedIcon from '@mui/icons-material/WcRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

type Props = {
  resume: any;
};

const BadgeInformation = styled(Box)({
  backgroundColor: '#f0f0f0',
  borderRadius: '30px',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  '& > svg': {
    color: '#1890ff',
    marginRight: '10px',
  },
});

const HeadingSection = styled('span')({
  display: 'inline-block',
  marginBottom: '20px',
  color: '#1890ff',
  fontSize: '17px',
  textTransform: 'uppercase',
  fontWeight: 600,
  position: 'relative',
  '&::before': {
    position: 'absolute',
    content: '""',
    width: '30px',
    height: '30px',
    backgroundColor: '#e6f7ff',
    zIndex: -1,
    borderRadius: '50%',
    top: '-20%',
    left: '-15%',
  },
});

const CV2 = ({ resume }: Props) => {
  return (
    <Box sx={{ p: 3, backgroundColor: '#fff' }}>
      {/* Header CV*/}
      <Box>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Box>
            <Typography
              variant='h3'
              sx={{
                position: 'relative',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: '#1890ff',
                '&::before': {
                  position: 'absolute',
                  content: '" "',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#e6f7ff',
                  top: '-70%',
                  left: '20px',
                  zIndex: -1,
                },
              }}
            >
              {resume?.member?.fullname}
            </Typography>
            <Typography
              variant='body1'
              sx={{
                position: 'relative',
                color: '#1890ff',
                fontSize: '18px',
                marginTop: '30px',
                '&::after': {
                  position: 'absolute',
                  zIndex: -1,
                  content: '""',
                  width: '40%',
                  height: '3px',
                  backgroundColor: 'currentcolor',
                  bottom: '-10px',
                  left: 0,
                },
              }}
            >
              {resume?.resume_title}
            </Typography>
          </Box>
          <Box
            sx={{
              p: '10px',
              borderRadius: '50%',
              border: '2px dashed #1890ff',
            }}
          >
            <Avatar
              sx={{ width: '140px', height: '140px' }}
              src={resume?.member?.avatar}
            />
          </Box>
        </Stack>
      </Box>

      {/* Personal information */}
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={1}>
          <Grid item md={4}>
            <BadgeInformation>
              <PhoneIphoneRoundedIcon />
              <Typography variant='body2'>{resume?.member?.phone}</Typography>
            </BadgeInformation>
          </Grid>
          <Grid item md={4}>
            <BadgeInformation>
              <MailRoundedIcon />
              <Typography variant='body2'>{resume?.member?.email}</Typography>
            </BadgeInformation>
          </Grid>
          <Grid item md={4}>
            <BadgeInformation>
              <AccountCircleRoundedIcon />
              <Typography variant='body2'>
                {resume?.member?.gender === 1 ? 'Male' : 'Female'}
              </Typography>
            </BadgeInformation>
          </Grid>
          <Grid item md={4}>
            <BadgeInformation>
              <CalendarMonthRoundedIcon />
              <Typography variant='body2'>
                {dayjs(resume?.member?.birthday).format('DD/MM/YYYY')}
              </Typography>
            </BadgeInformation>
          </Grid>
          <Grid item md={4}>
            <BadgeInformation>
              <WcRoundedIcon />
              <Typography variant='body2'>
                {resume?.member?.marital === 1 ? 'Single' : 'Married'}
              </Typography>
            </BadgeInformation>
          </Grid>
          <Grid item md={4}>
            <BadgeInformation>
              <LocationOnRoundedIcon />
              <Typography variant='body2'>
                {resume?.member?.nationality}
              </Typography>
            </BadgeInformation>
          </Grid>
          <Grid item md={4}>
            <BadgeInformation>
              <LocationCityRoundedIcon />
              <Typography variant='body2'>{resume?.member?.city}</Typography>
            </BadgeInformation>
          </Grid>
          <Grid item md={4}>
            <BadgeInformation>
              <HomeRoundedIcon />
              <Typography variant='body2'>{resume?.member?.address}</Typography>
            </BadgeInformation>
          </Grid>
        </Grid>

        <Typography variant='body1' sx={{ mt: 3 }}>
          {resume?.summary}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item md={6}>
          {/* Education  */}
          <Box sx={{ mt: 4 }}>
            <HeadingSection>education</HeadingSection>
            {resume?.educations?.map((edu: any) => (
              <Stack sx={{ my: 2 }}>
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
          </Box>

          {/* Experience  */}
          {resume?.experiences[0]?.rexp_title !== null && (
            <Box sx={{ mt: 4 }}>
              <HeadingSection>experience</HeadingSection>
              {resume?.experiences?.map((exp: any) => (
                <Stack sx={{ my: 2 }}>
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
            </Box>
          )}

          {/* Skills  */}
          <Box>
            <HeadingSection sx={{ mb: 2 }}>Skills</HeadingSection>
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
        </Grid>
        <Grid item md={6}>
          {/* Career Information  */}
          <Box sx={{ mt: 4 }}>
            <HeadingSection>career information</HeadingSection>
            <Stack spacing={1} sx={{ my: 2 }}>
              {resume?.yearofexperience !== 0 && (
                <Stack direction='row' spacing={4}>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ fontWeight: 500, minWidth: '150px' }}
                  >
                    Year of experience :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ minWidth: '60px' }}
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
                    sx={{ fontWeight: 500, minWidth: '150px' }}
                  >
                    Current position :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ minWidth: '60px' }}
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
                    sx={{ fontWeight: 500, minWidth: '150px' }}
                  >
                    Current company:
                  </Typography>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ minWidth: '60px' }}
                  >
                    {resume?.current_company}
                  </Typography>
                </Stack>
              )}
              <Stack direction='row' spacing={4}>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ fontWeight: 500, minWidth: '150px' }}
                >
                  Current level:
                </Typography>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ minWidth: '60px' }}
                >
                  {resume?.current_level}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={4}>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ fontWeight: 500, minWidth: '150px' }}
                >
                  Highest degree level :
                </Typography>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ minWidth: '60px' }}
                >
                  {resume?.degree}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Expected Job  */}
          <Box sx={{ mt: 4 }}>
            <HeadingSection>Expected job</HeadingSection>
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
                  {resume?.salary_unit !== 'Negotiate' ? (
                    <>
                      {resume?.salary_from} - {resume?.salary_to}{' '}
                      {resume?.salary_unit}
                    </>
                  ) : (
                    <>{resume?.salary_unit}</>
                  )}
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
                  {resume?.industries?.map((location: any, index: number) => {
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
                  {resume?.locations?.map((location: any, index: number) => {
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
    </Box>
  );
};

export default CV2;
