import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Breadcrumbs, Link, Grid, Card } from '@mui/material';

import Statistic from '../../../sections/admin-dasboard/dashboard/Statistic';
import LineChart from '../../../sections/admin-dasboard/dashboard/LineChart';

import { getDashboardAmin } from '../../../store/dashboard/actions';
import { AppState } from '../../../store/reducer';

type Props = {};

const DashboardAdmin = (props: Props) => {
  const dispatch = useDispatch();

  const { data } = useSelector((state: AppState) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardAmin());
  }, [dispatch]);

  return (
    <>
      <Typography variant='h3' gutterBottom>
        Dashboard
      </Typography>
      <Breadcrumbs sx={{ mt: 3 }}>
        <Link>Dashboard</Link>
        <Typography>General</Typography>
      </Breadcrumbs>
      <Statistic data={data} />
      <Grid container spacing={3} sx={{ mt: 3 }} justifyContent='center'>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 1 }}>
            <LineChart data={data} />
          </Card>
        </Grid>
        {/* <Grid item xs={12} md={5}>
          <PieChart />
        </Grid> */}
      </Grid>
    </>
  );
};

export default DashboardAdmin;
