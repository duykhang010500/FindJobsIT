import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Breadcrumbs, Link, Typography, Card } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ServicesList from '../sections/services/ServicesList';
import { getListServicesEmployer } from '../store/services/actions';

type Props = {};

const Services = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListServicesEmployer());
  }, [dispatch]);
  return (
    <>
      <Card sx={{ p: 2, backgroundColor: '#fff', display: 'inline-block' }}>
        <Breadcrumbs
          sx={{ '&.MuiTypography-root': { fontWeight: 600 } }}
          separator='›'
          aria-label='breadcrumb'
        >
          <Link component={RouterLink} to={`/employer`}>
            Home
          </Link>
          <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
            Services
          </Typography>
        </Breadcrumbs>
      </Card>
      <ServicesList />
    </>
  );
};

export default Services;
