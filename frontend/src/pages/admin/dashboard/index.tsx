import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
      <Card
        sx={{ p: 2, backgroundColor: '#fff', display: 'inline-block', mb: 2 }}
      >
        <Breadcrumbs
          sx={{ '&.MuiTypography-root': { fontWeight: 600 } }}
          separator='›'
          aria-label='breadcrumb'
        >
          <Link component={RouterLink} to={`/admin/dashboard`}>
            Dashboard
          </Link>
          <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
            Statistic
          </Typography>
        </Breadcrumbs>
      </Card>
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
