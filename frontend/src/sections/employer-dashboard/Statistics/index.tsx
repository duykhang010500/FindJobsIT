import { useDispatch, useSelector } from 'react-redux';

import { Box, Card, Grid, Typography, styled, Stack } from '@mui/material';

import { FaUser } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import StatisticsMap from './StatisticsMap';
import { AppState } from '../../../store/reducer';
import { useEffect } from 'react';
import { getDashboardEmployer } from '../../../store/dashboard/actions';

type Props = {};

const CardStyle = styled(Card)({
  padding: '20px 40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: 'none',
  border: '2px solid #f2f4f5',
  height: '100%',
});

const IconWrapperStyle = styled(Box)({
  width: 64,
  height: 64,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
});

const Statistics = (props: Props) => {
  const dispatch = useDispatch();

  const { data } = useSelector((state: AppState) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardEmployer());
  }, [dispatch]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={6}>
        <CardStyle>
          <Box>
            <Typography variant='h1' gutterBottom sx={{ color: '#40a9ff' }}>
              {data?.totalCandidates}
            </Typography>
            <Typography variant='body1' color='#8c8c8c'>
              Candidates
            </Typography>
          </Box>
          <IconWrapperStyle
            sx={{
              backgroundColor: '#e6f7ff',
            }}
          >
            <FaUser
              style={{
                height: 30,
                width: 30,
                color: '#40a9ff',
              }}
            />
          </IconWrapperStyle>
        </CardStyle>
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <CardStyle>
          <Box>
            <Stack spacing={0.2}>
              <Stack direction='row' spacing={2}>
                <Typography
                  variant='body1'
                  gutterBottom
                  sx={{ color: '#8c8c8c', minWidth: '75px' }}
                >
                  Active
                </Typography>
                <Typography variant='h3' gutterBottom sx={{ color: '#ffc53d' }}>
                  {data?.totalJobsActive}
                </Typography>
              </Stack>

              <Stack direction='row' spacing={2}>
                <Typography
                  variant='body1'
                  gutterBottom
                  sx={{ color: '#8c8c8c', minWidth: '75px' }}
                >
                  Pending
                </Typography>
                <Typography variant='h3' gutterBottom sx={{ color: '#ffc53d' }}>
                  {data?.totalJobsPending}
                </Typography>
              </Stack>

              <Stack direction='row' spacing={2}>
                <Typography
                  variant='body1'
                  gutterBottom
                  sx={{ color: '#8c8c8c', minWidth: '75px' }}
                >
                  Closed
                </Typography>
                <Typography variant='h3' gutterBottom sx={{ color: '#ffc53d' }}>
                  {data?.totalJobsStopPosting}
                </Typography>
              </Stack>

              <Stack direction='row' spacing={2}>
                <Typography
                  variant='body1'
                  gutterBottom
                  sx={{ color: '#8c8c8c', minWidth: '75px' }}
                >
                  Expired
                </Typography>
                <Typography variant='h3' gutterBottom sx={{ color: '#ffc53d' }}>
                  {data?.totalJobsExpired}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <IconWrapperStyle
            sx={{
              backgroundColor: '#fff1b8',
            }}
          >
            <MdWork
              style={{
                height: 30,
                width: 30,
                color: '#ffc53d',
              }}
            />
          </IconWrapperStyle>
        </CardStyle>
      </Grid>

      <Grid item xs={12} sm={12}>
        <StatisticsMap data={data?.candidate_apply_by_month} />
      </Grid>
    </Grid>
  );
};

export default Statistics;
