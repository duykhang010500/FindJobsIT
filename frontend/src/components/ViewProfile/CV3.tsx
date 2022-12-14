import dayjs from 'dayjs';

import { Grid, Typography, Stack, Box, Avatar, Rating } from '@mui/material';

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

const CV3 = ({ resume }: Props) => {
  return (
    <Box sx={{ p: 2, backgroundColor: '#fff' }}>
      <Grid container spacing={3}>
        <Grid item md={5}>
          {/* Avatar  */}
          <Stack spacing={2} alignItems='center'>
            <Box
              sx={{
                borderRadius: '50%',
                border: '10px solid #ffccc7',
              }}
            >
              <Box
                sx={{
                  borderRadius: '50%',
                  border: '5px solid #ff4d4f',
                }}
              >
                <Avatar
                  sx={{ width: '150px', height: '150px' }}
                  src={resume?.member?.avatar}
                />
              </Box>
            </Box>
            <Typography variant='h3' sx={{ color: '#ff4d4f' }}>
              {resume?.member?.fullname}
            </Typography>
            <Typography variant='h4' sx={{ fontWeight: 400 }}>
              {resume?.resume_title}
            </Typography>
          </Stack>

          {/* Personal information  */}
          <Box
            sx={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#f2f4f5',
              borderRadius: '20px',
            }}
          >
            <Stack spacing={1}>
              <Stack direction='row' alignItems='center' spacing={3}>
                <PhoneIphoneRoundedIcon sx={{ color: '#ff4d4f' }} />
                <Typography variant='body2'>{resume?.member?.phone}</Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={3}>
                <MailRoundedIcon sx={{ color: '#ff4d4f' }} />
                <Typography variant='body2'>{resume?.member?.email}</Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={3}>
                <AccountCircleRoundedIcon sx={{ color: '#ff4d4f' }} />
                <Typography variant='body2'>
                  {resume?.member?.gender === 1 ? 'Male' : 'Female'}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={3}>
                <CalendarMonthRoundedIcon sx={{ color: '#ff4d4f' }} />
                <Typography variant='body2'>
                  {dayjs(resume?.member?.birthday).format('DD/MM/YYYY')}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={3}>
                <WcRoundedIcon sx={{ color: '#ff4d4f' }} />
                <Typography variant='body2'>
                  {resume?.member?.marital === 1 ? 'Single' : 'Married'}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={3}>
                <LocationOnRoundedIcon sx={{ color: '#ff4d4f' }} />
                <Typography variant='body2'>
                  {resume?.member?.nationality}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={3}>
                <LocationCityRoundedIcon sx={{ color: '#ff4d4f' }} />
                <Typography variant='body2'>{resume?.member?.city}</Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={3}>
                <HomeRoundedIcon sx={{ color: '#ff4d4f' }} />
                <Typography variant='body2'>
                  {resume?.member?.address}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Skill  */}
          <Box sx={{ mt: 3 }}>
            <Typography variant='h3' color='#ff4d4f' gutterBottom>
              SKILLS
            </Typography>
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
        <Grid item md={7}>
          <Box
            sx={{
              borderLeft: '2px solid #f0f0f0',
              paddingLeft: '20px',
              height: '290mm',
            }}
          >
            {/* Objective  */}

            <Box>
              <Typography
                variant='h3'
                color='#ff4d4f'
                textTransform='uppercase'
                gutterBottom
                sx={{
                  position: 'relative',
                  '&::before': {
                    position: 'absolute',
                    content: '""',
                    height: '30px',
                    width: '8px',
                    backgroundColor: 'currentcolor',
                    left: '-25px',
                    top: '-5px',
                    borderRadius: '8px',
                  },
                }}
              >
                Career Objective
              </Typography>
              <Typography variant='body1'>{resume?.summary}</Typography>
            </Box>

            {/* Edu  */}
            <Box sx={{ mt: 3 }}>
              <Typography
                variant='h3'
                color='#ff4d4f'
                textTransform='uppercase'
                gutterBottom
                sx={{
                  position: 'relative',
                  '&::before': {
                    position: 'absolute',
                    content: '""',
                    height: '30px',
                    width: '8px',
                    backgroundColor: 'currentcolor',
                    left: '-25px',
                    top: '-5px',
                    borderRadius: '8px',
                  },
                }}
              >
                Education
              </Typography>
              {resume?.educations?.map((edu: any) => (
                <Stack sx={{ my: 2 }}>
                  <Typography
                    variant='h5'
                    component='div'
                    gutterBottom
                    fontWeight={400}
                  >
                    {dayjs(edu?.edu_date_start).format('DD/MM/YYYY')} - {''}
                    {edu?.edu_date_end
                      ? dayjs(edu?.edu_date_end).format('DD/MM/YYYY')
                      : 'Current'}
                  </Typography>
                  <Typography variant='h4'>
                    {' '}
                    {edu?.edu_certify} | {edu?.edu_school}
                  </Typography>
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

            {/* Exp  */}
            <Box sx={{ mt: 3 }}>
              <Typography
                variant='h3'
                color='#ff4d4f'
                textTransform='uppercase'
                sx={{
                  position: 'relative',
                  '&::before': {
                    position: 'absolute',
                    content: '""',
                    height: '30px',
                    width: '8px',
                    backgroundColor: 'currentcolor',
                    left: '-25px',
                    top: '-5px',
                    borderRadius: '8px',
                  },
                }}
              >
                Experience
              </Typography>
              {resume?.experiences?.map((exp: any) => (
                <Stack sx={{ my: 2 }}>
                  <Typography
                    variant='h5'
                    component='div'
                    gutterBottom
                    fontWeight={400}
                  >
                    {dayjs(exp?.rexp_date_start).format('DD/MM/YYYY')} - {''}
                    {exp?.rexp_date_end
                      ? dayjs(exp?.rexp_date_end).format('DD/MM/YYYY')
                      : 'Current'}
                  </Typography>
                  <Typography variant='h4'>
                    {exp?.rexp_title} | {exp?.rexp_company}
                  </Typography>
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

            {/* Career information  */}
            <Box sx={{ mt: 3 }}>
              <Typography
                variant='h3'
                color='#ff4d4f'
                textTransform='uppercase'
                sx={{
                  position: 'relative',
                  '&::before': {
                    position: 'absolute',
                    content: '""',
                    height: '30px',
                    width: '8px',
                    backgroundColor: 'currentcolor',
                    left: '-25px',
                    top: '-5px',
                    borderRadius: '8px',
                  },
                }}
              >
                career information
              </Typography>
              <Stack spacing={1} sx={{ my: 2 }}>
                {resume?.yearofexperience !== 0 && (
                  <Stack direction='row' spacing={4}>
                    <Typography
                      variant='body1'
                      component='span'
                      sx={{ fontWeight: 500, minWidth: '140px' }}
                    >
                      Year of experience :
                    </Typography>
                    <Typography
                      variant='body1'
                      component='span'
                      sx={{ textAlign: 'right' }}
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
                      sx={{ fontWeight: 500, minWidth: '140px' }}
                    >
                      Current position :
                    </Typography>
                    <Typography
                      variant='body1'
                      component='span'
                      sx={{ textAlign: 'right' }}
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
                      sx={{ fontWeight: 500, minWidth: '140px' }}
                    >
                      Current company:
                    </Typography>
                    <Typography
                      variant='body1'
                      component='span'
                      sx={{ textAlign: 'right' }}
                    >
                      {resume?.current_company}
                    </Typography>
                  </Stack>
                )}

                <Stack direction='row' spacing={4}>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ fontWeight: 500, minWidth: '140px' }}
                  >
                    Current level:
                  </Typography>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ textAlign: 'right' }}
                  >
                    {resume?.current_level}
                  </Typography>
                </Stack>
                <Stack direction='row' spacing={4}>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ fontWeight: 500, minWidth: '140px' }}
                  >
                    Highest degree level :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ textAlign: 'right' }}
                  >
                    {resume?.degree}
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            {/* Expected job  */}
            <Box sx={{ mt: 3 }}>
              <Typography
                variant='h3'
                color='#ff4d4f'
                textTransform='uppercase'
                sx={{
                  position: 'relative',
                  '&::before': {
                    position: 'absolute',
                    content: '""',
                    height: '30px',
                    width: '8px',
                    backgroundColor: 'currentcolor',
                    left: '-25px',
                    top: '-5px',
                    borderRadius: '8px',
                  },
                }}
              >
                Expected Job
              </Typography>
              <Stack spacing={1} sx={{ my: 2 }}>
                <Stack direction='row' spacing={4}>
                  <Typography
                    variant='body1'
                    component='span'
                    sx={{ fontWeight: 500, minWidth: '140px' }}
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
                    sx={{ fontWeight: 500, minWidth: '140px' }}
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
                    sx={{ fontWeight: 500, minWidth: '140px' }}
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
                    sx={{ fontWeight: 500, minWidth: '140px' }}
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
                    sx={{ fontWeight: 500, minWidth: '140px' }}
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
                    sx={{ fontWeight: 500, minWidth: '140px' }}
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
                    sx={{ fontWeight: 500, minWidth: '140px' }}
                  >
                    Foreign langues :
                  </Typography>
                  <Typography variant='body1' component='span'>
                    {resume?.languages}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CV3;
