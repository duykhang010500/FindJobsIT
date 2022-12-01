import dayjs from 'dayjs';

import {
  Box,
  Grid,
  Stack,
  styled,
  Avatar,
  Rating,
  Typography,
} from '@mui/material';

import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

type Props = {
  resume: any;
};

const HeadingStyle = styled(Box)({
  padding: '15px',
  color: '#cf1322',
  borderRadius: '8px',
  backgroundColor: '#fff1f0',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
});

const CVDefault = ({ resume }: Props) => {
  return (
    <Box sx={{ p: 1, backgroundColor: '#fff' }}>
      <Stack spacing={6}>
        <Box>
          <HeadingStyle>
            <PersonIcon sx={{ color: 'inherit', marginRight: '20px' }} />
            <Typography
              variant='h3'
              sx={{ color: 'inherit', textTransform: 'uppercase' }}
            >
              Profile
            </Typography>
          </HeadingStyle>
          <Box>
            <Stack direction='row' spacing={3}>
              <Avatar
                sx={{ width: '100px', height: '100px' }}
                src={resume?.member?.avatar || 'none'}
              />
              <Stack spacing={1}>
                <Typography variant='h4'>{resume?.member?.fullname}</Typography>
                <Stack direction='row' alignItems={'center'}>
                  <WorkIcon sx={{ mr: 1, color: '#777' }} />
                  <Typography variant='h5'>{resume?.resume_title}</Typography>
                </Stack>
                <Stack direction='row' alignItems={'center'}>
                  <LocationOnIcon sx={{ mr: 1, color: '#777' }} />
                  <Typography variant='h5'>
                    {resume?.locations?.map((item: any, index: number) => {
                      if (index === 0) {
                        return <span key={index}>{`${item.name}`}</span>;
                      } else {
                        return <span key={index}>{` - ${item.name}`}</span>;
                      }
                    })}
                  </Typography>
                </Stack>
              </Stack>
              <Typography>{resume?.summary}</Typography>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1.5}>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Phone
                    </Typography>
                    <Typography variant='h5'>
                      {resume?.member?.phone}
                    </Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Birthday
                    </Typography>
                    <Typography variant='h5'>
                      {dayjs(resume?.member?.birthday).format('DD/MM/YYYY')}
                    </Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Email
                    </Typography>
                    <Typography variant='h5'>
                      {resume?.member?.email}
                    </Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Gender
                    </Typography>
                    <Typography variant='h5'>
                      {resume?.member?.gender === 1 ? 'Male' : 'Female'}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1.5}>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Nationality
                    </Typography>
                    <Typography variant='h5'>
                      {resume?.member?.nationality}
                    </Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      City
                    </Typography>
                    <Typography variant='h5'>{resume?.member?.city}</Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Address
                    </Typography>
                    <Typography variant='h5'>
                      {resume?.member?.address}
                    </Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Marital status
                    </Typography>
                    <Typography variant='h5'>
                      {resume?.member?.marital === 1 ? 'Single' : 'Married'}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box>
          <HeadingStyle>
            <SchoolIcon sx={{ color: 'inherit', marginRight: '20px' }} />
            <Typography
              variant='h3'
              sx={{ color: 'inherit', textTransform: 'uppercase' }}
            >
              EDUCATION
            </Typography>
          </HeadingStyle>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1.5}>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      School
                    </Typography>
                    <Typography variant='h5'>{resume?.edu_school}</Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Major
                    </Typography>
                    <Typography variant='h5'>{resume?.edu_certify}</Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Date start
                    </Typography>
                    <Typography variant='h5'>
                      {dayjs(resume?.edu_date_start).format('DD/MM/YYYY')}
                      {!resume?.edu_date_end && <> - Current</>}
                    </Typography>
                  </Stack>
                  {resume?.edu_date_end && (
                    <Stack direction='row'>
                      <Typography gutterBottom sx={{ width: '200px' }}>
                        Date end
                      </Typography>
                      <Typography variant='h5'>
                        {dayjs(resume?.edu_date_end).format('DD/MM/YYYY')}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack>
                  <Typography sx={{ width: '200px' }}>
                    Education description:
                  </Typography>
                  <Typography variant='body1' component='div'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: resume?.edu_description,
                      }}
                    />
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box>
          <HeadingStyle>
            <CodeIcon />
            <Typography
              variant='h3'
              sx={{ color: 'inherit', textTransform: 'uppercase', ml: '20px' }}
            >
              Skills
            </Typography>
          </HeadingStyle>
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

        <Box>
          <HeadingStyle>
            <WorkHistoryIcon sx={{ color: 'inherit', marginRight: '20px' }} />
            <Typography
              variant='h3'
              sx={{ color: 'inherit', textTransform: 'uppercase' }}
            >
              experience
            </Typography>
          </HeadingStyle>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1.5}>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Position
                    </Typography>
                    <Typography variant='h5'>
                      {resume?.rexp_title ? <>{resume?.rexp_title}</> : 'None'}
                    </Typography>
                  </Stack>

                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Company
                    </Typography>
                    <Typography variant='h5'>
                      {resume?.rexp_company ? resume?.rexp_company : 'None'}
                    </Typography>
                  </Stack>

                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Date start
                    </Typography>
                    <Typography variant='h5'>
                      {dayjs(resume?.rexp_date_start).format('DD/MM/YYYY')}
                      {!resume?.rexp_date_end && <> - Current</>}
                    </Typography>
                  </Stack>

                  {resume?.rexp_date_end && (
                    <Stack direction='row'>
                      <Typography gutterBottom sx={{ width: '200px' }}>
                        Date end
                      </Typography>
                      <Typography variant='h5'>
                        {dayjs(resume?.rexp_date_end).format('DD/MM/YYYY')}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1.5}>
                  <Stack>
                    <Typography sx={{ width: '200px' }}>
                      Experience description:
                    </Typography>
                    <Typography variant='h5' component={'div'}>
                      <div
                        style={{ fontSize: 'inherit' }}
                        dangerouslySetInnerHTML={{
                          __html: resume?.rexp_description,
                        }}
                      />
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box>
          <HeadingStyle>
            <WorkIcon sx={{ color: 'inherit', marginRight: '20px' }} />
            <Typography
              variant='h3'
              sx={{ color: 'inherit', textTransform: 'uppercase' }}
            >
              career information
            </Typography>
          </HeadingStyle>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1.5}>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Current level
                    </Typography>
                    <Typography variant='h5'>
                      {resume?.current_level}
                    </Typography>
                  </Stack>

                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Highest degree level
                    </Typography>
                    <Typography variant='h5'>{resume?.degree}</Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1.5}>
                  {resume?.yearofexperience !== 0 && (
                    <Stack direction='row'>
                      <Typography gutterBottom sx={{ width: '200px' }}>
                        Year of experience
                      </Typography>
                      <Typography variant='h5'>
                        <>{resume?.yearofexperience} year</>
                      </Typography>
                    </Stack>
                  )}
                  {resume?.current_position && (
                    <Stack direction='row'>
                      <Typography gutterBottom sx={{ width: '200px' }}>
                        Current position
                      </Typography>
                      <Typography variant='h5'>
                        {resume?.current_position}
                      </Typography>
                    </Stack>
                  )}
                  {resume?.current_company && (
                    <Stack direction='row'>
                      <Typography gutterBottom sx={{ width: '200px' }}>
                        Current company
                      </Typography>
                      <Typography variant='h5'>
                        {resume?.current_company}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box>
          <HeadingStyle>
            <PersonIcon sx={{ color: 'inherit', marginRight: '20px' }} />
            <Typography
              variant='h3'
              sx={{ color: 'inherit', textTransform: 'uppercase' }}
            >
              Expected Job
            </Typography>
          </HeadingStyle>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1.5}>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Job title
                    </Typography>
                    <Typography variant='h5'>{resume?.resume_title}</Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Level
                    </Typography>
                    <Typography variant='h5'>{resume?.level}</Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Salary
                    </Typography>
                    <Typography variant='h5'>
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
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1.5}>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Industry
                    </Typography>
                    <Typography variant='h5'>
                      {resume?.industries?.map((item: any, index: number) => {
                        if (index === 0) {
                          return <>{`${item.name}`}</>;
                        } else {
                          return <>{` - ${item.name}`}</>;
                        }
                      })}
                    </Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Location
                    </Typography>
                    <Typography variant='h5'>
                      {resume?.locations?.map((item: any, index: number) => {
                        if (index === 0) {
                          return <>{`${item.name}`}</>;
                        } else {
                          return <>{` - ${item.name}`}</>;
                        }
                      })}
                    </Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Working type
                    </Typography>
                    <Typography variant='h5'>{resume?.working_type}</Typography>
                  </Stack>
                  <Stack direction='row'>
                    <Typography gutterBottom sx={{ width: '200px' }}>
                      Foreign language
                    </Typography>
                    <Typography variant='h5'>{resume?.languages}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default CVDefault;
